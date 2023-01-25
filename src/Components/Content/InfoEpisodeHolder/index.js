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
import SwiperCore, { Pagination, Navigation } from "swiper"
SwiperCore.use([Pagination, Navigation])

// ---------------------------

function InfoEpisodeHolder({
	episodeList,
	selectedChunk,
	setSelectedChunk,
	loading,
}) {
	const [swiper, setSwiper] = useState()
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

	return (
		<>
			<div className="episode-list">
				<div className="list-episode-title-main">
					<h4 style={{ marginTop: "30px" }}>DANH SÁCH TẬP PHIM</h4>
				</div>
				{!loading && episodeList.length === 0 ? (
					<p style={{ textAlign: "center" }}>
						Phim chưa được cập nhật, xin hãy quay lại sau.
					</p>
				) : (
					<>
						{swiper && (
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
											{`${episodeChunk[0].name} - ${
												episodeChunk[episodeChunk.length - 1].name
											}`}
										</li>
									</SwiperSlide>
								))}
							</div>
						</Swiper>
					</>
				)}
			</div>
		</>
	)
}

export default InfoEpisodeHolder
