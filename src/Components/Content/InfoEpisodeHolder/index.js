import { useState } from "react"
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

import "./infoepisodeholder.css"
import SwiperCore, { Pagination, Navigation, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Lazy])

// ---------------------------

function InfoEpisodeHolder({
	episodeList,
	selectedChunk,
	setSelectedChunk,
	loading,
}) {
	const [swiper, setSwiper] = useState(null)
	const [toggleButton, setToggleButton] = useState(true)

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

	const slideTo = (index) => {
		if (swiper) {
			swiper.slideTo(index, 500)
		}
	}

	return (
		<>
			<div className="episode-list">
				{!loading && (
					<>
						<div className="list-episode-title-main">
							<h4 style={{ marginTop: "30px" }}>DANH SÁCH TẬP PHIM</h4>
						</div>
						<div className="flex items-center my-[8px] max-lg:justify-center">
							<label
								htmlFor="chunk-episode-option"
								className="mb-[2px] mt-0 p-0 mr-[6px]"
							>
								LIST
							</label>
							<select
								name="chunk-episode-option"
								className="font-semibold uppercase rounded group bg-[#222] text-white p-[4px] cursor-pointer outline-none border-none"
								onChange={(e) => {
									setSelectedChunk(Number(e.target.value))
									slideTo(Number(e.target.value))
								}}
								value={selectedChunk}
							>
								{episodeList.map((episodeChunk, i) => (
									<option key={i} value={i}>{`${episodeChunk[0].name} - ${
										episodeChunk[episodeChunk.length - 1].name
									}`}</option>
								))}
							</select>
						</div>
					</>
				)}
				{!loading && episodeList.length === 0 ? (
					<p style={{ textAlign: "center" }}>
						Phim chưa được cập nhật, xin hãy quay lại sau.
					</p>
				) : !loading ? (
					<>
						{swiper?.allowSlideNext && (
							<div className="flex flex-row mx-auto w-[90%] justify-between">
								<button
									onClick={() => jump(0, 500)}
									className={`mx-[4px] ${
										toggleButton === true &&
										"opacity-30 cursor-auto pointer-events-none"
									}`}
									id="fast-forward-btn"
									aria-label="Fast forward button"
								>
									<FontAwesomeIcon icon={faFastBackward} />
								</button>
								<button
									onClick={() => jump(1, 500)}
									className={`mx-[4px] ${
										toggleButton === false &&
										"opacity-30 cursor-auto pointer-events-none"
									}`}
									id="fast-backward-btn"
									aria-label="Fast backward button"
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
							lazy={true}
							preloadImages={false}
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
											{`${episodeChunk[0].name} - ${
												episodeChunk[episodeChunk.length - 1].name
											}`}
										</li>
									</SwiperSlide>
								))}
							</div>
						</Swiper>
					</>
				) : (
					""
				)}
			</div>
		</>
	)
}

export default InfoEpisodeHolder
