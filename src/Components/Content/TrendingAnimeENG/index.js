import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/lazy"
import "./popularanime.css"
import AnimeSkeletonENG from "../AnimeSkeletonENG"
import { Link } from "react-router-dom"
import { Lazy } from "swiper"
import { COLORLIST } from "../../../constants"

function TrendingAnimeENG({ trendingAnime, loadingTrending }) {
	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-right text-violet-500 max-sm:text-center">
				TRENDING
			</h1>
			{loadingTrending ? (
				<AnimeSkeletonENG />
			) : (
				<div className="popular-anime-container px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
					<Swiper
						slidesPerView="auto"
						spaceBetween={10}
						className="popular-anime-swiper w-full"
						pagination={{
							type: "progressbar",
						}}
						modules={[Lazy]}
						lazy={true}
						preloadImages={false}
					>
						{trendingAnime.map((anime, i) => (
							<SwiperSlide key={i}>
								<Link
									to={`/eng/info/${anime.id}`}
									title={
										anime.title.english ||
										anime.title.romaji ||
										anime.title.native ||
										anime.title.userPreferred
									}
									key={anime.id}
									aria-label={anime.id}
								>
									<div className="group popular-anime-holder select-none cursor-pointer">
										<div className="popular-anime-image w-[240px] h-[340px] group-hover:opacity-80 duration-200 ease-in-out relative">
											<img
												className="object-fill object-center w-full h-100 group-hover:scale-90 duration-500 linear absolute"
												src={anime.image}
												alt={
													anime.title.english ||
													anime.title.romaji ||
													anime.title.native ||
													anime.title.userPreferred
												}
												loading="lazy"
											/>
										</div>
										<div className="popular-anime-title">
											<p
												className="line-clamp-2 font-medium transition-all duration-500 ease-in-out"
												style={{
													color: COLORLIST[i],
												}}
											>
												{anime.title.english ||
													anime.title.romaji ||
													anime.title.native ||
													anime.title.userPreferred}
											</p>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="text-right mt-[24px]">
						<Link
							to="/eng/trending"
							className="browse-button hover:text-[#fff] font-semibold"
							style={{ "--c": "#F94A29" }}
							aria-label="MORE"
						>
							MORE...
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}

export default TrendingAnimeENG
