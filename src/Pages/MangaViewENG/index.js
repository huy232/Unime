import axios from "axios"
import React, { useRef } from "react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { API } from "../../constants"
import { useState } from "react"
import LoadingSpin from "react-loading-spin"
import MangaReadChapter from "../../Components/Content/MangaReadChapter"
import CommentSection from "../../Components/Content/CommentSection"
import MangaRedirectSection from "../../Components/Content/MangaRedirectSection"

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
	const [chapterNumber, setChapterNumber] = useState()

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
							const exactChapter = mangaData.chapters.find(
								(chapter) => chapter.id === chapterID
							)
							const currentChapterNumber =
								exactChapter?.chapter ||
								exactChapter?.chapterNumber ||
								exactChapter?.title?.match(/\d+/g)[0]
							setChapterNumber(currentChapterNumber)
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
	}, [chapterID, mangaID, provider])

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
					<MangaRedirectSection mangaID={mangaID} />
					<MangaReadChapter
						currentChapter={chapterID}
						provider={provider}
						info={info}
						mangaID={mangaID}
						title={title}
					/>
					<MangaRedirectSection mangaID={mangaID} />
					<CommentSection
						itemId={`${mangaID}-${chapterNumber}`}
						itemTitle={title}
						language={"en_US"}
						headingTitle={"COMMENTS"}
						route={"eng/manga-read"}
						shortname={"unime-eng"}
					/>
				</>
			)}
		</div>
	)
}

export default MangaViewENG
