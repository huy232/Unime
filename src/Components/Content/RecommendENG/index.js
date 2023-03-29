import React from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import "swiper/css"
import "swiper/css/pagination"

import "./recommend.css"
import { Lazy } from "swiper"
import { COLORLIST } from "../../../constants"

function RecommendENG({ recommend, setLoading }) {
	return (
		<>
			<h2 className="font-black text-right max-lg:text-center">
				RECOMMENDATIONS
			</h2>
			<div className="mb-[24px]">
				<Swiper
					modules={[Lazy]}
					slidesPerView="auto"
					spaceBetween={10}
					className="recommend-anime-swiper w-full"
					pagination={{
						type: "progressbar",
					}}
					lazy={true}
					preloadImages={false}
				>
					{recommend.map(
						(anime, i) =>
							anime.status !== "Unknown" && (
								<SwiperSlide key={i}>
									<Link
										to={`/eng/info/${anime.id}`}
										title={
											anime.title.english ||
											anime.title.romaji ||
											anime.title.native ||
											anime.title.userPreferred
										}
										onClick={() => setLoading(true)}
										aria-label={
											anime.title.english ||
											anime.title.romaji ||
											anime.title.native ||
											anime.userPreferred
										}
									>
										<div className="group recommend-anime-holder select-none cursor-pointer">
											<div className="recommend-anime-image aspect-[2/3] group-hover:opacity-80 duration-200 ease-in-out relative">
												<img
													className="object-fill object-center w-full h-full duration-500 linear absolute"
													src={anime.image}
													alt={
														anime.title.english ||
														anime.title.romaji ||
														anime.title.native ||
														anime.title.userPreferred
													}
													loading="lazy"
												/>
												<div className="text-white absolute right-0 bg-[#0d0d0d]/[0.8] p-[6px]">
													{anime.rating}%{" "}
													<FontAwesomeIcon
														icon={faHeart}
														className="text-red-500"
													/>
												</div>
												<div className="text-[#fffc] absolute bottom-0 text-sm w-full p-[4px] bg-[#0d0d0d]/[0.8]">
													<div className="flex">
														<p>{anime.episodes}. EP</p>
														<p className="ml-auto border-2 rounded px-[4px]">
															{anime.type}
														</p>
													</div>
												</div>
											</div>
											<div className="recommend-anime-title h-[60px]">
												<p
													className="line-clamp-2 font-extrabold"
													style={{ color: COLORLIST[i] || "#fffc" }}
												>
													{anime.title.english ||
														anime.title.romaji ||
														anime.title.native ||
														anime.title.userPreferred}
												</p>
											</div>
											<div className="text-[#fffc] text-sm inline-block p-[4px]">
												<p className="border-2 rounded px-[4px]">
													{anime.status}
												</p>
											</div>
										</div>
									</Link>
								</SwiperSlide>
							)
					)}
				</Swiper>
			</div>
		</>
	)
}

export default RecommendENG
