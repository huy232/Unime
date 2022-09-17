import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BsFillPlayFill } from "react-icons/bs"
import AnimeSkeleton from "../AnimeSkeleton"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Mousewheel, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Mousewheel, Lazy])

function MostWatched({ instance }) {
	const [rankToday, setRankToday] = useState([])
	const [done, setDone] = useState(false)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getRankToday = () => {
			instance
				.get("/top", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRankToday(data.data.data)
					setDone(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		getRankToday()
		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			{!done ? (
				<AnimeSkeleton />
			) : (
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
					{rankToday.map((anime) => (
						<SwiperSlide key={anime?.slug}>
							<nav>
								<Link to={`info/${anime?.slug}`}>
									<Card>
										<div className="card-container">
											<Card.Img variant="top" src={anime?.thumbnail} />
											<div className="overlay-card">
												<div className="icon">
													{<BsFillPlayFill size={40} />}
												</div>
											</div>
										</div>

										<Card.Body style={{ maxHeight: "5rem", minHeight: "5rem" }}>
											<Card.Title>
												<p className="webclamp">{anime?.name}</p>
											</Card.Title>
										</Card.Body>
									</Card>
								</Link>
							</nav>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	)
}

export default MostWatched
