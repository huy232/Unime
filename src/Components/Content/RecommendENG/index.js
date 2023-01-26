import React from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import "swiper/css"
import "swiper/css/pagination"
import "./recommend.css"

function RecommendENG({ recommend }) {
	return (
		<>
			<h2 className="font-black text-right max-lg:text-center">
				RECOMMENDATIONS
			</h2>
			<div>
				<Swiper
					slidesPerView="auto"
					spaceBetween={10}
					className="recommend-anime-swiper w-100"
					pagination={{
						type: "progressbar",
					}}
				>
					{recommend.map((anime) => (
						<SwiperSlide key={anime.id}>
							<Link
								to={`/eng/info/${anime.id}`}
								title={
									anime.title.english ||
									anime.title.romaji ||
									anime.title.native ||
									anime.title.userPreferred
								}
							>
								<div className="group recommend-anime-holder select-none cursor-pointer">
									<div className="recommend-anime-image w-[240px] h-[340px] group-hover:opacity-80 duration-200 ease-in-out relative">
										<img
											className="object-cover object-center w-100 h-100 group-hover:scale-90 duration-500 linear absolute"
											src={anime.image}
											alt=""
										/>
										<div className="text-white absolute right-0 bg-[#282828cc] p-[6px]">
											{anime.rating}%{" "}
											<FontAwesomeIcon
												icon={faHeart}
												className="text-red-500"
											/>
										</div>
									</div>
									<div className="recommend-anime-title">
										<p className="text-amber-300 line-clamp-2 font-medium">
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
			</div>
		</>
	)
}

export default RecommendENG
