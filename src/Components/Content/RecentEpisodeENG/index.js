import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/lazy"
import "./recentepisode.css"
import AnimeSkeletonENG from "../AnimeSkeletonENG"
import { Lazy } from "swiper"
import { Link } from "react-router-dom"

function RecentEpisodeENG({ recentAnime, loadingRecentAnime }) {
	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-lime-300 max-sm:text-center">
				NEWLY UPDATED
			</h1>
			{loadingRecentAnime ? (
				<AnimeSkeletonENG />
			) : (
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
						{recentAnime.map((anime, i) => (
							<SwiperSlide key={i}>
								<Link
									to={`/eng/info/${anime.id}`}
									title={
										anime.title.english ||
										anime.title.romaji ||
										anime.title.native ||
										anime.userPreferred
									}
									key={anime.id}
									aria-label={
										anime.title.english ||
										anime.title.romaji ||
										anime.title.native ||
										anime.userPreferred
									}
								>
									<div className="group recent-anime-holder select-none cursor-pointer">
										<div className="recent-anime-image aspect-[0.7] group-hover:opacity-80 duration-200 ease-in-out relative">
											<img
												className="object-fill object-center w-full h-100 group-hover:scale-90 duration-500 linear absolute"
												src={anime.image}
												alt={
													anime.title.english ||
													anime.title.romaji ||
													anime.title.native ||
													anime.userPreferred
												}
												loading="lazy"
											/>
											<div className="absolute group-hover:scale-90 duration-500 linear text-right w-full h-full">
												<p className="inline-block mt-[4px] mr-[4px] p-[4px] bg-neutral-500/75 text-white rounded">
													EP. {anime.episodeNumber}
												</p>
											</div>
										</div>
										<div className="recent-anime-title">
											<p
												className="line-clamp-2 font-medium"
												style={{ color: `${anime?.color || "#fff"}` }}
											>
												{anime.title.english ||
													anime.title.romaji ||
													anime.title.native ||
													anime.userPreferred}
											</p>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="text-right mt-[24px]">
						<Link
							to="/eng/recent-anime"
							className="browse-button hover:text-[#fff] font-semibold"
							style={{ "--c": "#301E67" }}
						>
							MORE...
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}

export default RecentEpisodeENG
