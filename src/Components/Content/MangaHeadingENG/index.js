import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import { Lazy } from "swiper"
import { Link } from "react-router-dom"
import "./topmanga.css"
function MangaHeadingENG({ content, loading }) {
	console.log(content)
	return (
		<div className="ml-6 mr-6">
			{!loading && (
				<>
					<h1 className="font-black text-[#ffd95d]">TOP MANGA</h1>
					<Swiper
						pagination={false}
						modules={[Lazy]}
						centeredSlides={false}
						spaceBetween={10}
						loop={false}
						className="top-manga w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36"
						slidesPerView={"auto"}
						preloadImages={false}
						lazy={true}
					>
						{content.map((item, i) => (
							<SwiperSlide key={i}>
								<div
									style={{ backgroundImage: `url(${item.cover})` }}
									loading="lazy"
								>
									<Link
										to={`/eng/manga-info/${item.id}`}
										className="hover:opacity-80 duration-200 ease-in-out"
										style={{
											color: item.coverImage?.color || "#fffc",
											textShadow: `3px 3px 3px rgba(0,0,0,0.7)`,
										}}
										aria-label={item.id}
									>
										<div className="relative">
											<img
												src={
													item.coverImage?.extraLarge ||
													item.coverImage?.large ||
													item.coverImage?.medium
												}
												alt={
													item.title.english ||
													item.title.romaji ||
													item.title.native ||
													item.title.userPreferred
												}
												className="w-full aspect-[2/3] relative"
											/>
											{!!item?.chapters && (
												<div className="absolute top-0 right-0 m-[4px] rounded bg-black/80 text-[#fffc] p-[4px]">
													<p>{item?.chapters}. ch</p>
												</div>
											)}
											{!!item.countryOfOrigin && (
												<div className="absolute top-0 left-0 m-[4px] rounded bg-black/60 text-[#fffc] px-[8px] border-2">
													<p>{item?.countryOfOrigin}</p>
												</div>
											)}
											{!!item.averageScore && (
												<div className="absolute bottom-0 right-0 m-[4px] rounded bg-black/60 text-[#fffc] px-[8px]">
													<p>{item?.averageScore}% ❤</p>
												</div>
											)}
											<div className="absolute bottom-0 left-0 m-[4px] rounded-full bg-black/60 text-teal-100 px-[8px]">
												<p className="font-black">#{i + 1}</p>
											</div>
										</div>

										<div>
											<div className="airing-info-main-title uppercase font-bold max-lg:text-base h-[60px]">
												<p
													className="line-clamp-2"
													title={
														item.title.english ||
														item.title.romaji ||
														item.title.native ||
														item.title.userPreferred
													}
												>
													{item.title.english ||
														item.title.romaji ||
														item.title.native ||
														item.title.userPreferred}
												</p>
											</div>
											<p className="text-[#fffc]">{item.status}</p>
										</div>
									</Link>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</>
			)}
		</div>
	)
}

export default MangaHeadingENG
