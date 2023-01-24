import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import VideoPlayerSource from "../VideoPlayer"
import useDocumentTitle from "../DocumentTitleHook"
import { BsFillArrowLeftSquareFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import LoadingRequest from "../LoadingRequest"
import { API } from "../../../constants"
import { MAINSITE } from "../../../constants"

function AnimeWatchENG() {
	const { animeId } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const current = queryParams.get("current")
	const provider = queryParams.get("provider")
	const [info, setInfo] = useState([])
	const [watchDetail, setWatchDetail] = useState("Loading")
	const [videoUrl, setVideoUrl] = useState()
	const [videoLoading, setVideoLoading] = useState(true)
	const [subtitles, setSubtitles] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getAnimeEpisodeList = async () => {
			await axios
				.get(
					`https://api.consumet.org/meta/anilist/info/${animeId}?provider=${provider}`,
					{
						cancelToken: source.token,
					}
				)
				.then((response) => {
					const listEpisode = response.data
					const episodeTitle = listEpisode.episodes.find((obj) => {
						return obj.id === current
					})
					setInfo(listEpisode.episodes)
					setWatchDetail(
						`${
							listEpisode.title?.english ||
							listEpisode.title?.romanji ||
							listEpisode.title?.native
						} - EP. ${episodeTitle.number} - ${episodeTitle.title}`
					)
				})
				.then(async () => {
					await axios
						.get(
							`https://api.consumet.org/meta/anilist/watch/${current}?provider=${provider}`,
							{
								cancelToken: source.token,
							}
						)
						.then((response) => {
							if (provider === "zoro") {
								const urlData = response
								const zoroUrl = urlData.data.sources.find((obj) => {
									if (obj.quality === "default") {
										return obj.quality === "default"
									}
									if (obj.quality === "auto") {
										return obj.quality === "auto"
									}
									if (obj.quality === "backup") {
										return obj.quality === "backup"
									}
								})
								setSubtitles(urlData.data.subtitles)
								const CORS = "https://cors.proxy.consumet.org/"
								setVideoUrl(`${API}/cors/${zoroUrl.url}`)
							} else {
								const urlData = response
								const gogoUrl = urlData.data.sources.find((obj) => {
									if (obj.quality === "default") {
										return obj.quality === "default"
									}
									if (obj.quality === "auto") {
										return obj.quality === "auto"
									}
									if (obj.quality === "backup") {
										return obj.quality === "backup"
									}
								})
								setVideoUrl(gogoUrl.url)
							}
							setVideoLoading(false)
						})
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})

			const element = document.getElementsByClassName("active")[0]
			if (element) {
				element.scrollIntoView({ behavior: "smooth" })
			}
		}

		getAnimeEpisodeList()

		return () => {
			source.cancel()
		}
	}, [animeId, current, provider])

	const chooseEpisode = (episodeId) => {
		window.location.href = `${MAINSITE}/eng/watch/${animeId}?current=${episodeId}&provider=${provider}`
	}

	const skip = (time) => {
		document.getElementsByTagName("video")[0].currentTime =
			document.getElementsByTagName("video")[0].currentTime + time
	}

	const seekForward = () => {
		skip(1)
	}

	const seekBackward = () => {
		skip(-1)
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

	useDocumentTitle(watchDetail)
	return (
		<div style={{ marginTop: "-90px" }}>
			<div
				className="video-js-wrapper"
				style={{ display: "flex", height: "100vh" }}
			>
				{videoLoading ? (
					<LoadingRequest />
				) : (
					<VideoPlayerSource
						videoUrl={videoUrl}
						index={current}
						subtitles={subtitles}
					/>
				)}

				<div className="episode-content">
					<div className="episode-section">
						<div className="episode-section-fixed">
							<Link to={`/eng/info/${animeId}`}>
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
									EPISODE LIST
								</h5>
							</div>
						</div>
					</div>
					<div className="episode-bracket">
						{info.map((item, i) => (
							<Link
								to={`/eng/watch/${animeId}?current=${item.id}&provider=${provider}`}
								style={{ color: "white" }}
								key={item.number}
								title={
									item.title
										? `EP. ${item.number} - ${item.title}`
										: `Episode - ${item.number}`
								}
								className={current === item.id ? "episode active" : "episode"}
								onClick={() => chooseEpisode(item.id)}
							>
								<div>
									<p>
										{item.title
											? `EP. ${item.number} - ${item.title}`
											: `Episode - ${item.number}`}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AnimeWatchENG
