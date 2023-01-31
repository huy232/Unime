import { useEffect, useRef } from "react"
import Artplayer from "artplayer"
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality"
import Hls from "hls.js"

export default function Player({
	option,
	getInstance,
	subtitles,
	videoUrl,
	...rest
}) {
	const artRef = useRef()

	useEffect(() => {
		if (videoUrl[0].url.includes(".mp4")) {
			const art = new Artplayer({
				...option,
				container: artRef.current,
			})
			return () => {
				if (art && art.destroy) {
					art.destroy(false)
				}
			}
		} else {
			const art = new Artplayer({
				...option,
				plugins: [
					artplayerPluginHlsQuality({
						// Show quality in control
						control: false,
						// Show quality in setting
						setting: false,
						title: "Quality",
						auto: "Auto",
					}),
				],
				customType: {
					m3u8: function (video, url) {
						// Attach the Hls instance to the Artplayer instance
						if (Hls.isSupported()) {
							const hls = new Hls({
								xhrSetup: (xhr, url) => {},
							})
							hls.loadSource(url)
							hls.attachMedia(video)

							// optional
							art.hls = hls
							art.once("url", () => hls.destroy())
							art.once("destroy", () => hls.destroy())
						} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
							video.src = url
						} else {
							art.notice.show = "Unsupported playback format: m3u8"
						}
					},
				},
				settings: [
					subtitles && {
						html: "Subtitle",
						icon: '<img width="22" heigth="22" src="">',
						selector: [
							{
								html: "Display",
								tooltip: "Show",
								switch: true,
								onSwitch: function (item) {
									item.tooltip = item.switch ? "Hide" : "Show"
									art.subtitle.show = !item.switch
									return !item.switch
								},
							},
							...subtitles,
						],
						onSelect: function (item) {
							art.subtitle.switch(item.url, {
								name: item.html,
							})
							return item.html
						},
					},
				],
				container: artRef.current,
			})
			return () => {
				if (art && art.destroy) {
					art.destroy(false)
				}
			}
		}
	}, [option, subtitles, videoUrl])

	return <div className="h-[100vh] w-100" ref={artRef} {...rest}></div>
}
