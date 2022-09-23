import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import VideoPlayer from "../VideoJsHook/index"
import useDocumentTitle from "../DocumentTitleHook"
import { BsFillArrowLeftSquareFill } from "react-icons/bs"
import LoadingRequest from "../LoadingRequest"
import "./animewatch.css"

function AnimeWatch({ instance }) {
	const navigate = useNavigate()
	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")
	const specialid = queryParams.get("specialid")
	const [info, setInfo] = useState([])
	const [watchDetail, setWatchDetail] = useState("Đang tải")
	const [videoUrl, setVideoUrl] = useState("")
	const [videoEmbed, setVideoEmbed] = useState("")

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
								let videoUrlResponse = ""
								// VIDEO URL IS HERE
								if (typeof res.data.data?.videoSource !== "undefined") {
									videoUrlResponse = res.data.data.videoSource
									setVideoUrl(videoUrlResponse)
								} else {
									videoUrlResponse = res.data.data.embedSource
									setVideoEmbed(videoUrlResponse)
								}
								const watchFilm = res.data.data.film_name
								const watchEpisodeName = res.data.data.full_name
								setWatchDetail(watchFilm + ` (${watchEpisodeName})`)
							})
					}
					if (specialid !== null) {
						const numSpecialId = Number(specialid)
						await instance
							.get(`/specialanime/${mainId}/${numSpecialId}`)
							.then((res) => {
								// VIDEO URL IS HERE
								const videoUrlResponse = res.data.data.videoSource
								const watchFilm = res.data.data.film_name
								const watchEpisodeName = res.data.data.full_name
								setWatchDetail(watchFilm + ` (${watchEpisodeName})`)
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
		window.location.href = `https://unime.vercel.app/watch/${anime}?index=${index}`
	}

	const goBackButton = () => {
		navigate(`/info/${anime}`)
	}

	const skip = (time) => {
		document.getElementsByTagName("video")[0].currentTime =
			document.getElementsByTagName("video")[0].currentTime + time
	}

	const seekForward = () => {
		skip(10)
	}

	const seekBackward = () => {
		skip(-5)
	}

	const seekUpVolume = () => {
		document.getElementsByTagName("video")[0].volume = Math.min(
			1,
			document.getElementsByTagName("video")[0].volume + 0.04
		)
	}

	const seekDownVolume = () => {
		document.getElementsByTagName("video")[0].volume = Math.max(
			0,
			document.getElementsByTagName("video")[0].volume - 0.04
		)
	}

	const toggleMute = () => {
		if (document.getElementsByTagName("video")[0].volume === 1) {
			document.getElementsByTagName("video")[0].volume = 0
		} else {
			document.getElementsByTagName("video")[0].volume = 1
		}
	}

	if (videoUrl) {
		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowRight") {
				seekForward()
			}
			if (e.key === "ArrowLeft") {
				seekBackward()
			}
			if (e.key === "ArrowUp") {
				seekUpVolume()
			}
			if (e.key === "ArrowDown") {
				seekDownVolume()
			}
			if (e.key === "m" || e.key === "M") {
				toggleMute()
			}
		})
	}

	return (
		<>
			<div style={{ marginTop: "-90px" }}>
				<div
					className="video-js-wrapper"
					style={{ display: "flex", height: "100vh" }}
				>
					{videoUrl !== "" ? (
						<>
							<VideoPlayer
								src={videoUrl}
								controls={true}
								autoplay={true}
								anime={anime}
								info={info}
								index={index}
							/>
						</>
					) : videoEmbed !== "" ? (
						<iframe
							src={videoEmbed}
							allow="autoplay; fullscreen"
							width="100%"
							height="100%"
							title="videoFrame"
							frame-src="self"
							frame-ancestors="self"
						/>
					) : (
						<LoadingRequest />
					)}
					<div className="episode-content">
						<div className="episode-section">
							<div className="episode-section-fixed">
								<button
									onClick={() => goBackButton()}
									style={{
										backgroundColor: "black",
										border: "none",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
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
							{anime !== "vua-hai-tac"
								? info.map((item) => (
										<Link
											to={`/watch/${anime}?index=${item.name - 1}`}
											style={{ color: "white" }}
											key={item.name}
										>
											<div
												className={
													parseInt(index) === parseInt(item.name - 1)
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
													parseInt(index) === parseInt(item.name)
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
				</div>
			</div>
		</>
	)
}
export default AnimeWatch
