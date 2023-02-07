import { useEffect, useRef } from "react"
import Artplayer from "artplayer"
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality"
import artplayerPluginControl from "artplayer-plugin-control"
import Hls from "hls.js"
import { isMobile } from "../../../Utilities/isMobile"

export default function Player({
	option,
	getInstance,
	subtitles,
	videoUrl,
	intro,
	...rest
}) {
	const artRef = useRef()

	useEffect(() => {
		if (videoUrl[0].url.includes(".mp4")) {
			const art = new Artplayer({
				...option,
				url: videoUrl[0].url,
				container: artRef.current,
				plugins: [artplayerPluginControl()],
				settings: [
					{
						html: "Quality",
						tooltip: videoUrl[0].html,
						selector: videoUrl,
						onSelect: function (item) {
							art.switchQuality(item.url, item.html)
							return item.html
						},
					},
				],
			})
			return () => {
				if (art && art.destroy) {
					art.destroy(false)
				}
			}
		} else {
			function playM3u8(video, url, art) {
				if (Hls.isSupported()) {
					const hls = new Hls()
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
			}

			let videoSource = videoUrl.find(
				(source) =>
					localStorage.getItem("artplayer_quality") === source.html ||
					source.html === "SV1: AUTO" ||
					source.html === "SV1: DEFAULT" ||
					source.html === "SV1: BACKUP" ||
					source.html === "SV2: AUTO" ||
					source.html === "SV2: DEFAULT" ||
					source.html === "SV2: BACKUP"
			)?.url

			const art = new Artplayer({
				...option,
				url: videoSource || videoUrl[0].url,
				// quality: videoUrl || [],
				plugins: [
					// artplayerPluginHlsQuality({
					// 	// Show quality in control
					// 	control: videoSource ? true : false,
					// 	// Show quality in setting
					// 	setting: videoSource ? true : false,
					// 	title: "Quality",
					// 	auto: "Auto",
					// }),
					artplayerPluginControl(),
				],
				type: "m3u8",
				customType: {
					m3u8: playM3u8,
				},
				settings: [
					subtitles && {
						html: "Subtitle",
						tooltip:
							subtitles.find(
								(sub) =>
									sub.html.split(" ")[1] ===
									localStorage.getItem("artplayer-language")
							)?.html || "",
						icon: `<svg width="24" height="24" style="fill: #fffc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z"/></svg>`,
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
							localStorage.setItem(
								"artplayer-language",
								item.html.split(" ")[1]
							)
							art.subtitle.switch(item.url, {
								name: item.html,
							})
							return item.html
						},
					},

					{
						html: "Quality",
						tooltip:
							videoUrl.find((source) => source.default === true)?.html || "",
						selector: videoUrl,
						onSelect: function (item) {
							localStorage.setItem("artplayer_quality", item.html)
							art.switchQuality(item.url, item.html)
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

	return (
		<div
			className="h-[calc(var(--vh,1vh)*100)] w-full"
			ref={artRef}
			{...rest}
		></div>
	)
}
