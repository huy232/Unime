import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
import LoadingSpin from "react-loading-spin"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import "./animelist.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

const PAGE_NUMBER = 1

function AnimeList({ instance }) {
	const [animeList, setAnimeList] = useState([])
	const [page, setPage] = useState(PAGE_NUMBER)
	const [totalPage, setTotalPage] = useState(2)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getList = async () => {
			await instance
				.get(`/anime?page=${page}`, {
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

		return () => {
			source.cancel()
		}
	}, [instance, page])

	useDocumentTitle("Tất cả Anime - Unime")

	const scrollThreshold = () => {
		const newPage = page + 1
		setPage(newPage)
	}

	return (
		<>
			<div
				className="title-wrapper"
				style={{ textAlign: "center", margin: "20px 0" }}
			>
				<h1 className="font-black" style={{ display: "inline-block" }}>
					TẤT CẢ ANIME
				</h1>
			</div>
			{loading ? (
				<div className="loading-spin w-full text-center">
					<LoadingSpin primaryColor="red" />
				</div>
			) : (
				<div className="anime-list pb-12 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
					<InfiniteScroll
						style={{ overflow: "none" }}
						dataLength={animeList.length}
						next={scrollThreshold}
						hasMore={page === totalPage ? false : true}
						loader={
							<div className="loading-spin">
								<LoadingSpin primaryColor="red" />
							</div>
						}
					>
						<Row xs={1} sm={2} md={3} lg={4} className="w-full row-anime mb-4">
							{animeList.map((anime) => (
								<Col key={anime.slug}>
									<nav>
										<Link to={`/info/${anime.slug}`} aria-label={anime?.name}>
											<Card title={anime?.name}>
												<div className="card-container">
													<Card.Img
														variant="top"
														src={anime.thumbnail}
														fluid="true"
														loading="lazy"
														alt={anime.name}
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
									</nav>
									<div className="w-full"></div>
								</Col>
							))}
						</Row>
					</InfiniteScroll>
				</div>
			)}
		</>
	)
}

export default AnimeList
