import React, { useState, useEffect } from "react"
import YouTube from "react-youtube"
import { Link } from "react-router-dom"
import Image from "../Image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons"
import { MdOutlinePermDeviceInformation } from "react-icons/md"
import axios from "axios"
import "./movieanime.css"
import { MAINSITE } from "../../../constants"

function RandomAnimeENGComp({ randomAnime }) {
	const [isVideoAvailable, setIsVideoAvailable] = useState(true)

	useEffect(() => {
		const checkVideoAvailability = async () => {
			if (randomAnime?.trailer?.site === "youtube") {
				try {
					const response = await axios.get(
						`https://www.googleapis.com/youtube/v3/videos?id=${randomAnime.trailer.id}&part=status&key=${process.env.REACT_APP_YOUTUBE_API}`
					)

					const videoStatus = response?.data?.items[0]?.status
					if (!videoStatus?.publicStatsViewable) {
						setIsVideoAvailable(false)
					}
				} catch (error) {
					setIsVideoAvailable(false) // Set to false on error
				}
			}
		}

		checkVideoAvailability()
	}, [randomAnime?.trailer?.id, randomAnime?.trailer?.site])

	const description = randomAnime.description?.replace(/<[br]+>/g, " ")
	const animeTitle =
		randomAnime.title.english ||
		randomAnime.title.romaji ||
		randomAnime.title.userPreferred ||
		randomAnime.title.native

	return (
		<div className="w-full">
			<h1 className="font-black ml-6 mr-6 mt-2 mb-0 max-sm:text-center font-bebas-neue whitespace-nowrap overflow-hidden gap flex gap-4">
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
			<div className="h-[44vh] sm:h-[77vh] lg:h-[85vh] z-0 relative aspect-3/1">
				{isVideoAvailable && randomAnime?.trailer?.site === "youtube" ? (
					<YouTube
						className="youtube-container"
						videoId={randomAnime.trailer.id}
						opts={{
							playerVars: {
								autoplay: 1,
								controls: 0,
								disablekb: 1,
								loop: 1,
								modestbranding: 1,
								playsinline: 1,
								color: "white",
								mute: 1,
								playlist: randomAnime.trailer.id,
								showinfo: 0,
								start: 0,
								cc_load_policy: 0,
								iv_load_policy: 3,
								rel: 0,
								fs: 0,
							},
						}}
						onError={(event) => {
							setIsVideoAvailable(false)
						}}
					/>
				) : (
					<Image
						src={randomAnime.bannerImage}
						className="absolute top-0 left-0 w-full h-full object-cover duration-500 ease-in-out"
					/>
				)}

				<div className="layer-hero"></div>
				<div className="w-[80%] lg:w-[45%] tracking-wide z-10 absolute flex flex-col gap-3 md:gap-6 bottom-[25%] left-[5%] lg:left-[8%]">
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
							<span className="w-fit">{randomAnime.status}</span>
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
						<span
							className="line-clamp-3 text-xs"
							dangerouslySetInnerHTML={{
								__html: description,
							}}
						></span>
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
