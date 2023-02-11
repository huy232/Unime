import { Card } from "react-bootstrap"
import Skeleton from "@mui/material/Skeleton"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./animeskeleton.css"
import blackBackground from "../../../Utilities/img/black.webp"
import SwiperCore, { Pagination, Navigation, Mousewheel, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Mousewheel, Lazy])

function AnimeSkeleton() {
	return (
		<>
			<Swiper
				spaceBetween={10}
				slidesPerView="auto"
				className="homeSwiper h-100"
				pagination={{
					type: "progressbar",
				}}
			>
				{[0, 1, 2, 3, 4, 5, 6].map((anime, i) => (
					<SwiperSlide key={i} className="w-[320px]">
						<Card>
							<div className="card-container">
								<Card.Img
									variant="top"
									src={blackBackground}
									loading="lazy"
									alt="anime-skeleton-thumbnail"
								/>
							</div>

							<Card.Body>
								<Card.Title>
									<Skeleton variant="text" />
								</Card.Title>
							</Card.Body>
						</Card>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default AnimeSkeleton
