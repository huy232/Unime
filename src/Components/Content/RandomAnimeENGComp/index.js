import React, { useState, useEffect, useCallback, useRef } from "react"
import YouTube from "react-youtube"
import { Link } from "react-router-dom"
import Image from "../Image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons"
import { MdOutlinePermDeviceInformation } from "react-icons/md"
import "./movieanime.css"

function RandomAnimeENGComp({ randomAnime }) {
	const [autoplaySupported, setAutoplaySupported] = useState(false)
	const [isVideoAvailable, setIsVideoAvailable] = useState(true)
	const [isPlayerReady, setIsPlayerReady] = useState(false)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const videoRef = useRef()
	const playerRef = useRef(null)
	const [shouldPlay, setShouldPlay] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setShouldPlay(entry.isIntersecting)

					const player = playerRef.current

					if (
						player &&
						isPlayerReady &&
						typeof player.getIframe === "function" &&
						player.getIframe() !== null &&
						typeof player.playVideo === "function" &&
						typeof player.pauseVideo === "function"
					) {
						if (entry.isIntersecting) {
							player.playVideo()
						} else {
							player.pauseVideo()
						}
					}
				})
			},
			{ threshold: 0.5 }
		)

		if (videoRef.current) {
			observer.observe(videoRef.current)
		}

		return () => {
			if (videoRef.current) {
				observer.unobserve(videoRef.current)
			}
		}
	}, [isPlayerReady])

	useEffect(() => {
		const testVideo = document.createElement("video")
		const canAutoplay = testVideo.autoplay !== undefined
		setAutoplaySupported(canAutoplay)

		if (randomAnime?.trailer?.site === "youtube") {
			if (!randomAnime?.trailer?.id) {
				setIsVideoAvailable(false)
				return
			}
		}
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [randomAnime?.trailer?.id, randomAnime?.trailer?.site])

	const renderMedia = useCallback(() => {
		const isMobile = windowWidth < 1024
		if (
			autoplaySupported &&
			isVideoAvailable &&
			randomAnime?.trailer?.site === "youtube" &&
			!isMobile
		) {
			const onEnd = (event) => {
				event.target.playVideo()
			}
			return (
				<YouTube
					loading="eager"
					className="youtube-container pointer-events-none cursor-none"
					videoId={randomAnime?.trailer?.id}
					opts={{
						playerVars: {
							autoplay: 1,
							mute: 1,
							controls: 0,
							showinfo: 0,
							disablekb: 1,
							modestbranding: 1,
							playsinline: 1,
							color: "white",
							start: 0,
						},
					}}
					muted={true}
					onError={() => setIsVideoAvailable(false)}
					onEnd={onEnd}
					onReady={(event) => {
						playerRef.current = event.target
						setIsPlayerReady(true)
						if (!shouldPlay) {
							event.target.pauseVideo()
						}
					}}
				/>
			)
		} else {
			return (
				<Image
					src={randomAnime.bannerImage}
					className="absolute top-0 left-0 w-full h-full object-cover duration-500 ease-in-out pointer-events-none cursor-none"
				/>
			)
		}
	}, [
		autoplaySupported,
		isVideoAvailable,
		randomAnime.bannerImage,
		randomAnime?.trailer?.id,
		randomAnime?.trailer?.site,
		shouldPlay,
		windowWidth,
	])

	const description = randomAnime.description?.replace(/<[br]+>/g, " ")
	const animeTitle =
		randomAnime.title.english ||
		randomAnime.title.romaji ||
		randomAnime.title.userPreferred ||
		randomAnime.title.native

	return (
		<div className="w-full">
			<h1 className="font-black mt-2 mb-0 max-sm:text-center font-bebas-neue whitespace-nowrap overflow-hidden flex justify-center gap-4">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
					<span
						key={index}
						className={`transform ${
							index % 2 !== 0
								? "scale-x-[-1] text-[#4A3EF4]"
								: "scale-x-[1] text-rose-500"
						}`}
						style={{ display: "inline-block", whiteSpace: "nowrap" }}
					>
						YOU MIGHT LIKE?
					</span>
				))}
			</h1>
			<div
				className="h-[50svh] sm:h-[77svh] lg:h-[85svh] z-0 relative aspect-[3/1] w-full"
				ref={videoRef}
			>
				{renderMedia()}

				<div className="layer-hero"></div>
				<div className="w-100svw lg:w-[45%] tracking-wide z-10 absolute flex flex-col gap-3 md:gap-6 bottom-[25%] mx-2 lg:mx-0 lg:left-[8%]">
					<div className="flex flex-col gap-2 md:gap-3 ">
						<Link
							to={`/eng/info/${randomAnime.id}`}
							className="text-xl sm:text-2xl md:text-3xl lg:text-4xl line-clamp-2 font-bebas-neue duration-300 ease-in-out  hover:brightness-150 border-b-[1px] border-transparent hover:border-inherit w-fit"
							style={{ color: `${randomAnime.coverImage.color}` || "#ffc" }}
						>
							{animeTitle}
						</Link>
						<span className="text-xs md:text-sm bg-black/30 rounded-lg flex text-white/90 items-center gap-3 md:gap-4 w-fit p-1">
							<span className="break-keep w-fit">
								{randomAnime.averageScore}% ❤
							</span>
							<span className="w-fit">{randomAnime.format}</span>
							<span className="w-fit">{randomAnime.countryOfOrigin}</span>
							<span className="flex justify-center items-center gap-1 w-fit">
								<span>
									<FontAwesomeIcon icon={faClosedCaptioning} />
								</span>
								{randomAnime.episodes}
							</span>
							<span className="w-fit hidden md:block">
								{randomAnime.status}
							</span>
						</span>
						<span className="hidden text-xs md:text-sm text-white/90 md:text-white md:flex items-center gap-3 md:gap-4">
							{randomAnime.genres.map((genre) => (
								<Link
									to={`/eng/anime/${encodeURIComponent(genre)}`}
									className="text-inherit opacity-70 hover:opacity-100 hover:brightness-125 duration-300 ease-in-out"
									key={genre}
								>
									{genre}
								</Link>
							))}
						</span>
						<div className="line-clamp-3 backdrop-blur-sm [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.6)] rounded-lg w-fit p-1">
							<span
								className="text-xs"
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							/>
						</div>

						<Link
							to={`/eng/info/${randomAnime.id}`}
							className="hidden sm:flex items-center gap-1 w-fit bg-[#FF004D] py-2 px-6 rounded-lg text-white hover:opacity-80 duration-300 ease-in-out"
						>
							<span>
								<MdOutlinePermDeviceInformation />
							</span>
							<span>View details</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RandomAnimeENGComp
