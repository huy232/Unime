import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import VideoPlayerSource from "../../../Components/Content/VideoPlayer"
import VideoEmbed from "../../../Components/Content/VideoEmbed"
import useDocumentTitle from "../../../Components/Content/DocumentTitleHook"
import { BsFillArrowLeftSquareFill } from "react-icons/bs"
import LoadingRequest from "../../../Components/Content/LoadingRequest"
import "./animewatch.css"
import VideoPlayer from "../VideoPlayer"

function AnimeWatch({ instance }) {
	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")
	const episode = queryParams.get("episode")
	const specialid = queryParams.get("specialid")
	const [info, setInfo] = useState([])
	const [watchDetail, setWatchDetail] = useState("Đang tải")
	const [videoUrl, setVideoUrl] = useState([])
	const [videoEmbed, setVideoEmbed] = useState("")
	const [videoLoading, setVideoLoading] = useState(true)

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
								setVideoLoading(true)
								let videoUrlResponse = ""
								// VIDEO URL IS HERE
								if (typeof res.data.data?.videoSource !== "undefined") {
									setVideoUrl([
										{
											file: res.data.data.videoSource,
											label: "STANDARD",
										},
									])
								} else {
									videoUrlResponse = res.data.data.embedSource
									setVideoEmbed(videoUrlResponse)
								}
								const watchFilm = res.data.data.film_name
								const watchEpisodeName = res.data.data.full_name
								setWatchDetail(watchFilm + ` (${watchEpisodeName})`)
								setVideoLoading(false)
							})
					}
					if (specialid !== null) {
						const numSpecialId = Number(specialid)
						await instance
							.get(`/specialanime/${mainId}/${numSpecialId}`)
							.then((res) => {
								setVideoLoading(true)
								// VIDEO URL IS HERE
								const watchFilm = res.data.data.film_name
								const watchEpisodeName = res.data.data.full_name
								setWatchDetail(watchFilm + ` (${watchEpisodeName})`)
								setVideoUrl([
									{
										file: res.data.data.videoSource,
										label: "STANDARD",
									},
								])
								setVideoLoading(false)
							})
					}
					const element = document.getElementsByClassName("active")[0]
					if (element) {
						element.scrollIntoView({ behavior: "smooth" })
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
	}, [anime, episode, index, instance, specialid, videoLoading])

	useDocumentTitle(watchDetail)

	return (
		<>
			<div>
				<div
					className="video-js-wrapper"
					style={{ display: "flex", height: "100vh" }}
				>
					{videoLoading ? (
						<LoadingRequest />
					) : videoUrl.length > 0 ? (
						<VideoPlayer videoUrl={videoUrl} />
					) : (
						videoEmbed && <VideoEmbed videoEmbed={videoEmbed} />
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
									to={`/watch/${anime}?index=${item.name}`}
									style={{ color: "white" }}
									key={i}
									title={item.full_name}
									className={
										parseInt(index) === parseInt(item.name)
											? "episode active"
											: "episode"
									}
								>
									<div>
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
