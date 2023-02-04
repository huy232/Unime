import React from "react"
import Artplayer from "../ArtPlayer"
import "./videoplayer.css"

function VideoPlayer({ videoUrl, anime, info, index, subtitles, thumbnail }) {
	const selectedSub = localStorage.getItem("artplayer-language")
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
					loop: true,
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
				className="w-[80vw] max-lg:w-full h-[100vh]"
			/>
		</>
	)
}

export default VideoPlayer
