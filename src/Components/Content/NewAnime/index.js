import { BsFillPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import AnimeSkeletonCard from "../AnimeSkeletonCard"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"

import SwiperCore, { Pagination, Lazy } from "swiper"
SwiperCore.use([Pagination, Lazy])

function NewAnime({ loadingNewAnime, newAnime }) {
	return (
		<>
			{!loadingNewAnime ? (
				<AnimeSkeletonCard height={"h-[180px]"} />
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
					{newAnime.map((anime) => (
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
											{anime?.status && (
												<div className="absolute top-0 left-0 m-2 p-[4px] text-sm font-medium text-[#fffc] rounded bg-[#469F76]/[0.8]">
													{anime.status}
												</div>
											)}
											<div className="overlay-card">
												<div className="icon">
													{<BsFillPlayFill size={40} />}
												</div>
											</div>
										</div>

										<Card.Body
											className="card-body-home"
											style={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
											}}
										>
											<Card.Title>
												<p className="webclamp text-orange-50 font-semibold">
													{anime?.name}
												</p>
											</Card.Title>
											<Card.Text
												variant="bottom"
												style={{
													backgroundColor: "rgba(0, 0, 0, 0.3)",
													borderRadius: "6px",
													color: "#b3b300",
												}}
												className="webclamp__home"
												title={anime?.newestEpisode.name}
											>
												<span>{anime?.newestEpisode.name}</span>
											</Card.Text>
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

export default NewAnime
