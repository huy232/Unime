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
import { useCallback } from "react"
import { useMemo } from "react"
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
	const prevAnilist = useRef()
	const [info, setInfo] = useState()
	const { user } = useAuth()
	const pathname = useLocation()
	const [error, setError] = useState(false)
	const memoizedPathname = useMemo(() => pathname.pathname, [pathname.pathname])
	const memoizedSearch = useMemo(() => pathname.search, [pathname.search])
	const memoizedUser = useMemo(() => user, [user])

	const filmEpisodeList = useCallback(async () => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		if (prevAnilist.current !== animeId) {
			const { data } = await axios.get(`${API}/eng/info/${animeId}`)
			const { data: episodeData } = await axios.get(
				`${API}/eng/episode-list/${animeId}&${provider}`
			)
			const listData = data.data
			const episodeDataProvider = episodeData.data
			const episodeTitle = episodeDataProvider.find((obj) => {
				return Number(obj.number) === Number(episodeNumber)
			})
			setWatchDetail(
				`${
					listData.title?.english ||
					listData.title?.romaji ||
					listData.title?.native
				} - EP. ${episodeTitle.number} ${
					episodeTitle.title ? `- ${episodeTitle.title}` : ""
				}`
			)
			setTitle(
				listData.title?.english ||
					listData.title?.romaji ||
					listData.title?.native
			)
			setListEpisode(episodeDataProvider)
			setInfo(data.data)
		}
		prevAnilist.current = animeId
		return () => {
			source.cancel()
		}
	}, [animeId, episodeNumber, provider])

	const filmEpisodeWatch = useCallback(async () => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		await axios
			.get(
				`${API}/eng/provider`,
				{
					params: {
						anilistID: animeId,
						episodeID: current,
						provider: provider,
						episodeNumber: episodeNumber,
					},
				},
				{
					cancelToken: source.token,
				}
			)
			.then((response) => {
				if (response.data.success !== false) {
					setVideoType(response.data.data.type)
					setVideoUrl(response.data.data.sources)
					if (response.data.data.subtitles) {
						let subs = response.data.data.subtitles.filter(
							(option) => option.lang !== "Thumbnails"
						)
						setSubtitles(
							subs.map((sub, i) => ({
								html: `${i}. ${sub.lang}`,
								url: sub.url,
							}))
						)
						setThumbnail(
							response.data.data.subtitles.find(
								(sub) => sub.lang === "Thumbnails"
							)
						)
					}
					if (response.data.data?.intro) {
						setIntro(response.data.data.intro)
					}
					if (listEpisode.length > 0) {
						const episodeTitle = listEpisode.find((obj) => {
							return obj.id === current
						})
						setWatchDetail(
							`${title} - EP. ${episodeTitle.number} ${
								episodeTitle.title ? `- ${episodeTitle.title}` : ""
							}`
						)
						if (memoizedUser && info) {
							const saveHistory = async () => {
								await axios
									.post(`${API}/save-history`, {
										userId: memoizedUser.id,
										animeName: title,
										animeEpisode: `EP. ${episodeTitle.number} ${
											episodeTitle.title ? `- ${episodeTitle.title}` : ""
										}`,
										animeImage: info?.coverImage,
										animeCover: info?.bannerImage,
										animeColor: info?.color,
										duration: info?.duration,
										rating: info?.rating?.anilist,
										totalEpisodes: info?.totalEpisodes,
										type: info?.type,
										animeStatus: info?.status,
										animeId: info.id,
										currentSlug: `${memoizedPathname}${memoizedSearch}`,
										animeSlug: `/eng/info/${animeId}`,
									})
									.catch((thrown) => {
										if (axios.isCancel(thrown)) return
									})
							}
							saveHistory()
						}
					}
					setVideoLoading(false)
				} else {
					setError(true)
				}
			})
			.catch((thrown) => {
				if (axios.isCancel(thrown)) return
			})
	}, [
		animeId,
		current,
		episodeNumber,
		info,
		listEpisode,
		memoizedPathname,
		memoizedSearch,
		provider,
		title,
	])

	const memoizedFilmEpisodeList = useMemo(
		() => filmEpisodeList,
		[filmEpisodeList]
	)
	const memoizedFilmEpisodeWatch = useMemo(
		() => filmEpisodeWatch,
		[filmEpisodeWatch]
	)

	useEffect(() => {
		document.body.style.overflow = "hidden"

		const episodeListElement = episodeListRef.current

		if (episodeListElement) {
			const activeEpisode = episodeListElement.querySelector(".active")

			if (activeEpisode) {
				const rect = activeEpisode.getBoundingClientRect()

				if (rect.top < 0 || rect.bottom > window.innerHeight) {
					episodeListElement.scrollTo({
						top: activeEpisode.offsetTop - 80,
						behavior: "smooth",
					})
				}
			}
		}

		memoizedFilmEpisodeList()
		memoizedFilmEpisodeWatch()
		return () => {
			document.body.style.overflow = "auto"
		}
	}, [memoizedFilmEpisodeList, memoizedFilmEpisodeWatch])
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
		<div className="flex max-lg:flex-col h-[calc(var(--vh,1vh)*100)]">
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
					className="lg:h-[calc(var(--vh,1vh)*100-60px)] overflow-y-scroll bg-[#222] h-[calc(var(--vh,1vh)*50-80px-90px)]"
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
