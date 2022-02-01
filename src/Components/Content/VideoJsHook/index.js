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
		// GO TO INFO PAGE BUTTON
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

		// GO TO NEXT EPISODE BY INCREASE INDEX OF QUERY PARAMETER
		// if (index < info.length - 1) {
		// 	console.log("Pass down to where the index is checking length: ", index)
		// 	console.log("---------------")
		// 	if (
		// 		vjsPlayer.getChild("controlBar").childNameIndex_.MyButton2 === undefined
		// 	) {
		// 		console.log(
		// 			"Goes to here if it's the first time the button were created"
		// 		)
		// 		var MyButton2 = videojs.extend(Button, {
		// 			constructor: function () {
		// 				Button.apply(this, arguments)
		// 				this.addClass("go-next-btn")
		// 				this.controlText("Next episode")
		// 				/* initialize your button */
		// 			},
		// 			handleClick: () => {
		// 				/* do something on click */
		// 				navigate(`?index=${Number(index) + 1}`)
		// 				console.log(
		// 					"Handle click to increase the index: ",
		// 					Number(index) + 1
		// 				)
		// 			},
		// 		})
		// 		videojs.registerComponent("MyButton2", MyButton2)
		// 		vjsPlayer.getChild("controlBar").addChild("MyButton2", {})

		// 		document.querySelector(
		// 			".go-next-btn .vjs-icon-placeholder"
		// 		).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>`
		// 	}
		// }

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
	}, [src])

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
