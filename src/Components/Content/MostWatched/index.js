import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BsFillPlayFill } from "react-icons/bs"
import AnimeSkeletonCard from "../AnimeSkeletonCard"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"

import SwiperCore, { Pagination, Lazy } from "swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
SwiperCore.use([Pagination, Lazy])

function MostWatched({ rankToday, loadingRankToday }) {
	return (
		<>
			{!loadingRankToday ? (
				<AnimeSkeletonCard height={"h-[150px]"} />
			) : (
				<Swiper
					spaceBetween={10}
					slidesPerView="auto"
					className="homeSwiper h-100"
					pagination={{
						type: "progressbar",
					}}
					preloadImages={false}
					lazy={true}
				>
					{rankToday.map((anime) => (
						<SwiperSlide
							key={anime?.slug}
							className="w-[320px] max-md:w-[260px]"
						>
							<nav>
								<Link
									to={`info/${anime?.slug}`}
									title={anime?.name}
									aria-label={anime?.name}
								>
									<Card>
										<div className="card-container">
											<Card.Img
												variant="top"
												src={anime.thumbnail}
												loading="lazy"
												alt={anime.name}
												style={{
													opacity: 0,
													transition: "opacity 0.5s ease-in-out",
												}}
												onLoad={(e) => {
													e.target.style.opacity = 1
												}}
											/>
											{anime?.animeFormat && (
												<div className="absolute top-0 left-0 m-2 p-[4px] text-sm font-medium text-[#fffc] rounded bg-[#9f6746]/[0.8]">
													{anime.animeFormat}
												</div>
											)}
											<div className="overlay-card">
												<div className="icon">
													{<BsFillPlayFill size={40} />}
												</div>
											</div>
										</div>

										<Card.Body className="h-[150px]">
											<Card.Title>
												<div className="h-[70px]">
													<p className="webclamp text-orange-50 font-semibold">
														{anime?.name}
													</p>
												</div>
											</Card.Title>
											{anime?.views && (
												<p className="text-[#fffc] flex items-center">
													<FontAwesomeIcon
														icon={faEye}
														className="pr-[4px] h-[14px] w-[14px] mt-[2px]"
													/>
													{anime.views.toLocaleString()} lượt xem
												</p>
											)}
										</Card.Body>
									</Card>
								</Link>
							</nav>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	)
}

export default MostWatched
