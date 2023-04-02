import React from "react"
import { Link, useNavigate } from "react-router-dom"
function ChapterOption({
	mangaID,
	provider,
	currentChapter,
	setLoadingCurrentChapter,
	info,
	handleScrollToTop,
}) {
	const navigate = useNavigate()
	let previousChapter = null
	let nextChapter = null
	let currentIndex = info.chapters.findIndex(
		(chapter) => chapter.id === currentChapter
	)
	if (info.chapters[currentIndex - 1]) {
		previousChapter = info.chapters[currentIndex - 1]
	}
	if (info.chapters[currentIndex + 1]) {
		nextChapter = info.chapters[currentIndex + 1]
	}

	return (
		<section className="flex justify-center items-center my-[8px] max-md:flex-col">
			<div>
				<select
					name="chapter-option"
					className="font-semibold bg-[#222] text-white cursor-pointer outline-none border-none w-full"
					onChange={(e) => {
						handleScrollToTop()
						setLoadingCurrentChapter(true)
						navigate(
							`/eng/manga-read?mangaID=${mangaID}&chapterID=${e.target.value}&provider=${provider}`
						)
					}}
					value={currentChapter}
				>
					<option value disabled={true}>
						Select chapter
					</option>
					{info.chapters.map((chapter) => (
						<option key={chapter.id} value={chapter.id}>
							{chapter?.chapterNumber || chapter?.chapter || chapter?.title}
						</option>
					))}
				</select>
			</div>
			<div className="my-4">
				<Link
					to={
						previousChapter
							? `/eng/manga-read?mangaID=${mangaID}&chapterID=${previousChapter.id}&provider=${provider}`
							: "#"
					}
					className={`rounded mx-1 p-2 ${
						previousChapter ? "bg-[#B8621B]" : "bg-white/10"
					} ${
						!previousChapter && "pointer-events-none"
					} hover:opacity-80 duration-200 ease-in-out text-[#fffc]`}
					disabled={previousChapter ? false : true}
					onClick={() => {
						handleScrollToTop()
						setLoadingCurrentChapter(true)
					}}
				>
					Prev
				</Link>
				<Link
					to={
						nextChapter
							? `/eng/manga-read?mangaID=${mangaID}&chapterID=${nextChapter.id}&provider=${provider}`
							: "#"
					}
					className={`rounded mx-1 p-2 ${
						nextChapter ? "bg-[#B8621B]" : "bg-white/10"
					} ${
						!nextChapter && "pointer-events-none"
					} hover:opacity-80 duration-200 ease-in-out text-[#fffc]`}
					disabled={nextChapter ? false : true}
					onClick={() => {
						handleScrollToTop()
						setLoadingCurrentChapter(true)
					}}
				>
					Next
				</Link>
			</div>
		</section>
	)
}

export default ChapterOption
