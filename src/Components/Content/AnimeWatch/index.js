import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import axios from "axios"

import { Container, makeStyles } from "@material-ui/core/"

import "./animewatch.css"
import PlayerControls from "../PlayerControls/index"
import screenfull from "screenfull"

const useStyles = makeStyles({
	playerWrapper: {
		width: "100%",
		position: "relative",
	},
})

const format = (seconds) => {
	if (isNaN(seconds)) {
		return "00:00"
	}

	const date = new Date(seconds * 1000)
	const hh = date.getUTCHours()
	const mm = date.getUTCMinutes()
	const ss = date.getUTCSeconds().toString().padStart(2, "0")

	if (hh) {
		return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
	}

	return `${mm}:${ss}`
}

let count = 0

function AnimeWatch({ instance }) {
	const classes = useStyles()
	const playerRef = useRef(null)
	const playerContainerRef = useRef(null)
	const controlsRef = useRef(null)

	const { anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const index = queryParams.get("index")

	const [info, setInfo] = useState([])
	const [title, setTitle] = useState("")
	const [currentEpisodeName, setCurrentEpisodeName] = useState("")
	const [video, setVideo] = useState("")

	const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal")

	const [state, setState] = useState({
		playing: true,
		muted: false,
		volume: 1,
		playbackRate: 1.0,
		played: 0,
		seeking: false,
	})
	const [next, setNext] = useState(null)

	const { playing, muted, volume, playbackRate, played, seeking } = state

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

	const handleVolumeChange = (e, newValue) => {
		setState({
			...state,
			volume: parseFloat(newValue / 100),
			muted: newValue === 0 ? true : false,
		})
	}

	const handleVolumeSeekUp = (e, newValue) => {
		setState({
			...state,
			volume: parseFloat(newValue / 100),
			muted: newValue === 0 ? true : false,
		})
	}

	const handlePlaybackRateChange = (rate) => {
		setState({ ...state, playbackRate: rate })
	}

	const toggleFullScreen = () => {
		screenfull.toggle(playerContainerRef.current)
	}

	const handleProgress = (changeState) => {
		if (count > 2) {
			controlsRef.current.style.visibility = "hidden"
			count = 0
		}

		if (controlsRef.current.style.visibility == "visible") {
			count += 1
		}

		if (!seeking) {
			setState({ ...state, ...changeState })
		}
	}

	const handleSeekChange = (e, newValue) => {
		setState({ ...state, played: parseFloat(newValue / 100) })
	}

	const handleSeekMouseDown = (e) => {
		setState({ ...state, seeking: true })
	}

	const handleSeekMouseUp = (e, newValue) => {
		setState({ ...state, seeking: false })
		playerRef.current.seekTo(newValue / 100)
	}

	const handleChangeDisplayFormat = () => {
		setTimeDisplayFormat(
			timeDisplayFormat === "normal" ? "remaining" : "normal"
		)
	}

	const handleMouseMove = () => {
		controlsRef.current.style.visibility = "visible"
		count = 0
	}

	const currentTime = playerRef.current
		? playerRef.current.getCurrentTime()
		: "00: 00"
	const duration = playerRef.current
		? playerRef.current.getDuration()
		: "00: 00"

	const elapsedTime =
		timeDisplayFormat === "normal"
			? format(currentTime)
			: `-${format(duration - currentTime)}`
	const totalDuration = format(duration)

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
					if (response.data.data.episodes[numIndex + 1] !== undefined) {
						setNext(numIndex + 1)
					} else setNext(null)
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
	}, [index])

	return (
		<>
			<div style={{ marginTop: "-90px" }}>
				<Container maxWidth={false}>
					<div
						ref={playerContainerRef}
						className={classes.playerWrapper}
						onMouseMove={handleMouseMove}
					>
						<ReactPlayer
							ref={playerRef}
							className="react-player"
							url={video}
							width="100%"
							height="100vh"
							playing={playing}
							muted={muted}
							volume={volume}
							playbackRate={playbackRate}
							onProgress={handleProgress}
							playsinline={true}
						/>
						<PlayerControls
							ref={controlsRef}
							anime={anime}
							title={title}
							currentEpisodeName={currentEpisodeName}
							onPlayPause={handlePlayPause}
							playing={playing}
							onRewind={handleRewind}
							onFastForward={handleFastForward}
							muted={muted}
							onMute={handleMute}
							onVolumeChange={handleVolumeChange}
							onVolumeSeekUp={handleVolumeSeekUp}
							volume={volume}
							playbackRate={playbackRate}
							onPlaybackRateChange={handlePlaybackRateChange}
							onToggleFullScreen={toggleFullScreen}
							played={played}
							onSeek={handleSeekChange}
							onSeekMouseDown={handleSeekMouseDown}
							onSeekMouseUp={handleSeekMouseUp}
							elapsedTime={elapsedTime}
							totalDuration={totalDuration}
							onChangeDisplayFormat={handleChangeDisplayFormat}
							next={next}
						/>
					</div>
				</Container>
			</div>
		</>
	)
}

export default AnimeWatch
