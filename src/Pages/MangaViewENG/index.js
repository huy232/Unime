import axios from "axios"
import React, { useRef } from "react"
import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { API } from "../../constants"
import { useState } from "react"
import LoadingSpin from "react-loading-spin"
import MangaReadChapter from "../../Components/Content/MangaReadChapter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons"

function MangaViewENG() {
	const [searchParams] = useSearchParams()
	const mangaID = searchParams.get("mangaID")
	const chapterID = searchParams.get("chapterID")
	const provider = searchParams.get("provider")
	const prevProvider = useRef({
		provider: "",
	})
	const [title, setTitle] = useState()
	const [info, setInfo] = useState({})
	const [loadingChapterList, setLoadingChapterList] = useState(true)

	useEffect(() => {
		if (prevProvider.current.provider !== provider) {
			prevProvider.current.provider = provider
			const CancelToken = axios.CancelToken
			const source = CancelToken.source()
			const getChapterList = async () => {
				await axios
					.get(`${API}/manga-info/${mangaID}&${provider}`)
					.then((data) => {
						if (data.data.success) {
							const mangaData = data.data.data
							setTitle(
								mangaData.title?.english ||
									mangaData.title?.romaji ||
									mangaData?.native
							)
							setInfo(mangaData)
							setLoadingChapterList(false)
						}
					})
					.catch((thrown) => {
						setLoadingChapterList(true)
						if (axios.isCancel(thrown)) return
					})
			}
			getChapterList()
			return () => {
				source.cancel()
			}
		}
	}, [mangaID, provider])

	return (
		<div>
			{loadingChapterList ? (
				<div className="flex justify-center">
					<LoadingSpin primaryColor="red" />
				</div>
			) : (
				<>
					<h2
						className="font-black text-center"
						style={{ color: info?.color || "#fffc" }}
					>
						{title}
					</h2>
					<div className="flex justify-center items-center">
						<Link
							to={`/eng/manga-info/${mangaID}`}
							className="flex items-center mx-2 p-1 bg-white/20 rounded hover:opacity-80 text-[#fffc] duration-200 ease-in-out"
						>
							<FontAwesomeIcon icon={faInfoCircle} />
							<span className="mx-1">INFO</span>
						</Link>
						<Link
							to={`/eng/manga`}
							className="flex items-center mx-2 p-1 bg-white/20 rounded hover:opacity-80 text-[#fffc] duration-200 ease-in-out"
						>
							<FontAwesomeIcon icon={faHome} />
							<span className="mx-1">HOME</span>
						</Link>
					</div>
					<MangaReadChapter
						currentChapter={chapterID}
						provider={provider}
						info={info}
						mangaID={mangaID}
						title={title}
					/>
				</>
			)}
		</div>
	)
}

export default MangaViewENG
