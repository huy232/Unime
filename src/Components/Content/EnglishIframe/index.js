import React from "react"
import "./englishiframe.css"

function EnglishIframe(iFrameSource) {
	let videoSource = iFrameSource.iFrameSource.url
	return (
		<iframe
			src={videoSource}
			allow="autoplay; fullscreen"
			frameBorder="0"
			allowFullScreen={true}
			webkitallowfullscreen="true"
			mozallowfullscreen="true"
			title="videoFrame"
			frame-src="self"
			frame-ancestors="self"
			className="english-iframe w-[80svw] max-lg:w-full h-[50svh] lg:h-[100svh]"
			scrolling="no"
			style={{ maxWidth: "100%", maxHeight: "100%" }}
		/>
	)
}

export default EnglishIframe
