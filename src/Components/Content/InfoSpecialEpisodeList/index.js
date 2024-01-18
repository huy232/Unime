import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import SwiperCore, { Pagination, Navigation, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Lazy])

// ---------------------------
function InfoSpecialEpisodeList({
	title,
	specialEpisodeList,
	setSelectedSpecialChunk,
	selectedSpecialChunk,
	anime,
	loading,
	type,
}) {
	return (
		<>
			{loading ? (
				""
			) : (
				<div className="special-episode-wrapper mt-[20px] mb-[20px]">
					<div className="episode-list" style={{ textAlign: "center" }}>
						<h4>{title}</h4>
						<Swiper
							slidesPerView="auto"
							className="swiper-container"
							navigation={false}
							pagination={{
								type: "fraction",
							}}
							preloadImages={false}
							lazy={true}
						>
							{specialEpisodeList.map((episodeChunk, i) => (
								<SwiperSlide
									key={i}
									style={{
										width: "160px",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<li
										onClick={() => {
											setSelectedSpecialChunk(i)
										}}
										className="episode-chunk"
										style={
											selectedSpecialChunk === i
												? {
														color: "black",
														backgroundColor: "white",
														borderRadius: "8px",
														transition: "all 0.4s linear",
												  }
												: {}
										}
									>
										{`${i}`}
									</li>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="episode-list-detail">
						<Row
							xs={1}
							sm={2}
							md={3}
							lg={4}
							className="w-full g-4 episode-anime-row"
						>
							{specialEpisodeList[selectedSpecialChunk]?.map(
								(eachEpisode, i) => (
									<Col key={i}>
										<nav>
											<a
												href={
													type === "ova"
														? `/watch/${anime}?index=${eachEpisode.name}&type=ova`
														: `/watch/${anime}?specialid=${eachEpisode.id}&type=special`
												}
												title={eachEpisode?.full_name}
												aria-label={eachEpisode?.full_name}
											>
												<Card>
													<div className="card-container">
														<Card.Img
															variant="top"
															src={
																eachEpisode?.thumbnail_medium ||
																eachEpisode?.thumbnail_small
															}
															loading="lazy"
															alt={eachEpisode?.full_name}
															style={{
																opacity: 0,
																transition: "opacity 0.5s ease-in-out",
															}}
															onLoad={(e) => {
																e.target.style.opacity = 1
															}}
														/>
														<div className="overlay-card">
															<div className="icon">
																{<BsFillPlayFill size={40} />}
															</div>
														</div>
													</div>
													<Card.Body>
														<Card.Title>
															<p className="webclamp">
																{eachEpisode?.full_name}
															</p>
														</Card.Title>
													</Card.Body>
												</Card>
											</a>
										</nav>
									</Col>
								)
							)}
						</Row>
					</div>
				</div>
			)}
		</>
	)
}

export default InfoSpecialEpisodeList
