import React, { useRef } from "react"
// import VideoPlayer from "../VideoJsHook/index"
// import NetPlayer from "netplayer"

function VideoPlayer({ videoUrl, anime, info, index, subtitles, thumbnail }) {
	const videoRef = useRef()
	return (
		<>
			{/* <NetPlayer
				ref={videoRef}
				sources={videoUrl}
				subtitles={subtitles}
				autoPlay
				thumbnail={thumbnail}
			/> */}
		</>
	)
}

export default VideoPlayer
