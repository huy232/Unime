/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react"
import {
	BsEyeFill,
	BsFillPlayFill,
	BsStopwatchFill,
	BsTv,
} from "react-icons/bs"
import { Card, CardGroup } from "react-bootstrap"
import Skeleton from "@mui/material/Skeleton"
import axios from "axios"
import TextTruncate from "react-text-truncate"
import "./home.css"
import ShowMoreText from "react-show-more-text"
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
	const [randomAnime, setRandomAnime] = useState({})
	const [done1, setDone1] = useState(false)
	const [done2, setDone2] = useState(false)
	const [done3, setDone3] = useState(false)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getSlide = async () => {
			await instance
				.get("/slide", {
					cancelToken: source.token,
				})
				.then((data) => {
					setSliders(data.data.data)
					setDone1(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getNew = async () => {
			await instance
				.get("/newest", {
					cancelToken: source.token,
				})
				.then((data) => {
					setNewAnime(data.data.data)
					setDone2(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getRankToday = async () => {
			await instance
				.get("/top", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRankToday(data.data.data)
					setDone3(true)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const getRandom = async () => {
			await instance
				.get("/today", {
					cancelToken: source.token,
				})
				.then((data) => {
					setRandomAnime(data.data.data)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		getSlide()
		getNew()
		getRankToday()
		getRandom()
		return () => {
			source.cancel()
		}
	}, [])

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
				className="mySwiper"
			>
				{!done1
					? [0, 1, 2, 3, 4, 5, 6].map((slider, i) => (
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
					  ))
					: sliders.map((slider) => (
							<SwiperSlide key={slider?.slug}>
								<div className="inner">
									<img src={slider?.thumbnail} alt={slider?.name} />
									<div className="overlay">
										<a className="icon">{<BsFillPlayFill size={70} />}</a>
									</div>
								</div>
								<div className="bottom-left">
									<h3>{slider?.name}</h3>
									<p>
										<BsEyeFill /> {slider?.views}
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
					className="newSwiper h-100"
					pagination={{
						type: "progressbar",
					}}
				>
					<CardGroup>
						{!done2
							? [0, 1, 2, 3, 4].map((anime, i) => (
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
							  ))
							: newAnime.map((anime) => (
									<SwiperSlide key={anime?.slug}>
										<Card>
											<div className="card-container">
												<Card.Img variant="top" src={anime?.thumbnail} />
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
														text={anime?.name}
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
														text={anime?.newestEpisode.name}
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
					className="newSwiper h-100"
					pagination={{
						type: "progressbar",
					}}
				>
					<CardGroup>
						{!done3
							? [0, 1, 2, 3, 4].map((anime, i) => (
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
							  ))
							: rankToday.map((anime) => (
									<SwiperSlide key={anime?.slug}>
										<Card>
											<div className="card-container">
												<Card.Img variant="top" src={anime?.thumbnail} />
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
														text={anime?.name}
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
					className="today-h1 "
					style={{
						marginBottom: "42px",
						float: "right",
						marginRight: "30px",
					}}
				>
					CÓ THỂ BẠN SẼ THÍCH ĐÓ
				</h1>

				<div className="clearfix"></div>
				<div className="row w-100">
					<div className="col-9">
						<Card>
							<Card.Title className="description-title">
								{!randomAnime?.AnimeName ? (
									<Skeleton
										variant="text"
										animation="wave"
										sx={{ bgcolor: "grey.900" }}
									/>
								) : (
									randomAnime?.AnimeName?.todayTitle
								)}
							</Card.Title>

							{!randomAnime?.BannerImg ? (
								<Skeleton
									variant="rectangular"
									width="100%"
									height="400px"
									animation="wave"
									sx={{ bgcolor: "grey.900" }}
								/>
							) : (
								<Card.Img
									variant="bottom"
									src={randomAnime?.BannerImg}
									style={{
										height: "400px",
										objectFit: "cover",
									}}
								/>
							)}

							<Card.Body className="description-card">
								{!randomAnime?.Description ||
								randomAnime?.Description.trim() === "" ? (
									<Skeleton
										variant="text"
										animation="wave"
										sx={{ bgcolor: "grey.900" }}
									/>
								) : (
									<ShowMoreText
										lines={4}
										more="Hiện thêm"
										less="Rút gọn"
										className="content-css"
										anchorClass="my-anchor-css-class"
										expanded={false}
										truncatedEndingComponent={"... "}
									>
										<Card.Text>{randomAnime?.Description.trim()}</Card.Text>
									</ShowMoreText>
								)}
							</Card.Body>

							<Card.Footer
								style={{
									display: "flex",
									alignItems: "center",
									width: "100%",
									maxWidth: "100%",
								}}
							>
								<span className="studio-text">
									{!randomAnime?.Studio ? (
										<Skeleton
											variant="text"
											animation="wave"
											sx={{ bgcolor: "grey.900" }}
										/>
									) : (
										<>
											<span style={{ fontWeight: "700" }}>Studio:</span>{" "}
											{randomAnime?.Studio}
										</>
									)}
								</span>
							</Card.Footer>
						</Card>

						<div
							className="info-character-wrapper"
							style={{ marginTop: "22px" }}
						>
							<div className="wrapper">
								<div
									className="info-today"
									style={{
										float: "right",
										display: "flex",
										flexDirection: "column",
										alignItems: "flex-end",
										boxShadow: "-5px 5px 0px 2px #761515",
									}}
								>
									<div
										className="episode-time"
										style={{
											display: "inline-flex",
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										{!randomAnime?.Duration ? (
											<Skeleton
												variant="text"
												animation="wave"
												sx={{ bgcolor: "grey.900" }}
											/>
										) : (
											<>
												<BsStopwatchFill />: ~{randomAnime?.Duration} phút/ tập
											</>
										)}
									</div>
									<div
										className="episodes"
										style={{
											display: "inline-flex",
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										{!randomAnime?.EpisodeTotal ? (
											<Skeleton
												variant="text"
												animation="wave"
												sx={{ bgcolor: "grey.900" }}
											/>
										) : (
											<>
												<BsTv />: {randomAnime?.EpisodeTotal} tập
											</>
										)}
									</div>
								</div>

								<div
									className="release-date"
									style={{
										display: "inline-block",
										float: "right",
										clear: "right",
										color: "black",
										textAlign: "right",
										width: "150px",
										marginTop: "20px",
										backgroundColor: "#290149",
										boxShadow: "-5px 5px 0px 2px #A9333A",
										padding: "10px",
									}}
								>
									{!randomAnime?.EndDate ? (
										<Skeleton
											variant="text"
											animation="wave"
											sx={{ bgcolor: "grey.900" }}
										/>
									) : (
										<>
											<span
												style={{
													width: "100%",
													textAlign: "left",
													backgroundColor: "#FFF8F3",
													paddingLeft: "4.5px",
													fontWeight: "900",
												}}
											>
												KẾT THÚC
											</span>
											<br />
											<span style={{ fontWeight: "700", color: "#FFE227" }}>
												NGÀY
											</span>
											<div
												className="day"
												style={{
													backgroundColor: "#3FA796",
													color: "black",
													marginLeft: "65%",
													paddingRight: "4.5px",
												}}
											>
												{!randomAnime?.EndDate?.day ? (
													<Skeleton
														variant="text"
														animation="wave"
														sx={{ bgcolor: "grey.900" }}
														style={{ paddingLeft: "4.5px" }}
													/>
												) : (
													randomAnime?.EndDate?.day
												)}
											</div>
											<span style={{ fontWeight: "700", color: "#FFE227" }}>
												THÁNG
											</span>
											<div
												className="month"
												style={{
													backgroundColor: "#8267BE",
													color: "black",
													marginLeft: "45%",
													paddingRight: "4.5px",
												}}
											>
												{!randomAnime?.EndDate?.month ? (
													<Skeleton
														variant="text"
														animation="wave"
														sx={{ bgcolor: "grey.900" }}
														style={{ paddingLeft: "4.5px" }}
													/>
												) : (
													randomAnime?.EndDate?.month
												)}
											</div>
											<span style={{ fontWeight: "700", color: "#FFE227" }}>
												NĂM
											</span>
											<div
												className="year"
												style={{
													backgroundColor: "#781D42",
													color: "black",
													marginLeft: "25%",
													paddingRight: "4.5px",
												}}
											>
												{!randomAnime?.EndDate?.year ? (
													<Skeleton
														variant="text"
														animation="wave"
														sx={{ bgcolor: "grey.900" }}
														style={{ paddingLeft: "4.5px" }}
													/>
												) : (
													randomAnime?.EndDate?.year
												)}
											</div>
										</>
									)}
								</div>
							</div>

							<div className="character-detail" style={{ marginTop: "20px" }}>
								{!randomAnime?.CharacterDetail ? (
									<Skeleton
										variant="rectangular"
										width="100%"
										style={{ minHeight: "300px", maxHeight: "300px" }}
										animation="wave"
										sx={{ bgcolor: "grey.900" }}
									/>
								) : (
									<>
										<Swiper
											slidesPerView="auto"
											spaceBetween={40}
											navigation={false}
											loop={true}
											grabCursor={true}
											className="characterSlider"
										>
											{!randomAnime?.CharacterDetail
												? [0, 1, 2, 3, 4, 5, 6].map((i) => (
														<Skeleton
															key={i}
															variant="rectangular"
															width="100%"
															style={{ width: "120px", height: "160px" }}
															animation="wave"
															sx={{ bgcolor: "grey.900" }}
														/>
												  ))
												: randomAnime?.CharacterDetail.map((character, i) => (
														<SwiperSlide
															key={i}
															style={{
																width: "auto",
																display: "flex",
																flexDirection: "column",
																color: "#42EADDFF",
															}}
														>
															<img
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
															<p
																style={{
																	wordWrap: "break-word",
																	width: "120px",
																}}
															>
																{!character?.name?.english
																	? character?.name?.native
																	: character?.name?.english}
															</p>
														</SwiperSlide>
												  ))}
										</Swiper>
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
									</>
								)}
							</div>
						</div>
					</div>
					<div className="col-3">
						<div className="image-box">
							{!randomAnime?.CoverImg ? (
								<Skeleton
									variant="rectangular"
									width="100%"
									style={{ minHeight: "300px", maxHeight: "300px" }}
									animation="wave"
									sx={{ bgcolor: "grey.900" }}
								/>
							) : (
								// eslint-disable-next-line jsx-a11y/alt-text
								<img
									src={
										randomAnime?.CoverImg?.large ||
										randomAnime?.CoverImg?.medium ||
										randomAnime?.CoverImg?.small
									}
									style={{
										maxWidth: "100%",
										width: "100%",
										minHeight: "350px",
										maxHeight: "500px",
										objectFit: "cover",
									}}
								/>
							)}
							<div
								className="title-box"
								style={{ display: "flex", flexDirection: "column" }}
							>
								<span className="english" style={{ color: "#f6d365" }}>
									{!randomAnime?.AnimeAllTitle ? (
										<Skeleton
											variant="text"
											animation="wave"
											sx={{ bgcolor: "grey.900" }}
										/>
									) : (
										<>
											<span style={{ fontWeight: "700" }}>ANH:</span>{" "}
											{randomAnime?.AnimeAllTitle?.english}
										</>
									)}
								</span>
								<span className="native" style={{ color: "#d4fc79" }}>
									{!randomAnime?.AnimeAllTitle ? (
										<Skeleton
											variant="text"
											animation="wave"
											sx={{ bgcolor: "grey.900" }}
										/>
									) : (
										<>
											<span style={{ fontWeight: "700" }}>NHẬT:</span>{" "}
											{randomAnime?.AnimeAllTitle?.native}
										</>
									)}
								</span>
								<span className="romaji" style={{ color: "#fa709a" }}>
									{!randomAnime?.AnimeAllTitle ? (
										<Skeleton
											variant="text"
											animation="wave"
											sx={{ bgcolor: "grey.900" }}
										/>
									) : (
										<>
											<span style={{ fontWeight: "700" }}>ROMAJI:</span>{" "}
											{randomAnime?.AnimeAllTitle?.romaji}
										</>
									)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
