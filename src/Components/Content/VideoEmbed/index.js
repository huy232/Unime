import React from "react"

function VideoEmbed({ videoEmbed }) {
	return (
		<iframe
			src={videoEmbed}
			allow="autoplay; fullscreen"
			width="100%"
			height="100%"
			title="videoFrame"
			frame-src="self"
			frame-ancestors="self"
		/>
	)
}

export default VideoEmbed
