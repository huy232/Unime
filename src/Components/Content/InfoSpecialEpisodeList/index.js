import { Card, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
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
	specialEpisodeList,
	setSelectedSpecialChunk,
	selectedSpecialChunk,
	anime,
	loading,
}) {
	return (
		<>
			{loading ? (
				""
			) : (
				<div className="special-episode-wrapper mt-[20px] mb-[20px]">
					<div className="episode-list" style={{ textAlign: "center" }}>
						<h4>DANH SÁCH TẬP ĐIỂM TÂM</h4>
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
											<Link
												to={`/watch/${anime}?specialid=${eachEpisode.id}`}
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
											</Link>
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
