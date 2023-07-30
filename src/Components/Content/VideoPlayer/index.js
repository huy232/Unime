import { memo } from "react"
import Artplayer from "../ArtPlayer"
import "./videoplayer.css"
import { useNavigate, useParams } from "react-router-dom"

function VideoPlayer({
	videoUrl,
	subtitles,
	listEpisode,
	setVideoLoading,
	intro,
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
	let tooltipPrevious = null
	let tooltipNext = null
	let highlightInfo = []

	if (listEpisode?.length > 0) {
		if (provider) {
			let currentIndex = listEpisode.findIndex(
				(episode) => episode.id === current
			)
			if (listEpisode[currentIndex - 1]) {
				previousEpisode = listEpisode[currentIndex - 1]
				tooltipPrevious = previousEpisode.number
			}
			if (listEpisode[currentIndex + 1]) {
				nextEpisode = listEpisode[currentIndex + 1]
				tooltipNext = nextEpisode.number
			}
		}

		if (anime) {
			let currentIndex = listEpisode.findIndex(
				(episode) => episode.name === Number(index)
			)

			if (listEpisode[currentIndex - 1]) {
				previousEpisode = listEpisode[currentIndex - 1]
				tooltipPrevious = previousEpisode.name
			}
			if (listEpisode[currentIndex + 1]) {
				nextEpisode = listEpisode[currentIndex + 1]
				tooltipNext = nextEpisode.name
			}
		}
	}

	if (intro) {
		highlightInfo = [
			{
				time: Number(intro.start),
				text: "Start intro",
			},
			{
				time: Number(intro.end),
				text: "End intro",
			},
		]
	}

	if (!subtitles) {
		subtitles = []
	}

	return (
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
							fill: "#fffc",
							marginRight: "2px",
						},
						tooltip: `${
							tooltipNext ? `EP. ${tooltipNext}` : "No next episode"
						}`,
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
							fill: "#fffc",
							marginRight: "2px",
						},
						tooltip: `${
							tooltipPrevious ? `EP. ${tooltipPrevious}` : "No previous episode"
						}`,
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
						subtitles && subtitles.find((sub) => selectedSub === sub.html?.url)
					}`,
					style: {
						"font-weight": "400",
						"font-size": "1.2rem",
						"background-color": "rgba(0, 0, 0, 0.65)",
						"border-radius": "0.25rem",
						height: "fit-content",
						width: "auto",
						"margin-right": "auto",
						"margin-left": "auto",
						"margin-top": "auto",
						"margin-bottom": "2rem",
						"white-space": "break-spaces",
						left: "50%",
						transform: "translateX(-50%)",
						padding: "0px",
					},
					escape: false,
				},
				highlight: highlightInfo,
			}}
			subtitles={subtitles}
			videoUrl={videoUrl}
			className="w-[80vw] max-lg:w-full h-[calc(var(--vh,1vh)*50)] lg:h-[calc(var(--vh,1vh)*100)]"
			intro={highlightInfo}
			selectedSub={selectedSub}
		/>
	)
}

export default memo(VideoPlayer)
