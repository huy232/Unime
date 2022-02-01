import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import TextTruncate from "react-text-truncate"
import { BsFillPlayFill } from "react-icons/bs"
import LoadingSpin from "react-loading-spin"
import "./animelist.css"

const PAGE_NUMBER = 1

function AnimeList({ instance }) {
	const navigate = useNavigate()

	const [animeList, setAnimeList] = useState([])
	const [page, setPage] = useState(PAGE_NUMBER)
	const [totalPage, setTotalPage] = useState(91)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getList = async () => {
			await instance
				.get(`/anime?page=${page}`, {
					cancelToken: source.token,
				})
				.then((response) => {
					const newList = response.data.data.map((anime) => ({
						slug: anime.slug,
						thumbnail: anime.thumbnail,
						name: anime.name,
						views: anime.views,
					}))
					setTotalPage(response.data.pagination.totalPage)
					setAnimeList((prev) => {
						return [...new Set([...prev, ...newList])]
					})
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getList()

		return () => {
			source.cancel()
		}
	}, [page])

	const scrollThreshold = () => {
		const newPage = page + 1
		setPage(newPage)
	}

	const handleGetSlug = (slug) => {
		navigate(`/info/${slug}`)
	}

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
					next={scrollThreshold}
					hasMore={page === totalPage ? false : true}
					loader={
						<div
							className="loading-spin"
							style={{ textAlign: "center", marginTop: "50px" }}
						>
							<LoadingSpin primaryColor="red" />
						</div>
					}
				>
					<Row xs={1} sm={2} md={3} lg={4} className="w-100 w-full row-anime">
						{animeList.map((anime) => (
							<Col key={anime.slug}>
								<Card onClick={() => handleGetSlug(anime.slug)}>
									<div className="card-container">
										<Card.Img
											variant="top"
											src={anime.thumbnail}
											fluid="true"
										/>
										<div className="overlay-card">
											<a className="icon">{<BsFillPlayFill size={40} />}</a>
										</div>
									</div>
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
