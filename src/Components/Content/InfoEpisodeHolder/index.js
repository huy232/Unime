// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation } from "swiper"
SwiperCore.use([Pagination, Navigation])

// ---------------------------

function InfoEpisodeHolder({ episodeList, selectedChunk, setSelectedChunk }) {
	return (
		<>
			<div className="episode-list">
				<div className="list-episode-title-main">
					<h4 style={{ marginTop: "30px" }}>DANH SÁCH TẬP PHIM</h4>
				</div>
				<Swiper
					slidesPerView="auto"
					className="swiper-container swiper-info"
					navigation={false}
					pagination={{
						type: "fraction",
					}}
				>
					{episodeList.map((episodeChunk, i) => (
						<SwiperSlide
							onClick={() => {
								setSelectedChunk(i)
							}}
							key={i}
							style={{
								width: "160px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<li
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
				</Swiper>
			</div>
		</>
	)
}

export default InfoEpisodeHolder
