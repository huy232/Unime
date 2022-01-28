import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import axios from "axios"

import { Container, makeStyles } from "@material-ui/core/"

import "./animewatch.css"
import PlayerControls from "../PlayerControls/index"

const useStyles = makeStyles({
	playerWrapper: {
		width: "100%",
		position: "relative",
	},
})

function AnimeWatch({ instance }) {
	const classes = useStyles()
	const playerRef = useRef()

	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")

	const [info, setInfo] = useState([])
	const [title, setTitle] = useState("")
	const [currentEpisodeName, setCurrentEpisodeName] = useState("")
	const [video, setVideo] = useState("")

	const [state, setState] = useState({
		playing: true,
		muted: true,
	})

	const { playing, muted } = state

	const handlePlayPause = () => {
		setState({ ...state, playing: !state.playing })
	}

	const handleRewind = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
	}
	const handleFastForward = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
	}

	const handleMute = () => {
		setState({ ...state, muted: !state.muted })
	}

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
					setTitle(response.data.data.name)
					setInfo(response.data.data.episodes)

					await instance
						.get(`/anime/${mainId}/episodes/${index}`, {
							cancelToken: source.token,
						})
						.then((res) => {
							setCurrentEpisodeName(res.data.data.full_name)
							setVideo(res.data.data.videoSource)
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
	}, [])

	return (
		<>
			<div style={{ marginTop: "-90px" }}>
				<Container maxWidth={false}>
					<div className={classes.playerWrapper}>
						<ReactPlayer
							ref={playerRef}
							className="react-player"
							url={video}
							width="100%"
							height="100vh"
							playing={playing}
							muted={muted}
						/>
						<PlayerControls
							anime={anime}
							title={title}
							currentEpisodeName={currentEpisodeName}
							onPlayPause={handlePlayPause}
							playing={playing}
							onRewind={handleRewind}
							onFastForward={handleFastForward}
							muted={muted}
							onMute={handleMute}
						/>
					</div>
				</Container>
			</div>
		</>
	)
}

export default AnimeWatch
