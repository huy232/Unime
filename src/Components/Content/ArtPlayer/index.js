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
	const artInstanceRef = useRef()

	useEffect(() => {
		if (!videoUrl?.length) return

		let art

		const baseSettings = {
			...option,
			container: artRef.current,
			plugins: [artplayerPluginControl()],
			settings: [
				{
					html: "Subtitle",
					tooltip:
						subtitles.find(
							(sub) =>
								sub.html === selectedSub ||
								sub.html.split(". ")[1] === selectedSub
						)?.html || "Off",
					icon: `<svg width="24" height="24" style="fill: #fffc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z"/></svg>`,
					selector: subtitles.map((sub) => ({
						default:
							sub.html === selectedSub ||
							sub.html.split(". ")[1] === selectedSub,
						html: sub.html,
						url: sub.url,
					})),
					onSelect: function (item) {
						this.tooltip = item.html
						art.subtitle.switch(item.url, { name: item.html })
						localStorage.setItem("artplayer-language", item.html.split(". ")[1])
					},
				},
				{
					html: "Font Size",
					icon: `<svg width="24" height="24" style="fill: #fffc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h176v368a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V96h176a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>`,

					tooltip:
						[
							{ value: "0.8rem", html: "Smallest" },
							{ value: "1.2rem", html: "Small" },
							{ value: "1.6rem", html: "Medium" },
							{ value: "2.0rem", html: "Large" },
							{ value: "2.4rem", html: "Larger" },
							{ value: "3rem", html: "Largest" },
						].find(
							(item) =>
								item.value ===
								localStorage.getItem("artplayer-subtitle-font-size")
						)?.html || "Medium",

					selector: [
						{ value: "0.8rem", html: "Smallest" },
						{ value: "1.2rem", html: "Small" },
						{ value: "1.6rem", html: "Medium" },
						{ value: "2.0rem", html: "Large" },
						{ value: "2.4rem", html: "Larger" },
						{ value: "3rem", html: "Largest" },
					].map((item) => ({
						...item,
						default:
							item.value ===
							localStorage.getItem("artplayer-subtitle-font-size"),
					})),

					onSelect: function (item) {
						this.tooltip = item.html
						const subtitleEl = art.template?.$subtitle
						if (subtitleEl) subtitleEl.style.fontSize = item.value
						localStorage.setItem("artplayer-subtitle-font-size", item.value)
						return item.html
					},
				},
			],
		}

		const isMp4 =
			videoUrl[0].url.includes(".mp4") ||
			videoUrl[0].type === "mp4" ||
			videoUrl[0].isM3U8 === false

		if (isMp4) {
			art = new Artplayer({
				...baseSettings,
				url: videoUrl[0].url,
				settings: [
					...baseSettings.settings,
					{
						html: "Quality",
						tooltip: videoUrl[0].html,
						icon: `<svg width="24" height="24" style="fill: #fffc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="..."/></svg>`,
						selector: videoUrl,
						onSelect(item) {
							art.switchQuality(item.url, item.html)
							return item.html
						},
					},
				],
			})
		} else {
			function playM3u8(video, url, art) {
				if (Hls.isSupported()) {
					const hls = new Hls()
					hls.loadSource(url)
					hls.attachMedia(video)
					hls.once(Hls.Events.MANIFEST_PARSED, () => {
						hls.startLevel = -1
					})
					art.hls = hls
					art.once("url", () => hls.destroy())
					art.once("destroy", () => hls.destroy())
				} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
					video.src = url
				} else {
					art.notice.show = "Unsupported playback format: m3u8"
				}
			}

			let fallback = videoUrl.find((v) =>
				["AUTO", "DEFAULT", "BACKUP"].includes(v.html)
			)?.url

			art = new Artplayer({
				...baseSettings,
				url: fallback || videoUrl[0].url,
				type: "m3u8",
				plugins: [
					...baseSettings.plugins,
					artplayerPluginHlsQuality({
						setting: true,
						title: "Quality",
						auto: "Auto",
					}),
				],
				customType: {
					m3u8: playM3u8,
				},
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
							this.currentTime = intro?.[1]?.time
						},
						mounted(button) {
							this.on("video:timeupdate", () => {
								if (
									this.currentTime >= intro?.[0]?.time &&
									this.currentTime <= intro?.[1]?.time
								) {
									button.style.display = "block"
								} else {
									button.style.display = "none"
								}
							})
						},
					},
				],
			})
		}

		if (getInstance) getInstance(art)
		artInstanceRef.current = art

		return () => {
			if (art && art.destroy) {
				art.destroy(false)
			}
		}
	}, [option, selectedSub, subtitles, videoUrl, intro, getInstance])

	return (
		<div
			ref={artRef}
			className="h-[calc(var(--vh,1vh)*100)] w-full"
			{...rest}
		/>
	)
}

export default memo(ArtPlayer)
