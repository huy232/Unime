/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton"
import axios from "axios"
import ReactPlayer from "react-player"
import { Card, Row, Col } from "react-bootstrap"
import TextTruncate from "react-text-truncate"
import "./animeinfo.css"

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation } from "swiper"
SwiperCore.use([Pagination, Navigation])

// ---------------------------

function AnimeInfo({ instance }) {
	const { anime } = useParams()

	const [info, setInfo] = useState({})
	const [videoUrl, setVideoUrl] = useState("")
	const [loading, setLoading] = useState(true)
	const [episodeList, setEpisodeList] = useState([])
	const [selectedChunk, setSelectedChunk] = useState(0)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getList = async () => {
			await instance
				.get(`/info/${anime}`, {
					cancelToken: source.token,
				})
				.then((response) => {
					setInfo(response.data.data)
					if (response.data.data?.animeInfo?.Trailer) {
						const url = response.data.data?.animeInfo?.Trailer
						const newUrl = url.replace(
							"https://www.youtube.com/watch?v=",
							"https://www.youtube-nocookie.com/embed/"
						)
						const myDomain = "&origin=https://mirai-huy8856.vercel.app/"

						const joinUrl = newUrl + myDomain
						setVideoUrl(joinUrl)
					}

					const episodeListChunk = []

					while (response.data.data.episodes.length) {
						episodeListChunk.push(response.data.data.episodes.splice(0, 12))
					}

					setEpisodeList(episodeListChunk)

					setLoading(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getList()

		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			<div className="banner-anime-overlay">
				<div className="banner-anime-image">
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="100%"
							height="450px"
							animation="wave"
							sx={{ bgcolor: "grey.900" }}
						/>
					) : !info?.animeInfo?.BannerImg ? (
						<img
							src={info?.animeInfo?.BannerImg}
							className="banner-info-image"
							style={{ width: "auto" }}
						/>
					) : (
						<img
							src={info?.animeInfo?.BannerImg}
							className="banner-info-image"
						/>
					)}
				</div>
			</div>

			<div className="box-info" style={{ position: "relative" }}>
				<div
					className="info-box"
					style={{ display: "flex", flexDirection: "row", width: "100%" }}
				>
					<div className="cover-wrapper ">
						<div
							className="info-image"
							style={{
								maxHeight: "330px",
								maxWidth: "160px",
								minWidth: "160px",
								minHeight: "330px",
								marginTop: "-5rem",
								marginLeft: "3rem",
							}}
						>
							{loading ? (
								<Skeleton
									variant="rectangular"
									width="160px"
									height="226px"
									animation="wave"
									sx={{ bgcolor: "grey.900" }}
								/>
							) : (
								<img
									src={
										info?.animeInfo?.CoverImg?.large ||
										info?.animeInfo?.CoverImg?.medium ||
										info?.animeInfo?.CoverImg?.small
									}
									className="cover-image"
								/>
							)}
						</div>
					</div>
					<div className="info-detail ">
						<div className="anime-title">
							<h2 style={{ color: `${info?.animeInfo?.CoverImg?.color}` }}>
								{loading ? (
									<Skeleton
										variant="text"
										animation="wave"
										sx={{ bgcolor: "grey.900" }}
									/>
								) : (
									info?.name
								)}
							</h2>
						</div>
						<div className="description">
							<p>
								{loading ? (
									<Skeleton
										variant="text"
										animation="wave"
										sx={{ bgcolor: "grey.900" }}
									/>
								) : !info?.description ? (
									""
								) : (
									`${info?.description}`
								)}
							</p>
						</div>
						<div className="bottom-detail" style={{ marginTop: "50px" }}>
							<div className="country">
								<h6>QUỐC GIA</h6>{" "}
								<div className="country-element">
									{!info?.animeInfo?.Country
										? ""
										: `${info?.animeInfo?.Country}`}
								</div>
							</div>
							<div className="score">
								<h6>ĐIỂM SỐ</h6>{" "}
								<div className="score-element">{info?.animeInfo?.Score}</div>
							</div>
							<div className="duration">
								<h6>THỜI LƯỢNG</h6>
								<div className="duration-element">
									{!info?.animeInfo?.Duration
										? ""
										: `${info?.animeInfo?.Duration} phút`}
								</div>
							</div>
							<div className="views">
								<h6>LƯỢT XEM</h6>
								<div className="views-element">
									{info?.views?.toLocaleString()}
								</div>
							</div>
							<div className="release-date">
								<h6>KHỞI CHIẾU</h6>
								<div className="release-date-element">
									{!info?.animeInfo?.StartDate?.day
										? ""
										: `Ngày ${info?.animeInfo?.StartDate?.day} `}
									{!info?.animeInfo?.StartDate?.month
										? ""
										: `Tháng ${info?.animeInfo?.StartDate?.month} `}
									{!info?.animeInfo?.StartDate?.year
										? ""
										: `Năm ${info?.animeInfo?.StartDate?.year}`}
								</div>
							</div>
						</div>

						<div
							className="box-anime-film-trailer"
							style={{ marginTop: "40px" }}
						>
							{videoUrl ? (
								<>
									<h3>XEM THỬ NẾU BẠN CHƯA RÕ</h3>
									<div className="youtube-link">
										<ReactPlayer url={videoUrl} controls={true} />
									</div>
								</>
							) : (
								""
							)}
						</div>
						<div className="episode-wrapper" style={{ marginTop: "35px" }}>
							<div className="episode-list">
								<h4>DANH SÁCH TẬP PHIM</h4>
								<Swiper
									slidesPerView="auto"
									className="swiper-container"
									navigation={true}
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
							<div id="spacer" style={{ width: "100%", height: "132px" }}></div>
							<div className="episode-list-detail">
								<Row xs={1} sm={2} md={3} lg={4} className="w-100 g-4">
									{episodeList[selectedChunk]?.map((eachEpisode, i) => (
										<Col key={i}>
											<Card>
												<Card.Img
													variant="top"
													src={
														eachEpisode?.thumbnail_medium ||
														eachEpisode?.thumbnail_small
													}
												/>
												<Card.Body>
													<Card.Title>
														<TextTruncate
															line={2}
															element="span"
															truncateText="…"
															text={eachEpisode?.full_name}
														/>
													</Card.Title>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AnimeInfo
