import { BsEyeFill, BsFillPlayFill } from "react-icons/bs"
import { Card, Button, CardGroup, Row } from "react-bootstrap"
import Skeleton from "@mui/material/Skeleton"
import "./home.css"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Mousewheel, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Mousewheel, Lazy])

// ---------------------------

function HomeSkeleton() {
	return (
		<>
			<Swiper
				slidesPerView={1}
				pagination={{
					type: "progressbar",
				}}
				navigation={true}
				loop={true}
				grabCursor={true}
				mousewheel={true}
				lazy={true}
				onSlideChange={(swiper) => {}}
				className="mySwiper"
			>
				{[0, 1, 2, 3, 4, 5, 6].map((slider, i) => (
					<SwiperSlide key={i}>
						<div className="inner">
							<Skeleton
								className="skeleton-thumbnail"
								variant="rectangular"
								width="100%"
								height="460px"
								animation="wave"
							/>
							<div className="overlay">
								<a className="icon"></a>
							</div>
						</div>
						<div className="bottom-left">
							<h3>{<Skeleton />}</h3>
							<p>{<Skeleton variant="text" />}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="anime-card" style={{ marginTop: "42px" }}>
				<h1
					className="anime-h1"
					style={{ marginBottom: "42px", width: "200px" }}
				>
					MỚI NHẤT
				</h1>
				<Swiper
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 3,
						},
						992: {
							slidesPerView: 5,
						},
					}}
					spaceBetween={20}
					grabCursor={true}
					mousewheel={true}
					lazy={true}
					className="newSwiper h-100"
					pagination={{
						type: "progressbar",
					}}
				>
					<CardGroup>
						{[0, 1, 2, 3, 4].map((anime, i) => (
							<SwiperSlide key={i}>
								<Card>
									<div className="card-container">
										<Card.Img variant="top" src={anime.thumbnail} />
									</div>

									<Card.Body>
										<Card.Title>
											<Skeleton variant="text" />
										</Card.Title>
									</Card.Body>
								</Card>
							</SwiperSlide>
						))}
					</CardGroup>
				</Swiper>
			</div>

			<div className="anime-card-today" style={{ marginTop: "42px" }}>
				<div className="center-title">
					<h1 className="anime-top-day-h1" style={{ marginBottom: "42px" }}>
						XEM NHIỀU TRONG NGÀY
					</h1>
				</div>

				<Swiper
					breakpoints={{
						640: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 3,
						},
						992: {
							slidesPerView: 5,
						},
					}}
					spaceBetween={20}
					grabCursor={true}
					mousewheel={true}
					lazy={true}
					className="newSwiper h-100"
					pagination={{
						type: "progressbar",
					}}
				>
					<CardGroup>
						{[0, 1, 2, 3, 4, 5, 6].map((anime, i) => (
							<SwiperSlide key={i}>
								<Card>
									<div className="card-container">
										<Card.Img variant="top" src={anime.thumbnail} />
									</div>

									<Card.Body>
										<Card.Title>
											<Skeleton variant="text" />
										</Card.Title>
									</Card.Body>
								</Card>
							</SwiperSlide>
						))}
					</CardGroup>
				</Swiper>
			</div>

			<div className="today-section" style={{ marginTop: "42px" }}>
				<h1
					className="today-h1"
					style={{
						marginBottom: "42px",
						float: "right",
						marginRight: "30px",
					}}
				>
					CÓ THỂ BẠN SẼ THÍCH ĐÓ
				</h1>
			</div>
		</>
	)
}

export default HomeSkeleton
