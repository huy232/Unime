import React from "react"
// import VideoPlayer from "../VideoJsHook/index"
import Artplayer from "../ArtPlayer"
import "./videoplayer.css"

function VideoPlayer({ videoUrl, anime, info, index, subtitles, thumbnail }) {
	return (
		<>
			<Artplayer
				option={{
					url: videoUrl[0].url,
					quality: videoUrl,
					setting: true,
					muted: false,
					autoplay: true,
					pip: true,
					autoSize: true,
					autoMini: true,
					screenshot: true,
					setting: true,
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
					airplay: true,
					lang: navigator.language.toLowerCase(),
					whitelist: ["*"],
					moreVideoAttr: {
						crossOrigin: "anonymous",
					},
					subtitle: {
						style: {
							"font-weight": "400",
							"font-size": "2rem",
							"background-color": "rgba(0, 0, 0, 0.75)",
							"border-radius": "0.125rem",
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
				className="w-100 h-[100vh]"
			/>
		</>
	)
}

export default VideoPlayer
