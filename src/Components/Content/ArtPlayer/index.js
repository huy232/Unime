import { useEffect, useRef, memo } from "react"
import Artplayer from "artplayer"
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality"
import artplayerPluginControl from "artplayer-plugin-control"
import Hls from "hls.js"

function ArtPlayer({
	option,
	getInstance,
	subtitles,
	videoUrl,
	intro,
	selectedSub,
	...rest
}) {
	const artRef = useRef()

	useEffect(() => {
		console.log("This line here")
		console.log(videoUrl)
		if (
			videoUrl[0].url.includes(".mp4") ||
			videoUrl[0].type === "mp4" ||
			videoUrl[0].isM3U8 === false
		) {
			const art = new Artplayer({
				...option,
				url: videoUrl[0].url,
				container: artRef.current,
				plugins: [artplayerPluginControl()],
				settings: [
					{
						html: "Subtitle",
						tooltip:
							subtitles.find((sub) => sub.html === selectedSub)?.html || "",
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
							localStorage.setItem("artplayer-language", item.html)
							art.subtitle.switch(item.url, {
								name: item.html,
							})
							return item.html
						},
					},
					{
						html: "Quality",
						icon: `<svg width="24" height="24" style="fill: #fffc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"/></svg>`,
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
					hls.once(Hls.Events.MANIFEST_PARSED, function (event, data) {
						hls.startLevel = -1
					})
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
					source.html === "AUTO" ||
					source.html === "DEFAULT" ||
					source.html === "BACKUP"
			)?.url

			const art = new Artplayer({
				...option,
				url: videoSource || videoUrl[0].url,
				plugins: [
					artplayerPluginHlsQuality({
						setting: true,
						title: "Quality",
						auto: "Auto",
					}),
					artplayerPluginControl(),
				],
				type: "m3u8",
				customType: {
					m3u8: playM3u8,
				},
				settings: [
					{
						html: "Subtitle",
						tooltip:
							subtitles.find((sub) => sub.html.split(". ")[1] === selectedSub)
								?.html || "",
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
								item.html.split(". ")[1]
							)
							art.subtitle.switch(item.url, {
								name: item.html,
							})
							return item.html
						},
					},
				],
				layers: [
					{
						name: "skip",
						html: '<button class="rounded-[30px] hover:opacity-80 hover:text-[#000] duration-500 ease-in-out bg-[#FF0000] p-[8px] font-black text-lg text-[#fffc] border-[2px] border-solid border-[#422800]" style="box-shadow: #422800 4px 4px 0 0; transform: translate(2px, 2px);" type="button">SKIP INTRO</button>',
						style: {
							display: "none",
							position: "absolute",
							right: "1rem",
							top: "1rem",
						},
						click() {
							this.currentTime = intro[1]?.time
						},
						mounted(button) {
							this.on("video:timeupdate", () => {
								if (
									this.currentTime >= intro[0]?.time &&
									this.currentTime <= intro[1]?.time
								) {
									button.style.display = "block"
								} else {
									button.style.display = "none"
								}
							})
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
	}, [option, selectedSub, subtitles, videoUrl, intro, getInstance])

	return (
		<div
			className="h-[calc(var(--vh,1vh)*100)] w-full"
			ref={artRef}
			{...rest}
		></div>
	)
}

export default memo(ArtPlayer)
