import React from "react"
import Artplayer from "../ArtPlayer"
import "./videoplayer.css"
import { useNavigate, useParams } from "react-router-dom"

function VideoPlayer({
	videoUrl,
	info,
	subtitles,
	thumbnail,
	listEpisode,
	setVideoLoading,
}) {
	const navigate = useNavigate()
	const selectedSub = localStorage.getItem("artplayer-language")
	const { animeId, anime } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const current = queryParams.get("current")
	const provider = queryParams.get("provider")
	const index = queryParams.get("index")

	let previousEpisode = null
	let nextEpisode = null
	if (listEpisode?.length > 0) {
		if (provider) {
			let currentIndex = listEpisode.findIndex(
				(episode) => episode.id === current
			)
			if (listEpisode[currentIndex - 1]) {
				previousEpisode = listEpisode[currentIndex - 1]
			}
			if (listEpisode[currentIndex + 1]) {
				nextEpisode = listEpisode[currentIndex + 1]
			}
		}

		if (anime) {
			let currentIndex = listEpisode.findIndex(
				(episode) => episode.name === Number(index)
			)
			if (listEpisode[currentIndex - 1]) {
				previousEpisode = listEpisode[currentIndex - 1]
			}
			if (listEpisode[currentIndex + 1]) {
				nextEpisode = listEpisode[currentIndex + 1]
			}
		}
	}

	return (
		<>
			<Artplayer
				option={{
					setting: true,
					muted: false,
					autoplay: true,
					pip: false,
					autoSize: true,
					autoMini: true,
					screenshot: true,
					flip: true,
					playbackRate: true,
					aspectRatio: true,
					fullscreen: true,
					fullscreenWeb: true,
					subtitleOffset: true,
					miniProgressBar: true,
					mutex: true,
					backdrop: true,
					playsInline: true,
					volume: 1,
					airplay: false,
					lang: navigator.language.toLowerCase(),
					whitelist: ["*"],
					moreVideoAttr: {
						crossOrigin: "anonymous",
					},
					controls: [
						{
							html: `<svg style="width:16px;height:16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"/></svg>`,
							position: "right",
							index: 1,
							style: {
								cursor: nextEpisode ? "pointer" : "not-allowed",
								opacity: nextEpisode ? "1" : "0.2",
								fill: "#fff",
								marginRight: "2px",
							},
							click: function () {
								if (nextEpisode?.full_name) {
									setVideoLoading(true)
									navigate(`/watch/${anime}?index=${nextEpisode.name}`)
								}
								if (nextEpisode?.title) {
									setVideoLoading(true)
									navigate(
										`/eng/watch/${animeId}?current=${nextEpisode.id}&provider=${provider}`
									)
								}
							},
						},
						{
							html: `<svg style="width:16px;height:16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"/></svg>`,
							position: "right",
							index: 1,
							style: {
								cursor: previousEpisode ? "pointer" : "not-allowed",
								opacity: previousEpisode ? "1" : "0.2",
								fill: "#fff",
								marginRight: "2px",
							},
							click: function () {
								if (previousEpisode?.full_name) {
									setVideoLoading(true)
									navigate(`/watch/${anime}?index=${previousEpisode.name}`)
								}
								if (previousEpisode?.title) {
									setVideoLoading(true)
									navigate(
										`/eng/watch/${animeId}?current=${previousEpisode.id}&provider=${provider}`
									)
								}
							},
						},
					],
					subtitle: {
						url: `${
							subtitles &&
							subtitles.find((sub) => selectedSub === sub.html.split(" ")[1])
								?.url
						}`,
						style: {
							"font-weight": "400",
							"font-size": "2rem",
							"background-color": "rgba(0, 0, 0, 0.75)",
							"border-radius": "0.25rem",
							position: "relative",
							height: "fit-content",
							width: "auto",
							"margin-right": "auto",
							"margin-left": "auto",
							"margin-top": "auto",
							"margin-bottom": "2rem",
							"white-space": "break-spaces",
						},
						escape: false,
					},
				}}
				subtitles={subtitles}
				videoUrl={videoUrl}
				className="w-[80vw] max-lg:w-full h-[50vh] lg:h-[100vh]"
			/>
		</>
	)
}

export default VideoPlayer
