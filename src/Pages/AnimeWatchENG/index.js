import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
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
function AnimeWatchENG() {
	const { animeId } = useParams()
	const queryParams = new URLSearchParams(window.location.search)
	const current = queryParams.get("current")
	const provider = queryParams.get("provider")
	const [listEpisode, setListEpisode] = useState([])
	const [watchDetail, setWatchDetail] = useState("Loading")
	const [videoUrl, setVideoUrl] = useState([])
	const [videoLoading, setVideoLoading] = useState(true)
	const [subtitles, setSubtitles] = useState([])
	const [thumbnail, setThumbnail] = useState(null)
	const [intro, setIntro] = useState(null)
	const [title, setTitle] = useState("")
	const prevAnilist = useRef()
	const [info, setInfo] = useState()

	const { user } = useAuth()

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		// FIX RUBBER SCROLL FOR SAFARI
		document.body.style.overflow = "hidden"

		const filmEpisodeList = async () => {
			if (prevAnilist.current !== animeId) {
				const { data } = await axios.get(
					`${API}/eng/info/${animeId}&${provider}`
				)
				const listData = data.data
				const episodeTitle = listData.episodes.find((obj) => {
					return obj.id === current
				})
				setWatchDetail(
					`${
						listData.title?.english ||
						listData.title?.romanji ||
						listData.title?.native
					} - EP. ${episodeTitle.number} - ${episodeTitle.title}`
				)
				setTitle(
					listData.title?.english ||
						listData.title?.romanji ||
						listData.title?.native
				)
				setListEpisode(listData.episodes)
				setInfo(data.data)
			}
			prevAnilist.current = animeId
		}

		if (listEpisode.length > 0) {
			const episodeTitle = listEpisode.find((obj) => {
				return obj.id === current
			})
			setWatchDetail(
				`${title} - EP. ${episodeTitle.number} - ${episodeTitle.title}`
			)
			if (user) {
				const saveHistory = async () => {
					await axios
						.post(`${API}/save-history`, {
							userId: user.id,
							animeName: title,
							animeEpisode: `EP. ${episodeTitle.number} - ${episodeTitle.title}`,
							animeImage: info?.image,
							animeCover: info?.cover,
							animeColor: info?.color,
							duration: info?.duration,
							rating: info?.rating,
							totalEpisodes: info?.totalEpisodes,
							type: info?.type,
							animeStatus: info?.status,
							animeId: info.id,
						})
						.catch((thrown) => {
							if (axios.isCancel(thrown)) return
						})
				}
				saveHistory()
			}
		}

		const filmEpisodeWatch = async () => {
			await axios
				.get(`${API}/eng/provider/${current}&${provider}`, {
					cancelToken: source.token,
				})
				.then((response) => {
					if (response.data.success !== false) {
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
						setVideoLoading(false)
					}
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		const element = document.getElementsByClassName("active")[0]
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}

		filmEpisodeList()
		filmEpisodeWatch()

		return () => {
			source.cancel()
			document.body.style.overflow = "auto"
		}
	}, [
		animeId,
		current,
		info.color,
		info.cover,
		info.duration,
		info.id,
		info.image,
		info.rating,
		info.status,
		info.totalEpisodes,
		info.type,
		listEpisode,
		provider,
		title,
		user,
	])

	useDocumentTitle(watchDetail)
	return (
		<div className="flex max-lg:flex-col ">
			{videoLoading ? (
				<FilmLoadingRequest />
			) : (
				<VideoPlayer
					videoUrl={videoUrl}
					subtitles={subtitles}
					thumbnail={thumbnail?.url ? thumbnail.url : ""}
					listEpisode={listEpisode}
					setVideoLoading={setVideoLoading}
					intro={intro}
				/>
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
				<div className="lg:h-[calc(var(--vh,1vh)*100-60px)] overflow-y-scroll bg-[#222] h-[calc(var(--vh,1vh)*50-80px)]">
					{listEpisode.map((item, i) => (
						<Link
							to={`/eng/watch/${animeId}?current=${item.id}&provider=${provider}`}
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
