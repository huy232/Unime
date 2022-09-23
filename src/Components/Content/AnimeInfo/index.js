import loadable from "@loadable/component"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton"
import axios from "axios"
import "./animeinfo.css"
// COMPONENTS
const InfoBox = loadable(() => import("../InfoBox"))
const InfoTrailer = loadable(() => import("../InfoTrailer"))
const InfoHeadDetail = loadable(() => import("../InfoHeadDetail"))
const InfoEpisodeHolder = loadable(() => import("../InfoEpisodeHolder"))
const InfoSpecialEpisodeList = loadable(() =>
	import("../InfoSpecialEpisodeList")
)
const InfoAnimeEpisodeHandle = loadable(() =>
	import("../InfoAnimeEpisodeHandle")
)

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
						const myDomain = "&origin=https://unime.vercel.app/"

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
	}, [anime, instance])
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
					) : (
						<>
							<img
								src={info?.animeInfo?.BannerImg}
								className="banner-info-image"
								alt=""
								style={
									info?.animeInfo?.BannerImg === null ||
									typeof info?.animeInfo?.BannerImg === "undefined"
										? { minHeight: "auto" }
										: {}
								}
							/>
							<div className="banner-overlay"></div>
						</>
					)}
				</div>
			</div>

			<div className="box-info" style={{ position: "relative" }}>
				<div
					className="info-box"
					style={{ display: "flex", flexDirection: "row", width: "100%" }}
				>
					<InfoBox info={info} loading={loading} />
					<div className="info-detail ">
						<InfoHeadDetail info={info} loading={loading} />
						<InfoTrailer videoUrl={videoUrl} />
						<InfoEpisodeHolder
							episodeList={episodeList}
							selectedChunk={selectedChunk}
							setSelectedChunk={setSelectedChunk}
							loading={loading}
						/>
						<InfoAnimeEpisodeHandle
							anime={anime}
							info={info}
							episodeList={episodeList}
							selectedChunk={selectedChunk}
							loading={loading}
						/>

						{specialEpisodeList.length > 0 ? (
							<InfoSpecialEpisodeList
								specialEpisodeList={specialEpisodeList}
								setSelectedSpecialChunk={setSelectedSpecialChunk}
								selectedSpecialChunk={selectedSpecialChunk}
								anime={anime}
								loading={loading}
							/>
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
