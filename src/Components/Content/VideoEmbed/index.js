import React from "react"

function VideoEmbed({ videoEmbed }) {
	return (
		<iframe
			src={videoEmbed}
			allow="autoplay; fullscreen"
			title="videoFrame"
			frame-src="self"
			frame-ancestors="self"
			style={{ height: "100vh", width: "80vw" }}
		/>
	)
}

export default VideoEmbed
