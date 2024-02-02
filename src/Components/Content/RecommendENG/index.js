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
import Image from "../Image"

function RecommendENG({ recommend, setLoading, title = "RELATIONS" }) {
	const recommendFilter = recommend.filter((item) => {
		return (
			item.status !== "Unknown" &&
			item.type !== "NOVEL" &&
			item.relationType !== "ALTERNATIVE" &&
			item.relationType !== "SOURCE"
		)
	})
	return (
		<>
			{recommendFilter.length > 0 && (
				<>
					<h2
						className={`font-black text-right max-lg:text-center py-4 font-bebas-neue mx-2 text-5xl`}
					>
						{title}
					</h2>
					<div className="mb-[24px]">
						<Swiper
							modules={[Lazy]}
							slidesPerView="auto"
							spaceBetween={10}
							className="recommend-item-swiper w-full"
							pagination={{
								type: "progressbar",
							}}
							lazy={true}
							preloadImages={false}
						>
							{recommendFilter.map((item, i) => (
								<SwiperSlide key={i}>
									<Link
										to={
											item.type === "MANGA"
												? `/eng/manga-info/${item.id}`
												: `/eng/info/${item.id}`
										}
										title={
											item.title.english ||
											item.title.romaji ||
											item.title.native ||
											item.title.userPreferred
										}
										onClick={() => setLoading(true)}
										aria-label={
											item.title.english ||
											item.title.romaji ||
											item.title.native ||
											item.userPreferred
										}
									>
										<div className="group recommend-item-holder select-none cursor-pointer">
											<div className="recommend-item-image aspect-[2/3] group-hover:opacity-80 duration-200 ease-in-out relative">
												<Image
													className="object-fill object-center w-full h-full linear absolute duration-500 ease-in-out"
													src={
														item.image ||
														item.coverImage.extraLarge ||
														item.coverImage.large ||
														item.coverImage.medium ||
														item.coverImage ||
														""
													}
													alt={
														item.title.english ||
														item.title.romaji ||
														item.title.native ||
														item.title.userPreferred
													}
													loading="lazy"
												/>
												{(item.rating || item.averageScore) && (
													<div className="text-white absolute right-0 bg-[#0d0d0d]/[0.8] p-[6px]">
														{item.rating || item.averageScore}%{" "}
														<FontAwesomeIcon
															icon={faHeart}
															className="text-red-500"
														/>
													</div>
												)}

												<div className="text-[#fffc] absolute bottom-0 text-sm w-full p-[4px] bg-[#0d0d0d]/[0.8]">
													<div className="flex">
														<p>
															{(item.episodes && `${item.episodes}. EP`) ||
																(item.chapters && `${item.chapters}. Ch`) ||
																(item.totalEpisodes &&
																	`${item.totalEpisodes}. EP`)}
														</p>
														<p className="ml-auto border-2 rounded px-[4px]">
															{item.type || item.relationType}
														</p>
													</div>
												</div>
											</div>
											<div className="recommend-item-title h-[60px]">
												<p
													className="line-clamp-2 font-extrabold"
													style={{
														color:
															item?.coverImage?.color ||
															item?.color ||
															COLORLIST[i] ||
															"#fffc",
													}}
												>
													{item.title.english ||
														item.title.romaji ||
														item.title.native ||
														item.title.userPreferred}
												</p>
											</div>
											<div className="text-[#fffc] text-sm inline-block p-[4px]">
												<p className="border-2 rounded px-[4px]">
													{item.status}
												</p>
											</div>
										</div>
									</Link>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</>
			)}
		</>
	)
}

export default RecommendENG
