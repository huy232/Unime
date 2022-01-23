import { useEffect, useState } from "react"
import { BsEyeFill, BsFillPlayFill } from "react-icons/bs"
import { Card, Button, CardGroup, Row } from "react-bootstrap"
import TextTruncate from "react-text-truncate"
import "./home.css"
import HomeSkeleton from "./homeSkeleton"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Mousewheel, Lazy } from "swiper"
SwiperCore.use([Pagination, Navigation, Mousewheel, Lazy])

// ---------------------------

function Home({ instance }) {
	const [sliders, setSliders] = useState([])
	const [newAnime, setNewAnime] = useState([])
	const [done, setDone] = useState(false)

	const getSlide = async () => {
		const { data } = await instance.get("/slide")
		setSliders(data.data)
	}

	const getNew = async () => {
		const { data } = await instance.get("/newest")
		setNewAnime(data.data)
	}

	useEffect(async () => {
		await getSlide()
		await getNew()
		await setDone(true)
		return () => {
			setDone(true)
		}
	}, [])

	return (
		<>
			{!done ? (
				<HomeSkeleton />
			) : (
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
						{sliders.map((slider) => (
							<SwiperSlide key={slider.slug}>
								<div className="inner">
									<img src={slider.thumbnail} alt={slider.name} />
									<div className="overlay">
										<a className="icon">{<BsFillPlayFill size={70} />}</a>
									</div>
								</div>
								<div className="bottom-left">
									<h3>{slider.name}</h3>
									<p>
										<BsEyeFill /> {slider.views}
									</p>
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
								{newAnime.map((anime) => (
									<SwiperSlide key={anime.slug}>
										<Card>
											<div className="card-container">
												<Card.Img variant="top" src={anime.thumbnail} />
												<div className="overlay-card">
													<a className="icon">{<BsFillPlayFill size={40} />}</a>
												</div>
											</div>

											<Card.Body>
												<Card.Title>
													<TextTruncate
														line={2}
														element="span"
														truncateText="…"
														text={anime.name}
													/>
												</Card.Title>
											</Card.Body>
										</Card>
									</SwiperSlide>
								))}
							</CardGroup>
						</Swiper>
					</div>
				</>
			)}
		</>
	)
}

export default Home
