import { useEffect, useRef, useState } from "react"
import { Skeleton } from "../../Components/Content/Skeleton"
import clsx from "clsx"

export default function ThemeVideo({
	src,
	isActive,
	volume = 0.25,
	muted = false,
	setVolume,
	setMuted,
}) {
	const videoRef = useRef(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		video.volume = volume
		video.muted = muted

		if (isActive) {
			video.play().catch(() => {})
		} else {
			video.pause()
			video.removeAttribute("src")
			video.load()
		}
	}, [isActive, volume, muted])

	const handleLoaded = () => {
		setIsLoaded(true)
	}

	// 🟢 Sync user mute/volume changes to parent state
	const handleVolumeChange = () => {
		const video = videoRef.current
		if (!video) return
		setVolume(video.volume)
		setMuted(video.muted)
	}

	if (!isActive) {
		return (
			<div className="relative md:aspect-[3/1] lg:aspect-[3/1] md:w-full lg:w-full rounded-lg overflow-hidden group">
				<Skeleton
					className={clsx(
						`absolute inset-0 z-10 transition-opacity duration-300`,
						isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
					)}
				/>
			</div>
		)
	}

	return (
		<div className="relative w-full md:aspect-[3/1] lg:aspect-[3/1] rounded-lg overflow-hidden group">
			{!isLoaded && (
				<Skeleton
					className={clsx(
						`absolute inset-0 z-10 transition-opacity duration-300`,
						isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
					)}
				/>
			)}

			<video
				ref={videoRef}
				src={src}
				className="w-full h-full object-fill sm:object-cover"
				controls
				loop
				playsInline
				muted={false}
				autoPlay={false}
				preload="auto"
				onLoadedData={handleLoaded}
				onVolumeChange={handleVolumeChange}
			/>
		</div>
	)
}
