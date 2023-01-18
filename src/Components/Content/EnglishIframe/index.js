import React from "react"
import "./englishiframe.css"

function EnglishIframe(iFrameSource) {
	return (
		<iframe
			src={iFrameSource.iFrameSource}
			allow="autoplay; fullscreen"
			frameBorder="0"
			allowFullScreen={true}
			webkitallowfullscreen="true"
			mozallowfullscreen="true"
			title="videoFrame"
			frame-src="self"
			frame-ancestors="self"
			className="english-iframe"
			scrolling="no"
			style={{ maxWidth: "100%", maxHeight: "100%" }}
		/>
	)
}

export default EnglishIframe
