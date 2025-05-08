import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import Image from "../Image"
import YouTube from "react-youtube"
import { useState, useCallback, useEffect, useRef } from "react"
import { MdOutlinePermDeviceInformation } from "react-icons/md"
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons"

function TopAiringENGComp({ topAiring }) {
	const [autoplaySupported, setAutoplaySupported] = useState(false)
	const [youtubeErrors, setYoutubeErrors] = useState([])
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	const swiperRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		const testVideo = document.createElement("video")
		const canAutoplay = testVideo.autoplay !== undefined
		setAutoplaySupported(canAutoplay)

		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const handleError = useCallback(
		(index) => {
			const newErrors = [...youtubeErrors]
			newErrors[index] = true
			setYoutubeErrors(newErrors)
		},
		[youtubeErrors]
	)

	const renderMedia = useCallback(
		(index) => {
			const item = topAiring[index]

			const onEnd = (event) => {
				event.target.playVideo()
			}
			const isMobile = windowWidth < 1024

			if (
				autoplaySupported &&
				!youtubeErrors[index] &&
				!isMobile &&
				index === activeIndex
			) {
				return (
					<YouTube
						loading="eager"
						className={`youtube-container rounded overflow-hidden pointer-events-none cursor-none`}
						videoId={item.trailer.id}
						opts={{
							playerVars: {
								autoplay: 1,
								mute: 1,
								controls: 0,
								showinfo: 0,
								disablekb: 1,
								loop: 1,
								modestbranding: 1,
								playsinline: 1,
								color: "white",
								start: 0,
								cc_load_policy: 0,
								iv_load_policy: 3,
								rel: 0,
								fs: 0,
							},
						}}
						muted={true}
						onError={() => handleError(index)}
						onEnd={onEnd}
					/>
				)
			} else {
				return (
					<Image
						loading="eager"
						src={item.bannerImage}
						className="h-full w-full object-cover duration-300 ease-in-out pointer-events-none cursor-none"
					/>
				)
			}
		},
		[
			topAiring,
			windowWidth,
			autoplaySupported,
			youtubeErrors,
			activeIndex,
			handleError,
		]
	)

	return (
		<div ref={swiperRef}>
			<Swiper
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
				centeredSlides={true}
				spaceBetween={10}
				className="top-airing-swiper w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36"
				slidesPerView={1}
				loop={true}
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
			>
				{topAiring.map((item, i) => {
					const description = item.description?.replace(/<[br]+>/g, " ")
					const animeTitle =
						item.title.english ||
						item.title.romaji ||
						item.title.userPreferred ||
						item.title.native
					return (
						<SwiperSlide key={i} className="rounded overflow-hidden">
							<div className="h-[50svh] sm:h-[77svh] lg:h-[85svh] z-0 relative aspect-[3/1] w-full">
								{renderMedia(i)}
								<div className="layer-hero"></div>
								<div className="w-100svw lg:w-[45%] tracking-wide z-10 absolute flex flex-col gap-3 md:gap-6 bottom-[25%] mx-2 lg:mx-0 lg:left-[8%]">
									<div className="flex flex-col gap-2 md:gap-3 ">
										<Link
											to={`/eng/info/${item.id}`}
											className="text-xl sm:text-2xl md:text-3xl lg:text-4xl line-clamp-2 font-bebas-neue duration-300 ease-in-out  hover:brightness-150 border-b-[1px] border-transparent hover:border-inherit w-fit"
											style={{ color: `${item.coverImage.color}` || "#ffc" }}
										>
											{animeTitle}
										</Link>
										<span className="text-xs md:text-sm bg-black/30 rounded-lg flex text-white/90 items-center gap-3 md:gap-4 w-fit p-1">
											<span className="break-keep w-fit">
												{item.averageScore}% ❤
											</span>
											<span className="w-fit">{item.format}</span>
											<span className="w-fit">{item.countryOfOrigin}</span>
											<span className="flex justify-center items-center gap-1 w-fit">
												<span>
													<FontAwesomeIcon icon={faClosedCaptioning} />
												</span>
												{item.episodes}
											</span>
											<span className="hidden md:block text-teal-500 w-fit">
												{item.status}
											</span>
										</span>
										<span className="hidden text-xs md:text-sm text-white/90 md:text-white md:flex items-center gap-3 md:gap-4">
											{item.genres.map((genre) => (
												<Link
													to={`/eng/anime/${encodeURIComponent(genre)}`}
													className="text-inherit opacity-70 hover:opacity-100 hover:brightness-125 duration-300 ease-in-out"
													key={genre}
												>
													{genre}
												</Link>
											))}
										</span>
										<div className="w-full">
											<span
												className="line-clamp-3 text-xs backdrop-blur-sm [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.6)] rounded-lg w-fit p-1"
												dangerouslySetInnerHTML={{
													__html: description,
												}}
											></span>
										</div>
										<Link
											to={`/eng/info/${item.id}`}
											className="hidden sm:flex group items-center gap-1 w-fit bg-[#FF004D] py-2 px-6 rounded-lg text-white hover:opacity-80 duration-300 ease-in-out mt-1"
										>
											<span className="group-hover:animate-bounce">
												<MdOutlinePermDeviceInformation />
											</span>
											<span>View details</span>
										</Link>
									</div>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}

export default TopAiringENGComp
