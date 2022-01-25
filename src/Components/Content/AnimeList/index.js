import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import { debounce } from "../../../Utilities/debounce"
import TextTruncate from "react-text-truncate"
import Skeleton from "@mui/material/Skeleton"
import "./animelist.css"
function AnimeList({ instance }) {
	const CancelToken = axios.CancelToken
	const source = CancelToken.source()

	const [animeList, setAnimeList] = useState([])
	const [page, setPage] = useState(1)
	const [totalPage, setTotalPage] = useState(91)
	const getList = debounce(async () => {
		await instance
			.get(`/anime?page=${page}`, {
				cancelToken: source.token,
			})
			.then((response) => {
				const newPage = page + 1
				setPage(newPage)
				const newList = response.data.data.map((anime) => ({
					slug: anime.slug,
					thumbnail: anime.thumbnail,
					name: anime.name,
					views: anime.views,
				}))
				setAnimeList((prev) => [...prev, ...newList])
				setTotalPage(response.data.data.pagination.totalPage)
			})
			.catch((thrown) => {
				if (axios.isCancel(thrown)) return
			})
	}, 1000)

	useEffect(() => {
		getList()

		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			<div
				className="title-wrapper"
				style={{ textAlign: "center", margin: "20px 0" }}
			>
				<h1 style={{ display: "inline-block" }}>TẤT CẢ ANIME</h1>
			</div>

			<div className="anime-list">
				<InfiniteScroll
					style={{ overflow: "none" }}
					dataLength={animeList.length}
					next={getList}
					hasMore={page === totalPage ? false : true}
					loader={
						<Row xs={1} sm={2} md={3} lg={4}>
							{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((skeleton) => (
								<Col key={skeleton}>
									<Card>
										<Card.Body style={{ maxHeight: "100%" }}>
											<Skeleton
												variant="rectangular"
												width="100%"
												height="192px"
												animation="wave"
												sx={{ bgcolor: "grey.900" }}
											/>

											<Skeleton
												variant="text"
												animation="wave"
												sx={{ bgcolor: "grey.900" }}
											/>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					}
					endMessage={<h4>HẾT RỒI</h4>}
				>
					<Row xs={1} sm={2} md={3} lg={4}>
						{animeList.map((anime) => (
							<Col key={anime.slug}>
								<Card>
									<Card.Img variant="top" src={anime.thumbnail} fluid="true" />
									<Card.Body>
										<Card.Title>
											<TextTruncate
												line={2}
												element="span"
												truncateText="…"
												text={anime?.name}
											/>
										</Card.Title>
									</Card.Body>
								</Card>
								<div className="w-100"></div>
							</Col>
						))}
					</Row>
				</InfiniteScroll>
			</div>
		</>
	)
}

export default AnimeList
