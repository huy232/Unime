/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton"
import axios from "axios"
import ReactPlayer from "react-player"
import { Card, Row, Col } from "react-bootstrap"
import TextTruncate from "react-text-truncate"
import { BsFillPlayFill } from "react-icons/bs"
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
	const [specialEpisodeList, setSpecialEpisodeList] = useState([])
	const [selectedChunk, setSelectedChunk] = useState(0)
	const [selectedSpecialChunk, setSelectedSpecialChunk] = useState(0)

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
					const specialEpisodeListChunk = []
					while (response.data.data.episodes.length) {
						episodeListChunk.push(response.data.data.episodes.splice(0, 12))
					}
					if (response.data.data?.special_episodes.length > 0) {
						while (response.data.data.special_episodes.length) {
							specialEpisodeListChunk.push(
								response.data.data.special_episodes.splice(0, 12)
							)
						}
					}
					document.title = response.data.data?.name
					setEpisodeList(episodeListChunk)
					setSpecialEpisodeList(specialEpisodeListChunk)
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
								display: "block",
								textAlign: "center",
								maxHeight: "330px",
								minHeight: "330px",
								marginTop: "-5rem",
							}}
						>
							{loading ? (
								<Skeleton
									variant="rectangular"
									width="160px"
									height="226px"
									animation="wave"
									sx={{ bgcolor: "grey.900" }}
									style={{ marginLeft: "auto", marginRight: "auto" }}
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
						<div className="detail-cover-info">
							<div className="format">
								{info?.animeInfo?.Format ? (
									<>
										{" "}
										<h5>ĐỊNH DẠNG</h5> <p>{info?.animeInfo?.Format}</p>
									</>
								) : (
									""
								)}
							</div>
							<div className="title">
								{info?.animeInfo?.Format ? (
									<>
										{" "}
										<h5>TÊN PHIM</h5>
										{info?.animeInfo?.Title?.romaji ? (
											<>
												<h6>
													ROMAJI <p>{info?.animeInfo?.Title?.romaji}</p>
												</h6>
											</>
										) : (
											""
										)}
										{info?.animeInfo?.Title?.english ? (
											<>
												<h6>
													TIẾNG ANH <p>{info?.animeInfo?.Title?.english}</p>
												</h6>
											</>
										) : (
											""
										)}
										{info?.animeInfo?.Title?.native ? (
											<>
												<h6>
													TIẾNG NHẬT <p>{info?.animeInfo?.Title?.native}</p>
												</h6>
											</>
										) : (
											""
										)}
									</>
								) : (
									""
								)}
							</div>
							<div className="source">
								{info?.animeInfo?.Source ? (
									<>
										{" "}
										<h5>CHUYỂN THỂ TỪ</h5> <p>{info?.animeInfo?.Source}</p>
									</>
								) : (
									""
								)}
							</div>
							<div className="popularity">
								{info?.animeInfo?.Popularity ? (
									<>
										{" "}
										<h5>ĐỘ NỔI BẬT</h5>{" "}
										<p>{info?.animeInfo?.Popularity.toLocaleString()}</p>
									</>
								) : (
									""
								)}
							</div>
							<div className="favourite">
								{info?.animeInfo?.Favourite ? (
									<>
										{" "}
										<h5>YÊU THÍCH</h5>{" "}
										<p>{info?.animeInfo?.Favourite.toLocaleString()}</p>
									</>
								) : (
									""
								)}
							</div>
							<div className="popularity">
								{info?.animeInfo?.Trending ? (
									<>
										{" "}
										<h5>THỜI THƯỢNG</h5>{" "}
										<p>{info?.animeInfo?.Trending.toLocaleString()}</p>
									</>
								) : (
									""
								)}
							</div>
							<div className="studios">
								{info?.animeInfo?.Studio ? (
									<>
										{" "}
										<h5>STUDIO</h5>{" "}
										<p>
											{info?.animeInfo?.Studio.map(
												(studio) => `${studio.name + ", "}`
											)}
										</p>
									</>
								) : (
									""
								)}
							</div>
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
							<div id="spacer" style={{ width: "100%", height: "165px" }}></div>
							<div className="episode-list-detail">
								<Row
									xs={1}
									sm={2}
									md={3}
									lg={4}
									className="w-100 g-4 episode-anime-row"
								>
									{episodeList[selectedChunk]?.map((eachEpisode, i) => (
										<Col key={i}>
											<nav>
												{info?.name == "Vua Hải Tặc" ? (
													<Link
														to={`/watch/${anime}?index=${eachEpisode.name}`}
													>
														<Card>
															<div className="card-container">
																<Card.Img
																	variant="top"
																	src={
																		eachEpisode?.thumbnail_medium ||
																		eachEpisode?.thumbnail_small
																	}
																/>
																<div className="overlay-card">
																	<div className="icon">
																		{<BsFillPlayFill size={40} />}
																	</div>
																</div>
															</div>
															<Card.Body>
																<Card.Title>
																	{eachEpisode?.full_name == "Trailer" ? (
																		"Movie"
																	) : (
																		<TextTruncate
																			line={2}
																			element="span"
																			truncateText="…"
																			text={eachEpisode?.full_name}
																		/>
																	)}
																</Card.Title>
															</Card.Body>
														</Card>
													</Link>
												) : eachEpisode.name > 0 ? (
													<Link
														to={`/watch/${anime}?index=${eachEpisode.name - 1}`}
													>
														<Card>
															<div className="card-container">
																<Card.Img
																	variant="top"
																	src={
																		eachEpisode?.thumbnail_medium ||
																		eachEpisode?.thumbnail_small
																	}
																/>
																<div className="overlay-card">
																	<div className="icon">
																		{<BsFillPlayFill size={40} />}
																	</div>
																</div>
															</div>
															<Card.Body>
																<Card.Title>
																	{eachEpisode?.full_name == "Trailer" ? (
																		"Movie"
																	) : (
																		<TextTruncate
																			line={2}
																			element="span"
																			truncateText="…"
																			text={eachEpisode?.full_name}
																		/>
																	)}
																</Card.Title>
															</Card.Body>
														</Card>
													</Link>
												) : (
													<Link
														to={`/watch/${anime}?index=${eachEpisode.name}`}
													>
														<Card>
															<div className="card-container">
																<Card.Img
																	variant="top"
																	src={
																		eachEpisode?.thumbnail_medium ||
																		eachEpisode?.thumbnail_small
																	}
																/>
																<div className="overlay-card">
																	<div className="icon">
																		{<BsFillPlayFill size={40} />}
																	</div>
																</div>
															</div>
															<Card.Body>
																<Card.Title>
																	{eachEpisode?.full_name == "Trailer" ? (
																		"Movie"
																	) : (
																		<TextTruncate
																			line={2}
																			element="span"
																			truncateText="…"
																			text={eachEpisode?.full_name}
																		/>
																	)}
																</Card.Title>
															</Card.Body>
														</Card>
													</Link>
												)}
											</nav>
										</Col>
									))}
								</Row>
							</div>
						</div>

						{specialEpisodeList.length > 0 ? (
							<div
								className="special-episode-wrapper"
								style={{ marginTop: "46px" }}
							>
								<div className="episode-list">
									<h4>DANH SÁCH TẬP ĐIỂM TÂM</h4>
									<Swiper
										slidesPerView="auto"
										className="swiper-container"
										navigation={false}
										pagination={{
											type: "fraction",
										}}
									>
										{specialEpisodeList.map((episodeChunk, i) => (
											<SwiperSlide
												onClick={() => {
													setSelectedSpecialChunk(i)
												}}
												key={i}
												style={{
													width: "160px",
												}}
											>
												<li
													className="episode-chunk"
													style={
														selectedSpecialChunk === i
															? {
																	color: "black",
																	backgroundColor: "white",
																	borderRadius: "8px",
																	transition: "all 0.4s linear",
															  }
															: {}
													}
												>
													{`${i}`}
												</li>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
								<div
									id="spacer"
									style={{ width: "100%", height: "165px" }}
								></div>
								<div className="episode-list-detail">
									<Row
										xs={1}
										sm={2}
										md={3}
										lg={4}
										className="w-100 g-4 episode-anime-row"
									>
										{specialEpisodeList[selectedSpecialChunk]?.map(
											(eachEpisode, i) => (
												<Col key={i}>
													<nav>
														<Link
															to={`/watch/${anime}?specialid=${eachEpisode.id}`}
														>
															<Card>
																<div className="card-container">
																	<Card.Img
																		variant="top"
																		src={
																			eachEpisode?.thumbnail_medium ||
																			eachEpisode?.thumbnail_small
																		}
																	/>
																	<div className="overlay-card">
																		<div className="icon">
																			{<BsFillPlayFill size={40} />}
																		</div>
																	</div>
																</div>
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
														</Link>
													</nav>
												</Col>
											)
										)}
									</Row>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default AnimeInfo
