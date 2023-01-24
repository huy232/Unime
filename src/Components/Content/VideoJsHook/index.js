import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "../../../Contexts/auth"
import videojs from "video.js"
import "video.js/dist/video-js.min.css"
import "./videojs.css"
import videoJsContribQualityLevels from "videojs-contrib-quality-levels"
import videojsHlsQualitySelector from "videojs-hls-quality-selector"
videojs.registerPlugin("qualityLevel", videoJsContribQualityLevels)
videojs.registerPlugin("hlsQualitySelector", videojsHlsQualitySelector)

// eslint-disable-next-line import/prefer-default-export

const usePlayer = ({
	src,
	controls,
	autoplay,
	anime,
	info,
	index,
	subtitles,
}) => {
	const videoRef = useRef(null)
	const [player, setPlayer] = useState(null)
	const { language } = useAuth()
	const queryParams = new URLSearchParams(window.location.search)
	const prefer = queryParams.get("prefer")
	const backupLanguage = localStorage.getItem("unime-prefer")

	let currentLanguage = prefer

	if (backupLanguage) {
		currentLanguage = backupLanguage
	} else {
		currentLanguage = language
	}

	useEffect(() => {
		const preferLanguage = {
			vi: "Vietnamese - Tiếng Việt",
			eng: "English",
		}

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
			tracks: subtitles
				? subtitles.map((sub) => ({
						src: sub.url,
						label: sub.lang,
						kind: "captions",
						default: sub.lang === preferLanguage[currentLanguage],
				  }))
				: {},
		}

		let vjsPlayer = videojs(videoRef.current, {
			...options,
			controls,
			autoplay,
			sources: [src],
		})

		setPlayer(vjsPlayer)

		return () => {
			if (player !== null && player.isDisposed_ === true) {
				player.dispose()
			}
		}
	}, [autoplay, controls, index, language, player, src, subtitles])

	useEffect(() => {
		if (player !== null) {
			player.src({ src })
		}
	}, [language, player, src, subtitles])

	return videoRef
}

const VideoPlayer = ({
	src,
	controls,
	autoplay,
	anime,
	info,
	index,
	subtitles,
}) => {
	const playerRef = usePlayer({
		src,
		controls,
		autoplay,
		anime,
		info,
		index,
		subtitles,
	})

	return <video ref={playerRef} className="video-js"></video>
}

export default VideoPlayer
