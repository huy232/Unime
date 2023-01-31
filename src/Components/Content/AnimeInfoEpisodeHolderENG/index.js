import { useEffect, useState } from "react"
import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faFastBackward,
	faFastForward,
} from "@fortawesome/free-solid-svg-icons"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation } from "swiper"
import { CONSUMET_CORS } from "../../../constants"
SwiperCore.use([Pagination, Navigation])

// ---------------------------

function AnimeInfoEpisodeHolderENG({ info, loading, provider }) {
	const [episodeList, setEpisodeList] = useState([])
	const [selectedChunk, setSelectedChunk] = useState(0)
	const [swiper, setSwiper] = useState()
	const [toggleButton, setToggleButton] = useState(true)

	useEffect(() => {
		const episodeStructure = async () => {
			const episodeListChunk = []
			while (info.episodes.length) {
				episodeListChunk.push(info.episodes.splice(0, 12))
			}
			setEpisodeList(episodeListChunk)
		}
		episodeStructure()
	}, [info.episodes])

	const jump = (progress, speed) => {
		if (swiper) {
			if (progress === 0) {
				setToggleButton(true)
			} else {
				setToggleButton(false)
			}

			swiper.setProgress(progress, speed)
		}
	}

	return (
		<>
			<div className="episode-list">
				{!loading && episodeList.length === 0 ? (
					<p style={{ textAlign: "center" }}>
						Anime hasn't upload yet, please come back later.
					</p>
				) : (
					<>
						{swiper?.allowSlideNext && (
							<div className="flex flex-row mx-auto w-[90%] justify-between">
								<button
									onClick={() => jump(0, 500)}
									className={`mx-[4px] ${
										toggleButton === true &&
										"opacity-30 cursor-auto pointer-events-none"
									}`}
								>
									<FontAwesomeIcon icon={faFastBackward} />
								</button>
								<button
									onClick={() => jump(1, 500)}
									className={`mx-[4px] ${
										toggleButton === false &&
										"opacity-30 cursor-auto pointer-events-none"
									}`}
								>
									<FontAwesomeIcon icon={faFastForward} />
								</button>
							</div>
						)}

						<Swiper
							slidesPerView="auto"
							className="swiper-container swiper-info"
							navigation={true}
							pagination={{
								type: "fraction",
							}}
							onSwiper={setSwiper}
						>
							<div className="swiper-episode-holder">
								{episodeList.map((episodeChunk, i) => (
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
												setSelectedChunk(i)
											}}
											className="episode-chunk"
											style={
												selectedChunk === i
													? {
															color: "black",
															backgroundColor: "white",
															borderRadius: "8px",
															transition: "all 0.4s linear",
													  }
													: {}
											}
										>
											{`${episodeChunk[0].number} - ${
												episodeChunk[episodeChunk.length - 1].number
											}`}
										</li>
									</SwiperSlide>
								))}
							</div>
						</Swiper>
					</>
				)}
			</div>

			<div className="episode-wrapper mb-[20px]">
				<div className="episode-list-detail">
					<Row
						xs={1}
						sm={2}
						md={3}
						lg={4}
						className="w-full g-4 episode-anime-row"
					>
						{episodeList[selectedChunk]?.map((eachEpisode, i) => (
							<Col key={i}>
								<nav>
									{
										<Link
											to={`/eng/watch/${info.id}?current=${eachEpisode.id}&provider=${provider}`}
											title={
												eachEpisode.title
													? `EP ${eachEpisode.number} - ${eachEpisode.title}`
													: `Episode - ${eachEpisode.number}`
											}
										>
											<Card>
												<div className="card-container">
													<Card.Img
														variant="top"
														src={`${CONSUMET_CORS}/${eachEpisode?.image}`}
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
															{eachEpisode.title
																? `EP ${eachEpisode.number} - ${eachEpisode.title}`
																: `Episode - ${eachEpisode.number}`}
														</p>
													</Card.Title>
												</Card.Body>
											</Card>
										</Link>
									}
								</nav>
							</Col>
						))}
					</Row>
				</div>
			</div>
		</>
	)
}

export default AnimeInfoEpisodeHolderENG
