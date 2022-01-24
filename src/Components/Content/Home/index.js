import { useEffect, useState } from "react"
import { BsEyeFill, BsFillPlayFill } from "react-icons/bs"
import { Card, Button, CardGroup, Row } from "react-bootstrap"
import axios from "axios"
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
	const [rankToday, setRankToday] = useState([])
	const [done, setDone] = useState(false)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getSlide = async () => {
			await instance
				.get("/slide", {
					cancelToken: source.token,
				})
				.then((data) => setSliders(data.data.data))
				.catch((thrown) => {
					if (axios.isCancel(thrown)) {
						console.log("Request Canceled", thrown.message)
					}
				})
		}

		const getNew = async () => {
			await instance
				.get("/newest", {
					cancelToken: source.token,
				})
				.then((data) => {
					setNewAnime(data.data.data)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) {
						console.log("Request Canceled", thrown.message)
					}
				})
		}
		const getRankToday = async () => {
			await instance
				.get("/top", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRankToday(data.data.data)
					setDone(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) {
						console.log("Request Canceled", thrown.message)
					}
				})
		}
		getSlide()
		getNew()
		getRankToday()
		return () => {
			source.cancel()
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

											<Card.Body
												style={{
													display: "flex",
													flexDirection: "column",
													justifyContent: "space-between",
												}}
											>
												<Card.Title>
													<TextTruncate
														line={2}
														element="span"
														truncateText="…"
														text={anime.name}
													/>
												</Card.Title>
												<Card.Text
													variant="bottom"
													style={{
														backgroundColor: "rgba(0, 0, 0, 0.3)",
														borderRadius: "10px",
														padding: "5px",
													}}
												>
													<TextTruncate
														line={2}
														element="span"
														truncateText="..."
														text={anime.newestEpisode.name}
														style={{ color: "#b3b300" }}
													/>
												</Card.Text>
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
								{rankToday.map((anime) => (
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
			)}
		</>
	)
}

export default Home
