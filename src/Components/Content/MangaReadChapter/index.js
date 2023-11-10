import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { API } from "../../../constants"
import ChapterOption from "../ChapterOption"
import ChapterSkeleton from "../ChapterSkeleton"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { trackWindowScroll } from "react-lazy-load-image-component"
import useDocumentTitle from "../../../Hooks/useDocumentTitle"
import Image from "../Image"

function MangaReadChapter({
	currentChapter,
	provider,
	info,
	mangaID,
	title,
	toggleLoading,
}) {
	const [currentChapterList, setCurrentChapterList] = useState([])
	const [loadingCurrentChapter, setLoadingCurrentChapter] = useState(true)
	const [chapterInfo, setChapterInfo] = useState({})
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getCurrentChapter = async () => {
			handleScrollToTop()
			setLoadingCurrentChapter(true)
			await axios
				.get(
					`${API}/manga-chapter?chapterId=${currentChapter}&provider=${provider}`
				)
				.then((data) => {
					if (data.data.success) {
						const chapterInfoDetail = info.chapters.find(
							(chapter) => chapter.id === currentChapter
						)
						setChapterInfo(chapterInfoDetail)
						setCurrentChapterList(data.data.data)
						setLoadingCurrentChapter(false)
					}
				})
				.catch((thrown) => {
					setCurrentChapterList([])
					setLoadingCurrentChapter(true)
					if (axios.isCancel(thrown)) return
				})
		}

		getCurrentChapter()
		return () => {
			source.cancel()
		}
	}, [currentChapter, info.chapters, provider, toggleLoading])

	const handleScrollToTop = () => {
		window.scrollTo(0, 0)
		window.history.scrollRestoration = "manual"
	}
	useDocumentTitle(
		`${title} | ${chapterInfo.title} - UNIME` || "Loading - UNIME"
	)

	return (
		<div>
			{loadingCurrentChapter ? (
				<div className="w-full text-center">
					<SkeletonTheme baseColor="#202020" highlightColor="#444">
						<Skeleton height={30} className="skeleton-title w-[40%]" />
					</SkeletonTheme>
				</div>
			) : (
				chapterInfo && (
					<h3 className="italic text-center">
						{chapterInfo.title}
						{(chapterInfo?.chapterNumber || chapterInfo?.chapter) &&
							` | Chapter - ${
								chapterInfo?.chapterNumber || chapterInfo?.chapter
							}`}
					</h3>
				)
			)}
			<ChapterOption
				mangaID={mangaID}
				provider={provider}
				currentChapter={currentChapter}
				info={info}
			/>
			{loadingCurrentChapter ? (
				<ChapterSkeleton />
			) : (
				<ul className="flex flex-col justify-center items-center my-2">
					{currentChapterList.map((page) => (
						<Image
							src={page.img}
							alt={page.title}
							provider={provider}
							page={page}
							key={page.page}
							className="duration-500 ease-in-out"
							loading="lazy"
						/>
					))}
				</ul>
			)}
			<ChapterOption
				mangaID={mangaID}
				provider={provider}
				currentChapter={currentChapter}
				info={info}
			/>
		</div>
	)
}

export default trackWindowScroll(MangaReadChapter)
