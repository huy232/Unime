import { useEffect, useRef, useState } from "react"
import { Skeleton } from "../../Components/Content/Skeleton"
import clsx from "clsx"

export default function ThemeVideo({ src, isActive }) {
	const videoRef = useRef(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		if (isActive) {
			video.play().catch(() => {})
		} else {
			video.pause()
			video.removeAttribute("src")
			video.load()
		}
	}, [isActive])

	const handleLoaded = () => {
		setIsLoaded(true)
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
			/>
		</div>
	)
}
