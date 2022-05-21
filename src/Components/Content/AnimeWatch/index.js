import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ThreeDots } from "react-loading-icons"
import VideoPlayer from "../VideoJsHook/index"
import useDocumentTitle from "../DocumentTitleHook"
import { BsFillArrowLeftSquareFill } from "react-icons/bs"

import "./animewatch.css"

function AnimeWatch({ instance }) {
	const navigate = useNavigate()
	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")
	const specialid = queryParams.get("specialid")
	const [info, setInfo] = useState([])
	const [name, setName] = useState("")
	const [watchDetail, setWatchDetail] = useState("Đang tải")
	const [videoUrl, setVideoUrl] = useState("")

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getList = async () => {
			await instance
				.get(`/watch/${anime}`, {
					cancelToken: source.token,
				})
				.then(async (response) => {
					const mainId = response.data.data.id
					setInfo(response.data.data.episodes)

					if (index !== null) {
						const numIndex = Number(index)
						await instance
							.get(`/anime/${mainId}/episodes/${numIndex}`, {
								cancelToken: source.token,
							})
							.then((res) => {
								// VIDEO URL IS HERE
								const videoUrlResponse = res.data.data.videoSource
								const watchFilm = res.data.data.film_name
								const watchEpisodeName = res.data.data.full_name
								setName(watchFilm)
								setWatchDetail(watchFilm + ` (${watchEpisodeName})`)
								setVideoUrl(videoUrlResponse)
							})
					}
					if (specialid !== null) {
						const numSpecialId = Number(specialid)
						await instance
							.get(`/specialanime/${mainId}/${numSpecialId}`)
							.then((res) => {
								// VIDEO URL IS HERE
								const videoUrlResponse = res.data.data.videoSource
								setVideoUrl(videoUrlResponse)
							})
					}
					document
						.getElementsByClassName("active")[0]
						.scrollIntoView({ behavior: "smooth" })
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getList()

		return () => {
			source.cancel()
		}
	}, [Number(index), instance])

	useDocumentTitle(watchDetail)
	const chooseEpisode = (index) => {
		window.location.href = `https://mirai-huy8856.vercel.app/watch/${anime}?index=${index}`
	}

	const goBackButton = () => {
		navigate(`/info/${anime}`)
	}

	return (
		<>
			<div style={{ marginTop: "-90px" }}>
				<div className="video-js-wrapper" style={{ display: "flex" }}>
					{videoUrl ? (
						<>
							<VideoPlayer
								src={videoUrl}
								controls={true}
								autoplay={true}
								anime={anime}
								info={info}
								index={index}
							/>
							<div className="episode-content">
								<div className="episode-section">
									<div className="episode-section-fixed">
										<button
											onClick={() => goBackButton()}
											style={{ backgroundColor: "black", border: "none" }}
										>
											<BsFillArrowLeftSquareFill style={{ color: "white" }} />
										</button>
										<h5
											className="episode-section-title"
											style={{
												textAlign: "center",
												color: "white",
											}}
										>
											DANH SÁCH TẬP PHIM
										</h5>
									</div>
								</div>
								<div className="episode-bracket">
									{anime != "vua-hai-tac"
										? info.map((item) => (
												<Link
													to={`/watch/${anime}?index=${item.name - 1}`}
													style={{ color: "white" }}
													key={item.name}
												>
													<div
														className={
															parseInt(index) == parseInt(item.name - 1)
																? "episodes active"
																: "episodes"
														}
														onClick={() => chooseEpisode(item.name - 1)}
													>
														<p>{item.full_name}</p>
													</div>
												</Link>
										  ))
										: info.map((item) => (
												<Link
													to={`/watch/${anime}?index=${item.name}`}
													style={{ color: "white" }}
													key={item.name}
												>
													<div
														className={
															parseInt(index) == parseInt(item.name)
																? "episodes active"
																: "episodes"
														}
														onClick={() => chooseEpisode(item.name)}
													>
														<p>{item.full_name}</p>
													</div>
												</Link>
										  ))}
								</div>
							</div>
						</>
					) : (
						<div
							className="loading-request"
							style={{
								display: "flex",
								margin: "0 auto",
								height: "100vh",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<ThreeDots fill="#a30f0f" />
							<div
								className="loading-text"
								style={{ color: "white", textAlign: "center" }}
							>
								Đang tải phim
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
export default AnimeWatch
