import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { ThreeDots } from "react-loading-icons"
import VideoPlayer from "../VideoJsHook/index"
import useDocumentTitle from "../DocumentTitleHook"
// import "plyr-react/dist/plyr.css"

import "./animewatch.css"

function AnimeWatch({ instance }) {
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
							<div
								className="episode-content"
								style={{
									overflow: "scroll",
									maxHeight: "100vh",
									minHeight: "100vh",
								}}
							>
								<h4
									style={{
										fontSize: "24px",
										textAlign: "center",
										color: "white",
									}}
								>
									Danh sách tập phim
								</h4>
								<div className="episode-bracket">
									{anime != "vua-hai-tac"
										? info.map((item) => (
												<div
													className={
														parseInt(index) == parseInt(item.name - 1)
															? "episodes active"
															: "episodes"
													}
													key={item.name}
												>
													<Link
														to={`/watch/${anime}?index=${item.name - 1}`}
														onClick={() => chooseEpisode(item.name - 1)}
														style={{ color: "white" }}
													>
														<p>{item.full_name}</p>
													</Link>
												</div>
										  ))
										: info.map((item) => (
												<div
													className={
														parseInt(index) == parseInt(item.name)
															? "episodes active"
															: "episodes"
													}
													key={item.name}
												>
													<Link
														to={`/watch/${anime}?index=${item.name}`}
														onClick={() => chooseEpisode(item.name)}
														style={{ color: "white" }}
													>
														<p>{item.full_name}</p>
													</Link>
												</div>
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
							<div className="loading-text" style={{ color: "white" }}>
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
