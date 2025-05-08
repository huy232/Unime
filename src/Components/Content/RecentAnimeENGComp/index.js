import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import { Lazy } from "swiper"
import { Link } from "react-router-dom"
import Image from "../Image"
import StatusBadge from "../StatusBadge"
import clsx from "clsx"

function RecentAnimeENGComp({ recentAnime }) {
	return (
		<div className="recent-anime-container px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
			<Swiper
				modules={[Lazy]}
				lazy={true}
				preloadImages={false}
				slidesPerView="auto"
				spaceBetween={10}
				className="recent-anime-swiper w-full"
				pagination={{
					type: "progressbar",
				}}
			>
				{recentAnime.map((anime, i) => {
					const title =
						anime.title.english ||
						anime.title.romaji ||
						anime.title.userPreferred ||
						anime.title.native
					const color = anime.color || "#fffc"
					const image = anime.image || anime.coverImage || ""
					const episodeNumber =
						anime.episodeNumber ||
						anime.currentEpisode ||
						anime.currentEpisodeCount
					const status = anime.status || "Unknown"
					const type = anime.type || "Unknown"
					const rating = anime.rating || "?"

					return (
						<SwiperSlide key={i}>
							<Link
								to={`/eng/info/${anime.id}`}
								title={title}
								key={anime.id}
								aria-label={title}
							>
								<div className="group recent-anime-holder select-none cursor-pointer">
									<div className="recent-anime-image aspect-[2/3] group-hover:opacity-80 duration-200 ease-in-out relative">
										<Image
											className="object-fill object-center w-full h-full group-hover:scale-90 linear absolute duration-500 ease-in-out"
											src={image}
											alt={title}
											loading="lazy"
										/>
										{episodeNumber && (
											<StatusBadge
												position="top-0 left-0"
												className={`rounded bg-black font-semibold`}
											>
												<span className="text-[0.6rem]">
													EP. {episodeNumber}
												</span>
											</StatusBadge>
										)}

										{rating && (
											<StatusBadge
												position="top-0 right-0"
												className="rounded bg-black font-semibold"
											>
												<span className="text-[0.6rem]">{rating}</span>
												/💯
											</StatusBadge>
										)}
										{type && (
											<StatusBadge
												position="bottom-0 right-0"
												className="rounded bg-black font-bold"
											>
												{type}
											</StatusBadge>
										)}
										{status && (
											<StatusBadge
												position="bottom-0 left-0"
												status={status}
												className={clsx("rounded bg-black font-semibold")}
											>
												{status}
											</StatusBadge>
										)}
									</div>
									<div className="recent-anime-title">
										<p
											className="line-clamp-2 font-semibold"
											style={{ color: `${color || "#fffc"}` }}
										>
											{title}
										</p>
									</div>
								</div>
							</Link>
						</SwiperSlide>
					)
				})}
			</Swiper>
			<div className="text-right mt-[24px]">
				<Link
					to="/eng/recent-anime"
					className="browse-button hover:text-[#fffc] font-semibold"
					style={{ "--c": "#301E67" }}
				>
					MORE...
				</Link>
			</div>
		</div>
	)
}

export default RecentAnimeENGComp
