import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
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
	const navigate = useNavigate()

	const options = {
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
		plugins: {
			qualityLevel: {},
			hlsQualitySelector: { displayCurrentQuality: true },
		},
	}
	const videoRef = useRef(null)
	const [player, setPlayer] = useState(null)

	useEffect(() => {
		const vjsPlayer = videojs(videoRef.current, {
			...options,
			controls,
			autoplay,
			sources: [src],
		})

		var Button = videojs.getComponent("Button")
		if (
			vjsPlayer.getChild("controlBar").childNameIndex_.MyButton === undefined
		) {
			var MyButton = videojs.extend(Button, {
				constructor: function () {
					Button.apply(this, arguments)
					this.addClass("go-back-btn")
					this.controlText("Go back")
					/* initialize your button */
				},
				handleClick: function () {
					/* do something on click */
					navigate(`/info/${anime}`)
				},
			})
			videojs.registerComponent("MyButton", MyButton)
			vjsPlayer.getChild("controlBar").addChild("MyButton", {})
			document.querySelector(".go-back-btn .vjs-icon-placeholder").innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/></svg>'
		}

		setPlayer(vjsPlayer)

		return () => {
			if (player !== null) {
				player.dispose()
			}
		}
	}, [index])
	useEffect(() => {
		if (player !== null) {
			player.src({ src })
		}
	}, [player, src])

	return videoRef
}

const VideoPlayer = ({ src, controls, autoplay, anime, info, index }) => {
	const playerRef = usePlayer({ src, controls, autoplay, anime, info, index })
	return (
		<>
			<div data-vjs-player>
				<video ref={playerRef} className="video-js" />
			</div>
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
