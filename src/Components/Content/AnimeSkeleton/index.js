import { Card } from "react-bootstrap"
import Skeleton from "@mui/material/Skeleton"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Mousewheel, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Mousewheel, Lazy])

function AnimeSkeleton() {
	return (
		<>
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
				className="newSwiper h-100"
				pagination={{
					type: "progressbar",
				}}
			>
				{[0, 1, 2, 3, 4].map((anime, i) => (
					<SwiperSlide key={i}>
						<Card>
							<div className="card-container">
								<Card.Img variant="top" src={anime?.thumbnail} />
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
