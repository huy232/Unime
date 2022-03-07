import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ThreeDots } from "react-loading-icons"
import VideoPlayer from "../VideoJsHook/index"
// import "plyr-react/dist/plyr.css"

import "./animewatch.css"

function AnimeWatch({ instance }) {
	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")
	const specialid = queryParams.get("specialid")
	const [info, setInfo] = useState([])

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
