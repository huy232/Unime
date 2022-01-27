/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton"
import axios from "axios"
import ReactPlayer from "react-player"
import "./animeinfo.css"

function AnimeInfo({ instance }) {
	const { anime } = useParams()

	const [info, setInfo] = useState({})
	const [videoUrl, setVideoUrl] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		window.scrollTo(0, 0)
		window.history.scrollRestoration = "manual"

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
					</div>
				</div>
			</div>
		</>
	)
}

export default AnimeInfo
