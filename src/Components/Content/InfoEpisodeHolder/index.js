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
				<h4>DANH SÁCH TẬP PHIM</h4>
				<Swiper
					slidesPerView="auto"
					className="swiper-container"
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
