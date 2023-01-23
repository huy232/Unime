import React from "react"
import VideoPlayer from "../VideoJsHook/index"

function VideoPlayerSource({ videoUrl, anime, info, index, subtitles }) {
	return (
		<VideoPlayer
			src={videoUrl}
			controls={true}
			autoplay={true}
			anime={anime}
			info={info}
			index={index}
			subtitles={subtitles}
		/>
	)
}

export default VideoPlayerSource
