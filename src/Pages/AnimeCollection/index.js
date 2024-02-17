import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import LoadingSpin from "react-loading-spin"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

function AnimeCollection({ instance }) {
	const { collection } = useParams()
	const [animeList, setAnimeList] = useState([])
	const [translateGenreAnime, setTranslateGenreAnime] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getList = async () => {
			setLoading(true)
			await instance
				.get(`/collection/${collection}`, {
					cancelToken: source.token,
				})
				.then((response) => {
					const newList = response.data.data.list.map((anime) => ({
						slug: anime.slug,
						thumbnail: anime.thumbnail,
						name: anime.name,
						views: anime.views,
					}))
					setTranslateGenreAnime(response.data.data.title || "")
					setAnimeList((prev) => {
						return [new Set([...prev, ...newList])]
					})
					setLoading(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getList()
		return () => {
			source.cancel()
		}
	}, [collection, instance])

	return (
		<>
			<div>
				<h1 className="font-black">{translateGenreAnime}</h1>
				{useDocumentTitle(
					`${translateGenreAnime ? translateGenreAnime : "Đang tải"} - Unime`
				)}
			</div>

			<div className="anime-list pb-12 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
				{loading ? (
					<div className="loading-spin">
						<LoadingSpin primaryColor="red" />
					</div>
				) : (
					<Row xs={1} sm={2} md={3} lg={4} className="w-full row-anime mb-4">
						{animeList.map((anime) => (
							<Col key={anime?.slug}>
								<nav>
									<Link
										to={`/info/${anime?.slug}`}
										title={anime?.name}
										aria-label={anime?.name}
									>
										<Card>
											<div className="card-container">
												<Card.Img
													variant="top"
													src={anime?.thumbnail}
													fluid="true"
													loading="lazy"
													alt={anime?.name}
													style={{
														opacity: 0,
														transition: "opacity 0.5s ease-in-out",
													}}
													onLoad={(e) => {
														e.target.style.opacity = 1
													}}
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
											<Card.Body>
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
								</nav>
								<div className="w-full"></div>
							</Col>
						))}
					</Row>
				)}
			</div>
		</>
	)
}

export default AnimeCollection
