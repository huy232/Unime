import { useEffect, useState } from "react"
import axios from "axios"
import { BsFillPlayFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import AnimeSkeleton from "../AnimeSkeleton"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Mousewheel, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Mousewheel, Lazy])

function NewAnime({ instance }) {
	const [newAnime, setNewAnime] = useState([])
	const [done, setDone] = useState(false)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getNew = () => {
			instance
				.get("/newest", {
					cancelToken: source.token,
				})
				.then((data) => {
					setNewAnime(data.data.data)
					setDone(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		getNew()
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
					{newAnime.map((anime) => (
						<SwiperSlide key={anime?.slug}>
							<nav>
								<Link to={`info/${anime?.slug}`} title={anime?.name}>
									<Card>
										<div className="card-container">
											<Card.Img variant="top" src={anime?.thumbnail} />
											<div className="overlay-card">
												<div className="icon">
													{<BsFillPlayFill size={40} />}
												</div>
											</div>
										</div>

										<Card.Body
											className="card-body-home"
											style={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
											}}
										>
											<Card.Title>
												<p className="webclamp">{anime?.name}</p>
											</Card.Title>
											<Card.Text
												variant="bottom"
												style={{
													backgroundColor: "rgba(0, 0, 0, 0.3)",
													borderRadius: "6px",
													color: "#b3b300",
												}}
												className="webclamp__home"
												title={anime?.newestEpisode.name}
											>
												<span>{anime?.newestEpisode.name}</span>
											</Card.Text>
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

export default NewAnime
