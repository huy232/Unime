import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import VideoPlayerSource from "../VideoPlayer"
import VideoEmbed from "../VideoEmbed"
import EnglishIframe from "../EnglishIframe"
import useDocumentTitle from "../DocumentTitleHook"
import { BsFillArrowLeftSquareFill } from "react-icons/bs"
import LoadingRequest from "../LoadingRequest"
import { MAINSITE } from "../../../constants"
import "./animewatch.css"

function AnimeWatch({ instance }) {
	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")
	const episode = queryParams.get("episode")
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
	}, [anime, episode, index, instance, specialid])

	useDocumentTitle(watchDetail)
	const chooseEpisode = (index, episode) => {
		window.location.href = `${MAINSITE}/watch/${anime}?index=${index}`
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
					{videoUrl ? (
						<VideoPlayerSource
							videoUrl={videoUrl}
							anime={anime}
							info={info}
							index={index}
						/>
					) : videoEmbed ? (
						<VideoEmbed videoEmbed={videoEmbed} />
					) : (
						<LoadingRequest />
					)}

					<div className="episode-content">
						<div className="episode-section">
							<div className="episode-section-fixed">
								<Link to={`/info/${anime}`}>
									<button
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
								</Link>
								<div className="episode-heading-section">
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
						</div>
						<div className="episode-bracket">
							{info.map((item, i) => (
								<Link
									to={`/watch/${anime}?index=${index}`}
									style={{ color: "white" }}
									key={i}
									title={item.full_name}
									className={
										parseInt(index) === parseInt(item.name)
											? "episode active"
											: "episode"
									}
								>
									<div onClick={() => chooseEpisode(item.name, i)}>
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
