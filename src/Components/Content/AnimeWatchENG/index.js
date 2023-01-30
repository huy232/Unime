import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import useDocumentTitle from "../DocumentTitleHook"
import { BsFillArrowLeftSquareFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import LoadingRequest from "../LoadingRequest"
import { API, CONSUMET_API } from "../../../constants"
import VideoPlayer from "../VideoPlayer"

function AnimeWatchENG() {
	const { animeId } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const current = queryParams.get("current")
	const provider = queryParams.get("provider")
	const [info, setInfo] = useState([])
	const [watchDetail, setWatchDetail] = useState("Loading")
	const [videoUrl, setVideoUrl] = useState([])
	const [videoLoading, setVideoLoading] = useState(true)
	const [subtitles, setSubtitles] = useState([])
	const [thumbnail, setThumbnail] = useState()
	const [title, setTitle] = useState("")
	const prevAnilist = useRef()

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const filmEpisodeList = async () => {
			if (prevAnilist.current !== animeId) {
				const { data } = await axios
					.get(
						`${CONSUMET_API}/meta/anilist/info/${animeId}?provider=${provider}`,
						{
							cancelToken: source.token,
						}
					)
					.catch((thrown) => {
						if (axios.isCancel(thrown)) return
					})
				const listEpisode = data
				const episodeTitle = listEpisode.episodes.find((obj) => {
					return obj.id === current
				})
				setWatchDetail(
					`${
						listEpisode.title?.english ||
						listEpisode.title?.romanji ||
						listEpisode.title?.native
					} - EP. ${episodeTitle.number} - ${episodeTitle.title}`
				)
				setTitle(
					listEpisode.title?.english ||
						listEpisode.title?.romanji ||
						listEpisode.title?.native
				)
				setInfo(listEpisode.episodes)
			}
			prevAnilist.current = animeId
		}

		if (info.length > 0) {
			const episodeTitle = info.find((obj) => {
				return obj.id === current
			})
			setWatchDetail(
				`${title} - EP. ${episodeTitle.number} - ${episodeTitle.title}`
			)
		}

		const filmEpisodeWatch = async () => {
			await axios
				.get(
					`${CONSUMET_API}/meta/anilist/watch/${current}?provider=${provider}`,
					{
						cancelToken: source.token,
					}
				)
				.then((response) => {
					if (provider === "zoro") {
						const zoroUrl = response.data.sources
						let subs = []
						if (response.data.subtitles) {
							subs = response.data.subtitles.filter(
								(option) => option.lang !== "Thumbnails"
							)
						}
						setSubtitles(
							subs.map((sub, i) => ({
								html: `${i}. ${sub.lang}`,
								url: sub.url,
							}))
						)
						setThumbnail(
							response.data.subtitles.find((sub) => sub.lang === "Thumbnails")
						)
						// setVideoUrl(`${API}/cors/${zoroUrl.url}`)
						setVideoUrl(
							zoroUrl.map((source) => ({
								url: `${API}/cors/${source.url}`,
								html: source.quality,
								default: source.quality === "auto" ? true : false,
							}))
						)
					}
					if (provider === "") {
						const gogoUrl = response.data.sources
						setVideoUrl(
							gogoUrl.map((source) => ({
								url: `${API}/cors/${source.url}`,
								html: source.quality,
								default: source.quality === "auto" ? true : false,
							}))
						)
					}
					setVideoLoading(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const element = document.getElementsByClassName("active")[0]
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}

		filmEpisodeList()
		filmEpisodeWatch()

		return () => {
			source.cancel()
		}
	}, [animeId, current, info, provider, title])

	// const chooseEpisode = (episodeId) => {
	// 	window.location.href = `${MAINSITE}/eng/watch/${animeId}?current=${episodeId}&provider=${provider}&prefer=${prefer}`
	// }

	useDocumentTitle(watchDetail)
	return (
		<div>
			<div
				className="video-js-wrapper"
				style={{ display: "flex", height: "100vh" }}
			>
				{videoLoading ? (
					<LoadingRequest />
				) : (
					<VideoPlayer
						videoUrl={videoUrl}
						subtitles={subtitles}
						thumbnail={thumbnail?.url ? thumbnail.url : ""}
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
								onClick={() => setVideoLoading(true)}
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
