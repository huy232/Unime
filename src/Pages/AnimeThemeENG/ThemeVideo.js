import { useEffect, useRef, useState } from "react"
import { Play, Pause } from "lucide-react"

const autoplayUnlockedRef = { current: false }

function ThemeVideo({ src, isActive }) {
	const videoRef = useRef(null)
	const [playing, setPlaying] = useState(false)
	const [showControls, setShowControls] = useState(false)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		if (isActive) {
			if (autoplayUnlockedRef.current) {
				video
					.play()
					.then(() => setPlaying(true))
					.catch(console.error)
			}
		} else {
			video.pause()
			setPlaying(false)
		}
	}, [isActive])

	const handleTogglePlay = () => {
		const video = videoRef.current
		if (!video) return

		if (playing) {
			video.pause()
			setPlaying(false)
		} else {
			video
				.play()
				.then(() => {
					autoplayUnlockedRef.current = true
					setPlaying(true)
				})
				.catch(console.error)
		}
	}

	return (
		<div
			className="relative rounded-lg overflow-hidden group"
			onMouseEnter={() => setShowControls(true)}
			onMouseLeave={() => setShowControls(false)}
		>
			<video
				ref={videoRef}
				src={src}
				loop
				playsInline
				className="w-full h-full object-fill"
			/>
			{showControls && (
				<button
					onClick={handleTogglePlay}
					className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-3xl"
				>
					{playing ? (
						<Pause size={48} className="drop-shadow" />
					) : (
						<Play size={48} className="drop-shadow" />
					)}
				</button>
			)}
		</div>
	)
}

export default ThemeVideo
