import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import VideoPlayer from "../VideoJsHook/index"
// import "plyr-react/dist/plyr.css"

import "./animewatch.css"

function AnimeWatch({ instance }) {
	const navigate = useNavigate()
	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")

	const [info, setInfo] = useState([])
	const [titleAnime, setTitleAnime] = useState("")
	const [currentEpisodeName, setCurrentEpisodeName] = useState("")

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
					const numIndex = Number(index)
					setTitleAnime(response.data.data.name)
					setInfo(response.data.data.episodes)

					await instance
						.get(`/anime/${mainId}/episodes/${numIndex}`, {
							cancelToken: source.token,
						})
						.then((res) => {
							// VIDEO URL IS HERE
							const videoUrlResponse = res.data.data.videoSource
							setVideoUrl(videoUrlResponse)
							setCurrentEpisodeName(res.data.data.full_name)
						})
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
				<div className="video-js-wrapper">
					{videoUrl ? (
						<VideoPlayer
							src={videoUrl}
							controls={true}
							autoplay={true}
							anime={anime}
							info={info}
							index={index}
						/>
					) : (
						""
					)}
				</div>
			</div>
		</>
	)
}
export default AnimeWatch
