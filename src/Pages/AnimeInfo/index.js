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
import { useRef } from "react"
import Image from "../../Components/Content/Image"
import { useCallback } from "react"
import { useAuth } from "../../Contexts/auth"

function AnimeInfo({ instance }) {
	const { anime } = useParams()
	const { user } = useAuth()
	const [info, setInfo] = useState({})
	const [loading, setLoading] = useState(true)
	const [episodeList, setEpisodeList] = useState([])
	const [specialEpisodeList, setSpecialEpisodeList] = useState([])
	const [ovaList, setOvaList] = useState([])
	const [selectedChunk, setSelectedChunk] = useState(0)
	const [selectedSpecialChunk, setSelectedSpecialChunk] = useState(0)
	const [selectedOvaChunk, setSelectedOvaChunk] = useState(0)
	const [continueToWatch, setContinueToWatch] = useState("")

	const getList = useCallback(async () => {
		window.scrollTo(0, 0)
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		try {
			const response = await instance.get(`/info/${anime}`, {
				cancelToken: source.token,
			})

			const infoData = response.data.data
			const episodesCopy = [...infoData.episodes]
			const episodeListChunk = []
			while (episodesCopy.length) {
				episodeListChunk.push(episodesCopy.splice(0, 12))
			}

			const specialEpisodesCopy = [...infoData.special_episodes]
			const specialEpisodeListChunk = []
			while (specialEpisodesCopy.length) {
				specialEpisodeListChunk.push(specialEpisodesCopy.splice(0, 12))
			}

			const ovaCopy = [...infoData.ova]
			const ovaListChunk = []
			while (ovaCopy.length) {
				ovaListChunk.push(ovaCopy.splice(0, 12))
			}

			document.title = infoData?.name

			if (user) {
				const findHistory = await instance.post("/find-history", {
					userId: user.id,
					storedLocation: "historyVI",
					animeSlug: anime,
				})
				if (findHistory.data.success) {
					setContinueToWatch(findHistory.data.data)
				}
			}

			setInfo(infoData)
			setEpisodeList(episodeListChunk)
			setSpecialEpisodeList(specialEpisodeListChunk)
			setOvaList(ovaListChunk)
			setLoading(false)
		} catch (thrown) {
			if (axios.isCancel(thrown)) return
		}

		return () => {
			source.cancel()
		}
	}, [anime, instance])

	useEffect(() => {
		getList()
	}, [getList])

	const scrollToRef = useRef(null)
	const executeScroll = () => scrollToRef.current.scrollIntoView()

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
							<Image
								src={info?.bannerImage || ""}
								className="banner-info-image duration-500 ease-in-out"
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
						<InfoHeadDetail
							info={info}
							loading={loading}
							executeScroll={executeScroll}
							anime={anime}
							continueToWatch={continueToWatch}
						/>
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
							scrollToRef={scrollToRef}
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
								title={"Danh sách tập điểm tâm"}
								specialEpisodeList={specialEpisodeList}
								setSelectedSpecialChunk={setSelectedSpecialChunk}
								selectedSpecialChunk={selectedSpecialChunk}
								anime={anime}
								loading={loading}
								type="special"
							/>
						)}
						{ovaList.length > 0 && (
							<InfoSpecialEpisodeList
								title={"Danh sách OVA"}
								specialEpisodeList={ovaList}
								setSelectedSpecialChunk={setSelectedOvaChunk}
								selectedSpecialChunk={selectedOvaChunk}
								anime={anime}
								loading={loading}
								type="ova"
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
