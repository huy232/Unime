import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import Image from "../Image"
import YouTube from "react-youtube"
import { useState, useCallback } from "react"
import clsx from "clsx"
import { MdOutlinePermDeviceInformation } from "react-icons/md"
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons"
import { MAINSITE } from "../../../constants"

function TopAiringENGComp({ topAiring }) {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0)
	const [players, setPlayers] = useState([])
	const [youtubeErrors, setYoutubeErrors] = useState([])

	const handleIndexChange = useCallback(
		(swiper) => {
			setActiveSlideIndex(swiper.realIndex)

			// Pause the previous video
			const prevPlayer = players[swiper.previousIndex - 1]
			if (prevPlayer) {
				prevPlayer.pauseVideo()
			}

			// Play the current video
			const currentPlayer = players[swiper.realIndex]
			if (currentPlayer) {
				currentPlayer.playVideo()
			}
		},
		[players]
	)

	// const onReady = useCallback(
	// 	(event, index) => {
	// 		const newPlayers = [...players]
	// 		newPlayers[index] = event.target
	// 		setPlayers(newPlayers)
	// 		if (index !== activeSlideIndex) {
	// 			event.target.pauseVideo()
	// 		}
	// 	},
	// 	[activeSlideIndex, players]
	// )

	const handleError = useCallback(
		(index) => {
			const newErrors = [...youtubeErrors]
			newErrors[index] = true
			setYoutubeErrors(newErrors)
		},
		[youtubeErrors]
	)

	const renderFallbackImage = useCallback(
		(index) => (
			<Image
				src={topAiring[index].bannerImage}
				className="h-full w-full object-cover"
			/>
		),
		[topAiring]
	)

	const youtubeClassName = useCallback(
		(index) =>
			clsx(`youtube-container rounded overflow-hidden`, {
				hidden: youtubeErrors[index],
			}),
		[youtubeErrors]
	)

	return (
		<Swiper
			pagination={{
				clickable: true,
			}}
			modules={[Pagination]}
			centeredSlides={true}
			spaceBetween={10}
			loop={true}
			className="top-airing-swiper w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36"
			slidesPerView={1}
			onSlideChange={(swiper) => handleIndexChange(swiper)}
		>
			{topAiring.map((item, i) => {
				const description = item.description?.replace(/<[br]+>/g, "")
				const animeTitle =
					item.title.english ||
					item.title.romaji ||
					item.title.userPreferred ||
					item.title.native
				return (
					<SwiperSlide key={i} className="rounded overflow-hidden">
						<div className="h-[44vh] sm:h-[77vh] lg:h-[85vh] z-0 relative aspect-3/1">
							<YouTube
								loading={"eager"}
								className={youtubeClassName(i)}
								videoId={item.trailer.id}
								opts={{
									playerVars: {
										autoplay: 1,
										mute: 1,
										muted: 1,
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
										enablejsapi: 1,
										origin: MAINSITE,
									},
								}}
								onError={() => handleError(i)}
								// onReady={(event) => onReady(event, i)}
							/>
							{youtubeErrors[i] && renderFallbackImage(i)}
							<div className="layer-hero"></div>
							<div className="w-[77%] lg:w-[45%] tracking-wide z-10 absolute flex flex-col gap-3 md:gap-6 bottom-[25%] left-[5%] lg:left-[8%]">
								<div className="flex flex-col gap-2 md:gap-3 ">
									<Link
										to={`/eng/info/${item.id}`}
										className="text-xl sm:text-2xl md:text-3xl lg:text-4xl line-clamp-2 font-bebas-neue duration-300 ease-in-out  hover:brightness-150 border-b-[1px] border-transparent hover:border-inherit w-fit"
										style={{ color: `${item.coverImage.color}` || "#ffc" }}
									>
										{animeTitle}
									</Link>
									<span className="text-xs md:text-sm text-white/90 md:text-white flex items-center gap-3 md:gap-4">
										<span>{item.averageScore}% ❤</span>
										<span>{item.format}</span>
										<span>{item.countryOfOrigin}</span>
										<span className="flex justify-center items-center gap-1">
											<span>
												<FontAwesomeIcon icon={faClosedCaptioning} />
											</span>
											{item.episodes}
										</span>
										<span className="border-[1px] border-white rounded-lg px-[6px] text-teal-500">
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
									<span className="line-clamp-3 text-xs">{description}</span>
									<Link
										to={`/eng/info/${item.id}`}
										className="flex items-center gap-1 w-fit bg-[#FF004D] py-2 px-6 rounded-lg text-white hover:opacity-80 duration-300 ease-in-out"
									>
										<span>
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
	)
}

export default TopAiringENGComp
