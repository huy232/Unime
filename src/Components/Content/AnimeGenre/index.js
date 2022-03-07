import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { GENRES } from "../../../constants"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import TextTruncate from "react-text-truncate"
import LoadingSpin from "react-loading-spin"
import { BsFillPlayFill } from "react-icons/bs"
import useDocumentTitle from "../DocumentTitleHook"

const PAGE_NUMBER = 1

function AnimeGenre({ instance }) {
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

	return (
		<>
			<div>
				<h1>ANIME {translateGenreAnime}</h1>
				{useDocumentTitle(`Thể loại ${translateGenreAnime} - Mirai`)}
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
							<Col key={anime?.slug}>
								<nav>
									<Link to={`/info/${anime?.slug}`}>
										<Card>
											<div className="card-container">
												<Card.Img
													variant="top"
													src={anime?.thumbnail}
													fluid="true"
												/>
												<div className="overlay-card">
													<div className="icon">
														{<BsFillPlayFill size={40} />}
													</div>
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
									</Link>
								</nav>
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
