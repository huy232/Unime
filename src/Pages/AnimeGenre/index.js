import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { GENRES } from "../../constants"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import LoadingSpin from "react-loading-spin"
import { BsFillPlayFill } from "react-icons/bs"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

const PAGE_NUMBER = 1

function AnimeGenre({ instance }) {
	const { genre } = useParams()

	const [animeList, setAnimeList] = useState([])
	const [genreAnime, setGenreAnime] = useState("")
	const [page, setPage] = useState(PAGE_NUMBER)
	const [totalPage, setTotalPage] = useState(true)
	const [translateGenreAnime, setTranslateGenreAnime] = useState("")
	const [loading, setLoading] = useState(true)

	const scrollThreshold = () => {
		const newPage = page + 1
		setPage(newPage)
	}

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const translateGenre = () => {
			for (let i = 0; i < GENRES.length; i++) {
				if (genreAnime === GENRES[i].slug) {
					setTranslateGenreAnime(GENRES[i].name)
				}
			}
		}

		if (genre === genreAnime) {
			const getList = async () => {
				await instance
					.get(`/anime/${genre}?page=${page}`, {
						cancelToken: source.token,
					})
					.then((response) => {
						if (response.data.success) {
							const newList = response.data.data.map((anime) => ({
								slug: anime.slug,
								thumbnail: anime.thumbnail,
								name: anime.name,
								views: anime.views,
								animeFormat: anime.animeFormat,
							}))
							setTotalPage(response.data.pagination.totalPage)
							setAnimeList((prev) => {
								return [...new Set([...prev, ...newList])]
							})
							setLoading(false)
						}
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
	}, [genreAnime, genre, page, instance])

	return (
		<>
			<div>
				<h1 className="font-black">ANIME {translateGenreAnime}</h1>
				{useDocumentTitle(`Thể loại ${translateGenreAnime} - Unime`)}
			</div>
			<div className="anime-list pb-12 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
				{loading ? (
					<div className="loading-spin w-full text-center">
						<LoadingSpin primaryColor="red" />
					</div>
				) : (
					<InfiniteScroll
						initialScrollY={0}
						style={{ overflow: "none" }}
						dataLength={animeList.length}
						scrollThreshold={0.9}
						next={scrollThreshold}
						hasMore={page === totalPage ? false : true}
						loader={
							<div className="loading-spin">
								<LoadingSpin primaryColor="red" />
							</div>
						}
					>
						<Row
							xs={1}
							sm={2}
							md={3}
							lg={4}
							className="w-full w-full row-anime"
						>
							{animeList.map((anime) => (
								<Col key={anime?.slug}>
									<Link to={`/info/${anime?.slug}`} aria-label={anime?.name}>
										<Card title={anime?.name}>
											<div className="card-container">
												<Card.Img
													variant="top"
													src={anime?.thumbnail}
													fluid="true"
													loading="lazy"
													alt={anime?.name}
												/>
												{anime?.views && (
													<p className="text-[#fffc] top-0 right-0 bg-[#0d0d0d]/[0.8] flex items-center rounded-[2px] m-[4px] p-[4px] absolute">
														<FontAwesomeIcon
															icon={faEye}
															className="pr-[2px] h-[14px] w-[14px] mt-[2px]"
														/>
														{anime.views.toLocaleString()} lượt xem
													</p>
												)}
												<div className="overlay-card">
													<div className="icon">
														{<BsFillPlayFill size={40} />}
													</div>
												</div>
											</div>
											<Card.Body className="h-[150px]">
												<Card.Title>
													<div className="h-[70px]">
														<p className="webclamp text-orange-50 font-semibold">
															{anime?.name}
														</p>
													</div>
												</Card.Title>
												<p className="text-[#fffc] flex items-center rounded-[2px] m-[4px]">
													{anime.animeFormat}
												</p>
											</Card.Body>
										</Card>
									</Link>
								</Col>
							))}
						</Row>
					</InfiniteScroll>
				)}
			</div>
		</>
	)
}

export default AnimeGenre
