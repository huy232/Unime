import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { COLORLIST } from "../../../constants"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/lazy"
import { Link } from "react-router-dom"
import { Lazy } from "swiper"

function TrendingAnimeENGComp({ trendingAnime }) {
	return (
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
								<div className="popular-anime-image aspect-[0.7] group-hover:opacity-80 duration-200 ease-in-out relative">
									<img
										className="object-fill object-center w-full h-full group-hover:scale-90 duration-500 linear absolute"
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
											color:
												anime?.color ||
												COLORLIST[Math.floor(Math.random() * COLORLIST.length)],
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
	)
}

export default TrendingAnimeENGComp
