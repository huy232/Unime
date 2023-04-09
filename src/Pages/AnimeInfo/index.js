import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton from "@mui/material/Skeleton"
import axios from "axios"
// COMPONENTS
import InfoBox from "../../Components/Content/InfoBox"
import InfoTrailer from "../../Components/Content/InfoTrailer"
import InfoHeadDetail from "../../Components/Content/InfoHeadDetail"
import InfoEpisodeHolder from "../../Components/Content/InfoEpisodeHolder"
import InfoSpecialEpisodeList from "../../Components/Content/InfoSpecialEpisodeList"
import InfoAnimeEpisodeHandle from "../../Components/Content/InfoAnimeEpisodeHandle"
import CharacterListVI from "../../Components/Content/CharacterListVI"
import "./animeinfo.css"
import CommentSection from "../../Components/Content/CommentSection"

function AnimeInfo({ instance }) {
	const { anime } = useParams()

	const [info, setInfo] = useState({})
	const [loading, setLoading] = useState(true)
	const [episodeList, setEpisodeList] = useState([])
	const [specialEpisodeList, setSpecialEpisodeList] = useState([])
	const [selectedChunk, setSelectedChunk] = useState(0)
	const [selectedSpecialChunk, setSelectedSpecialChunk] = useState(0)

	useEffect(() => {
		window.scrollTo(0, 0)
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getList = async () => {
			await instance
				.get(`/info/${anime}`, {
					cancelToken: source.token,
				})
				.then((response) => {
					let info = response.data.data
					setInfo(info)
					const episodeListChunk = []
					const specialEpisodeListChunk = []
					while (info.episodes.length) {
						episodeListChunk.push(info.episodes.splice(0, 12))
					}
					if (info.special_episodes.length > 0) {
						while (info.special_episodes.length) {
							specialEpisodeListChunk.push(info.special_episodes.splice(0, 12))
						}
					}
					document.title = info?.name
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
			<div
				className={`${
					loading ? "banner-image-overlay-skeleton" : "banner-image-overlay"
				}`}
			>
				<div className="banner-image">
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
								src={info?.bannerImage || ""}
								className="banner-info-image"
								alt={info.name}
								loading="lazy"
							/>
							<div className="banner-overlay"></div>
						</>
					)}
				</div>
			</div>
			<div className="box-info" style={{ position: "relative" }}>
				<div className="info-box flex flex-col lg:flex-row w-full justify-between">
					<InfoBox info={info} loading={loading} />
					<div className="info-detail ">
						<InfoHeadDetail info={info} loading={loading} />
						<InfoTrailer trailerId={info?.trailer?.id} />
						<CharacterListVI
							characters={info?.characters?.edges}
							loading={loading}
						/>
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

						{specialEpisodeList.length > 0 && (
							<InfoSpecialEpisodeList
								specialEpisodeList={specialEpisodeList}
								setSelectedSpecialChunk={setSelectedSpecialChunk}
								selectedSpecialChunk={selectedSpecialChunk}
								anime={anime}
								loading={loading}
							/>
						)}
						{!loading && (
							<CommentSection
								itemId={anime}
								itemTitle={info.name}
								language={"vi"}
								headingTitle={"BÌNH LUẬN"}
								route={"info"}
								shortname={"unime-anime-vercel"}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default AnimeInfo
