/* eslint-disable jsx-a11y/alt-text */
import Skeleton from "@mui/material/Skeleton"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Mousewheel, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Mousewheel, Lazy])

function CharacterDetail({ randomAnime, done3 }) {
	return (
		<>
			<div className="character-detail" style={{ marginTop: "20px" }}>
				{!done3 ? (
					<Skeleton
						variant="rectangular"
						width="100%"
						style={{
							minHeight: "300px",
							maxHeight: "300px",
							width: "auto",
						}}
						animation="wave"
						sx={{ bgcolor: "grey.900" }}
					/>
				) : (
					<>
						{!randomAnime?.CharacterDetail?.length ? (
							""
						) : (
							<Swiper
								slidesPerView="auto"
								spaceBetween={40}
								navigation={false}
								loop={true}
								grabCursor={true}
								className="character-slider"
								style={{ marginLeft: "30px" }}
							>
								{randomAnime.CharacterDetail.map((character, i) => (
									<SwiperSlide
										className="character-detail-slide"
										key={i}
										style={{
											width: "auto",
											display: "flex",
											flexDirection: "column",
											color: "#42EADDFF",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<img
											className="character-detail-image"
											src={
												!character?.image?.large
													? character?.image?.medium
													: character?.image?.large
											}
											style={{
												objectFit: "fill",
												width: "120px",
												height: "160px",
											}}
										/>
										<p className="character-detail-word">
											{!character?.name?.english
												? character?.name?.native
												: character?.name?.english}
										</p>
									</SwiperSlide>
								))}
							</Swiper>
						)}
						{!randomAnime?.CharacterDetail?.length ? (
							""
						) : (
							<h4
								className="character-title"
								style={{
									color: "white",
									fontWeight: "700",
									paddingLeft: "34px",
									userSelect: "none",
								}}
							>
								DÀN NHÂN VẬT
							</h4>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default CharacterDetail
