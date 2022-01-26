import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { GENRES } from "../../../constants"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import TextTruncate from "react-text-truncate"
import Skeleton from "@mui/material/Skeleton"
import { BsFillPlayFill } from "react-icons/bs"

const PAGE_NUMBER = 1

function AnimeGenre({ instance }) {
	const navigate = useNavigate()
	const { genre } = useParams()

	const [animeList, setAnimeList] = useState([])
	const [genreAnime, setGenreAnime] = useState("")
	const [page, setPage] = useState(PAGE_NUMBER)
	const [totalPage, setTotalPage] = useState(2)
	const [translateGenreAnime, setTranslateGenreAnime] = useState("")

	const scrollThreshold = () => {
		const newPage = page + 1
		setPage(newPage)
	}

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		if (genre === genreAnime) {
			const getList = async () => {
				await instance
					.get(`/anime/${genre}?page=${page}`, {
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
			translateGenre()
		} else {
			setPage(1)
			setAnimeList([])
			setGenreAnime(genre)
		}

		return () => {
			source.cancel()
		}
	}, [genreAnime, genre, page])

	const translateGenre = () => {
		for (let i = 0; i < GENRES.length; i++) {
			if (genreAnime == GENRES[i].slug) {
				setTranslateGenreAnime(GENRES[i].name)
			}
		}
	}

	const handleGetSlug = (slug) => {
		navigate(`/info/${slug}`)
	}

	return (
		<>
			<div>
				<h1>ANIME {translateGenreAnime}</h1>
			</div>
			<div className="anime-list">
				<InfiniteScroll
					initialScrollY={0}
					style={{ overflow: "none" }}
					dataLength={animeList.length}
					scrollThreshold={0.95}
					next={scrollThreshold}
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
				>
					<Row xs={1} sm={2} md={3} lg={4}>
						{animeList.map((anime) => (
							<Col key={anime?.slug}>
								<Card onClick={() => handleGetSlug(anime.slug)}>
									<div className="card-container">
										<Card.Img
											variant="top"
											src={anime?.thumbnail}
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

export default AnimeGenre
