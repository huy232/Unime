import React, { useState, useEffect, useRef } from "react"
import { useParams, useLocation } from "react-router-dom"
import axios from "axios"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import { BsFillArrowLeftSquareFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { API } from "../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import VideoPlayer from "../../Components/Content/VideoPlayer"
import FilmLoadingRequest from "../../Components/Content/LoadingRequest/FilmLoadingRequest"
import { useAuth } from "../../Contexts/auth"
import ErrorLoad from "../../Components/Content/ErrorLoad"
import EnglishIframe from "../../Components/Content/EnglishIframe"
function AnimeWatchENG() {
	const episodeListRef = useRef()
	const { animeId } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const current = queryParams.get("current")
	const provider = queryParams.get("provider")
	const episodeNumber = queryParams.get("episodeNumber")
	const [listEpisode, setListEpisode] = useState([])
	const [watchDetail, setWatchDetail] = useState("Loading")
	const [videoUrl, setVideoUrl] = useState([])
	const [videoLoading, setVideoLoading] = useState(true)
	const [subtitles, setSubtitles] = useState([])
	const [thumbnail, setThumbnail] = useState(null)
	const [intro, setIntro] = useState(null)
	const [title, setTitle] = useState("")
	const [videoType, setVideoType] = useState("")
	const [error, setError] = useState(false)
	const [info, setInfo] = useState()
	const [infoLoaded, setInfoLoaded] = useState(false)
	const { user } = useAuth()
	const pathname = useLocation()

	useEffect(() => {
		const fetchInfoAndEpisodes = async () => {
			try {
				const { data: infoData } = await axios.get(`${API}/eng/info/${animeId}`)
				const { data: episodeListData } = await axios.get(
					`${API}/eng/episode-list/${animeId}&${provider}`
				)

				setInfo(infoData.data)
				setListEpisode(episodeListData.data)
				setInfoLoaded(true)
			} catch (err) {
				console.error("Failed to fetch info or episodes", err)
			}
		}
		fetchInfoAndEpisodes()
	}, [animeId, provider])

	useEffect(() => {
		if (infoLoaded) {
			const episodeTitle = listEpisode.find((ep) => ep.id === current)
			setTitle(
				`${
					info.title?.english || info.title?.romaji || info.title?.native
				} - EP. ${episodeTitle?.number}${
					episodeTitle?.title ? ` - ${episodeTitle.title}` : ""
				}`
			)
		}
	}, [infoLoaded, listEpisode, current, info])

	useEffect(() => {
		if (!infoLoaded || listEpisode.length === 0) return

		const fetchEpisodeData = async () => {
			setVideoLoading(true)
			try {
				const response = await axios.get(`${API}/eng/provider`, {
					params: {
						anilistID: animeId,
						episodeID: current,
						provider,
						episodeNumber,
					},
				})

				if (!response.data.success) {
					setError(true)
					return
				}

				const { data } = response.data
				setVideoType(data.type)
				setVideoUrl(data.sources || [])

				const subs =
					data.subtitles?.filter(
						(sub) => sub.lang.toLowerCase() !== "thumbnails"
					) || []
				setSubtitles(
					subs.map((sub, i) => ({ html: `${i}. ${sub.lang}`, url: sub.url }))
				)
				setThumbnail(
					data.subtitles?.find(
						(sub) => sub.lang.toLowerCase() === "thumbnails"
					) || null
				)
				setIntro(data.intro || null)

				const episodeTitle = listEpisode.find((ep) => ep.id === current)
				setWatchDetail(
					`${title} - EP. ${episodeTitle?.number}${
						episodeTitle?.title ? ` - ${episodeTitle.title}` : ""
					}`
				)

				if (user) {
					await axios.post(`${API}/save-history`, {
						userId: user.id,
						animeName: title,
						animeEpisode: `EP. ${episodeTitle?.number}${
							episodeTitle?.title ? ` - ${episodeTitle.title}` : ""
						}`,
						animeImage: info.coverImage,
						animeCover: info.bannerImage,
						animeColor: info.color,
						duration: info.duration,
						rating: info.rating?.anilist,
						totalEpisodes: info.totalEpisodes,
						type: info.type,
						animeStatus: info.status,
						animeId: info.id,
						currentSlug: `${pathname.pathname}${pathname.search}`,
						animeSlug: `/eng/info/${animeId}`,
					})
				}
			} catch (err) {
				if (!axios.isCancel(err)) setError(true)
			} finally {
				setVideoLoading(false)
			}
		}

		fetchEpisodeData()
	}, [infoLoaded, current, animeId, provider, episodeNumber])

	useDocumentTitle(watchDetail)

	const videoServeByType = (videoType) => {
		if (videoType === "iframe") {
			return <EnglishIframe iFrameSource={videoUrl[0]} />
		}
		if (videoType === "m3u8") {
			return (
				<VideoPlayer
					videoUrl={videoUrl}
					subtitles={subtitles}
					thumbnail={thumbnail?.url ? thumbnail.url : ""}
					listEpisode={listEpisode}
					setVideoLoading={setVideoLoading}
					intro={intro}
				/>
			)
		}
	}

	return (
		<div className="flex max-lg:flex-col h-svh">
			{error ? (
				<ErrorLoad />
			) : videoLoading || listEpisode.length === 0 ? (
				<FilmLoadingRequest />
			) : (
				videoServeByType(videoType)
			)}

			<div className="episode-content">
				<div className="episode-section">
					<div className="episode-section-fixed">
						<Link
							to={`/eng/info/${animeId}`}
							className="group hover:opacity-80 duration-200 ease-in-out"
							aria-label={animeId}
						>
							<button
								className="bg-[#000] border-none flex items-center justify-center"
								id="back-to-info-eng-btn"
								aria-label="Back to info english button"
							>
								<BsFillArrowLeftSquareFill style={{ color: "white" }} />
							</button>
						</Link>
						<div className="episode-heading-section">
							<h5 className="episode-section-title text-center text-white font-bold">
								EPISODE LIST
							</h5>
						</div>
						<Link
							to={`/eng`}
							className="group hover:opacity-80 duration-200 ease-in-out"
							aria-label="HOME"
						>
							<button
								className="bg-[#000] border-none flex items-center justify-center"
								id="back-to-home-eng-btn"
								aria-label="HOME"
							>
								<FontAwesomeIcon icon={faHouse} style={{ color: "white" }} />
							</button>
						</Link>
					</div>
				</div>
				<div
					ref={episodeListRef}
					className="lg:h-[calc(100svh-60px)] overflow-y-scroll bg-[#222] h-[calc(50svh-60px)]"
				>
					{listEpisode.map((item, i) => (
						<Link
							to={`/eng/watch/${animeId}?current=${item.id}&provider=${provider}&episodeNumber=${item.number}`}
							key={i}
							title={
								item.title
									? `EP. ${item.number} - ${item.title}`
									: `Episode - ${item.number}`
							}
							className={`flex items-center h-[80px] px-[12px] py-[8px] w-full hover:text-white hover:opacity-80 hover:bg-white/20 duration-200 ease-in-out ${
								current === item.id
									? "bg-white/50 active"
									: "odd:bg-[#111111] even:bg-[#272727]"
							}`}
							onClick={() => {
								setVideoLoading(true)
							}}
						>
							<div className="mr-[6px] h-full flex items-center justify-center text-amber-400 ">
								<p className="font-extrabold px-[4px] border-r-[2px] opacity-80">
									{item.number}
								</p>
							</div>
							<div className="mx-[6px] w-full flex">
								<p className="line-clamp-2 w-full text-[#E2DFD2]">
									{item.title ? item.title : `Episode. ${item.number}`}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default AnimeWatchENG
