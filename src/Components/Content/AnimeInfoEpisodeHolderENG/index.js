import { useEffect, useState, useMemo } from "react"
import { Card, Row, Col } from "react-bootstrap"
import { BsFillPlayFill } from "react-icons/bs"
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
import SwiperCore, { Pagination, Navigation, Lazy } from "swiper"
import EpisodeHolderSkeleton from "../EpisodeHolderSkeleton"
import blackImage from "../../../Utilities/img/black.webp"
SwiperCore.use([Pagination, Navigation, Lazy])

// ---------------------------

function AnimeInfoEpisodeHolderENG({
	info,
	provider,
	animeId,
	setWatchNow,
	episodeList,
}) {
	const chunkArray = (arr, size) => {
		const chunked = []
		for (let i = 0; i < arr.length; i += size) {
			chunked.push(arr.slice(i, i + size))
		}
		return chunked
	}
	const [selectedChunk, setSelectedChunk] = useState(0)
	const [swiper, setSwiper] = useState(null)
	const [toggleButton, setToggleButton] = useState(true)

	const chunkedEpisodeList = useMemo(() => {
		return episodeList ? chunkArray(episodeList, 12) : []
	}, [episodeList])

	useEffect(() => {
		if (chunkedEpisodeList.length > 0) {
			setWatchNow(chunkedEpisodeList[0][0])
		}
	}, [chunkedEpisodeList, setWatchNow])

	const jump = (progress, speed) => {
		if (swiper) {
			setToggleButton(progress === 0)
			swiper.setProgress(progress, speed)
		}
	}

	const slideTo = (index) => {
		if (swiper) {
			swiper.slideTo(index, 500)
		}
	}

	return (
		<>
			{!episodeList ? (
				<EpisodeHolderSkeleton />
			) : (
				<>
					<div className="flex items-center my-[8px] max-lg:justify-center">
						<label
							htmlFor="chunk-episode-option"
							className="mb-[2px] mt-0 p-0 mr-[6px]"
						>
							LIST
						</label>
						<select
							onChange={(e) => {
								setSelectedChunk(Number(e.target.value))
								slideTo(Number(e.target.value))
							}}
							value={selectedChunk}
							className="font-semibold uppercase rounded group bg-[#222] text-white p-[4px] cursor-pointer outline-none border-none"
						>
							{chunkedEpisodeList.map((chunk, i) => {
								return (
									<option key={i} value={i}>
										{`${chunk[0].number} - ${chunk[chunk.length - 1].number}`}
									</option>
								)
							})}
						</select>
					</div>
					<div className="episode-list">
						{episodeList.length === 0 ? (
							<p style={{ textAlign: "center" }}>
								Anime hasn't upload yet for this provider, please change
								provider or come back later.
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
											id="fast-backward-btn"
											aria-label="Fast backward button"
										>
											<FontAwesomeIcon icon={faFastBackward} />
										</button>
										<button
											onClick={() => jump(1, 500)}
											className={`mx-[4px] ${
												toggleButton === false &&
												"opacity-30 cursor-auto pointer-events-none"
											}`}
											id="fast-forward-btn"
											aria-label="Fast forward button"
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
									preloadImages={false}
									lazy={true}
									onSwiper={setSwiper}
								>
									<div className="swiper-episode-holder">
										{chunkedEpisodeList.map((episodeChunk, i) => (
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

					<div className="episode-wrapper mb-[20px] mx-[4px]">
						<div className="episode-list-detail">
							<Row
								xs={1}
								sm={2}
								md={3}
								lg={3}
								xl={3}
								xxl={4}
								className="w-full g-4 episode-anime-row"
							>
								{chunkedEpisodeList[selectedChunk]?.map((eachEpisode, i) => (
									<Col key={i}>
										<nav>
											<a
												href={`/eng/watch/${info.id}?current=${eachEpisode.id}&provider=${provider}&episodeNumber=${eachEpisode.number}`}
												title={
													eachEpisode.title
														? `EP ${eachEpisode.number} - ${eachEpisode.title}`
														: `Episode - ${eachEpisode.number}`
												}
												aria-label={
													eachEpisode.title
														? `EP ${eachEpisode.number} - ${eachEpisode.title}`
														: `Episode - ${eachEpisode.number}`
												}
											>
												<Card>
													<div className="card-container">
														<Card.Img
															variant="top"
															src={
																eachEpisode?.image ||
																info?.image ||
																info?.coverImage ||
																blackImage
															}
															loading="lazy"
															alt={
																eachEpisode.title
																	? `EP ${eachEpisode.number} - ${eachEpisode.title}`
																	: `Episode - ${eachEpisode.number}`
															}
															style={{
																opacity: 0,
																transition: "opacity 0.5s ease-in-out",
															}}
															onLoad={(e) => {
																e.target.style.opacity = 1
															}}
															onError={(e) => {
																e.target.onerror = null
																e.target.src =
																	info?.image || info?.coverImage || blackImage
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
																{eachEpisode.title
																	? `EP ${eachEpisode.number} - ${eachEpisode.title}`
																	: `Episode - ${eachEpisode.number}`}
															</p>
														</Card.Title>
													</Card.Body>
												</Card>
											</a>
										</nav>
									</Col>
								))}
							</Row>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default AnimeInfoEpisodeHolderENG
