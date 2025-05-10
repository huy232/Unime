import getVttArray from "./getVttArray"

export default function artplayerPluginVttThumbnail(option) {
	return async function (art) {
		const {
			constructor: {
				utils: { setStyle, isMobile, addClass },
			},
			template: { $progress },
		} = art

		let timer = null
		const thumbnails = await getVttArray(option.vtt)

		function showThumbnail($el, data, width) {
			setStyle($el, "backgroundImage", `url(${data.url})`)
			setStyle($el, "height", `${data.h}px`)
			setStyle($el, "width", `${data.w}px`)
			setStyle($el, "backgroundPosition", `-${data.x}px -${data.y}px`)
			const progressWidth = $progress.clientWidth || 300
			const left = Math.min(
				Math.max(width - data.w / 2, 0),
				progressWidth - data.w
			)
			setStyle($el, "left", `${left}px`)
		}

		art.controls.add({
			name: "vtt-thumbnail",
			position: "top",
			index: 20,
			style: option.style || {},
			mounted($el) {
				addClass($el, "art-control-thumbnails")

				const onMove = (event) => {
					const rect = $progress.getBoundingClientRect()
					const x = event.clientX - rect.left
					const percent = x / rect.width
					const second = percent * art.duration

					const data = thumbnails.find(
						(t) => second >= t.start && second <= t.end
					)
					if (!data) {
						setStyle($el, "display", "none")
						return
					}

					setStyle($el, "display", "flex")
					showThumbnail($el, data, x)
				}

				const onLeave = () => {
					setStyle($el, "display", "none")
				}

				$progress.addEventListener("mousemove", onMove)
				$progress.addEventListener("mouseleave", onLeave)

				// Clean up on destroy
				art.once("destroy", () => {
					$progress.removeEventListener("mousemove", onMove)
					$progress.removeEventListener("mouseleave", onLeave)
				})
			},
		})

		return {
			name: "artplayerPluginVttThumbnail",
		}
	}
}
