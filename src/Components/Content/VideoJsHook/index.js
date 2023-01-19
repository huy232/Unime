import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import videojs from "video.js"
import "video.js/dist/video-js.min.css"
import "./videojs.css"
import videoJsContribQualityLevels from "videojs-contrib-quality-levels"
import videojsHlsQualitySelector from "videojs-hls-quality-selector"
videojs.registerPlugin("qualityLevel", videoJsContribQualityLevels)
videojs.registerPlugin("hlsQualitySelector", videojsHlsQualitySelector)

// eslint-disable-next-line import/prefer-default-export

const usePlayer = ({ src, controls, autoplay, anime, info, index }) => {
	const videoRef = useRef(null)
	const [player, setPlayer] = useState(null)

	useEffect(() => {
		const options = {
			userActions: {
				hotkeys: {
					fullscreenKey: function (event) {
						return event.which === 13
					},
					playPauseKey: function (event) {
						return event.which === 32
					},
				},
			},
			fill: true,
			fluid: true,
			preload: "auto",
			html5: {
				hls: {
					enableLowInitialPlaylist: true,
					smoothQualityChange: true,
					overrideNative: true,
				},
			},
			playbackRates: [0.5, 1, 1.5, 2],
			plugins: {
				qualityLevel: {},
				hlsQualitySelector: { displayCurrentQuality: true },
			},
		}

		const vjsPlayer = videojs(videoRef.current, {
			...options,
			controls,
			autoplay,
			sources: [src],
		})
		setPlayer(vjsPlayer)

		return () => {
			if (player !== null) {
				player.dispose()
			}
		}
	}, [autoplay, controls, index, player, src])
	useEffect(() => {
		if (player !== null) {
			player.src({ src })
		}
	}, [player, src])

	return videoRef
}

const VideoPlayer = ({ src, controls, autoplay, anime, info, index }) => {
	const playerRef = usePlayer({ src, controls, autoplay, anime, info, index })
	const RPC = require("discord-rpc")
	const rpc = new RPC.Client({ transport: "ipc" })

	function setActivity() {
		if (!rpc) return
		rpc.setActivity({
			details: `Đang xem phim`,
			state: `UNIME`,
			startTimestamp: new Date(),
			largeImageKey: `discord-large-unime`,
			largeImageText: ``,
			smallImageKey: `discord-small-unime`,
			smallImageText: ``,
			instance: false,
			buttons: [
				{
					label: ``,
					url: ``,
				},
			],
		})
		console.log("RPC is running")
	}

	return (
		<>
			<video
				ref={playerRef}
				className="video-js"
				onLoadedData={() => {
					rpc.on("ready", async () => {
						setActivity()

						setInterval(() => {
							setActivity()
						}, 3 * 1000)
					})

					rpc
						.login({ clientId: "1065036808737542284" })
						.catch((err) => console.log("RPC Offline"))
				}}
			/>
		</>
	)
}

VideoPlayer.propTypes = {
	src: PropTypes.string.isRequired,
	controls: PropTypes.bool,
	autoplay: PropTypes.bool,
}

VideoPlayer.defaultProps = {
	controls: true,
	autoplay: false,
}

export default VideoPlayer
