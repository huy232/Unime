import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import axios from "axios"
import "./animewatch.css"

function AnimeWatch({ instance }) {
	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")
	const [video, setVideo] = useState("")

	const [info, setInfo] = useState([])

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

					await instance
						.get(`/anime/${mainId}/episodes/${index}`, {
							cancelToken: source.token,
						})
						.then((res) => setVideo(res.data.data.videoSource))
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getList()

		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			{video ? (
				<div className="player-wrapper" style={{ marginTop: "-90px" }}>
					<ReactPlayer
						className="react-player"
						url={video}
						controls={true}
						width="100%"
						height="100vh"
						autoPlay={true}
					/>
				</div>
			) : (
				""
			)}
		</>
	)
}

export default AnimeWatch
