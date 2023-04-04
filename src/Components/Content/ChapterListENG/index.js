import React from "react"
import { Link } from "react-router-dom"

function ChapterListENG({ chapters, languageManga, provider, mangaID }) {
	return (
		<>
			{chapters
				.filter((chapter) =>
					chapter.id.includes(`${languageManga ? `/${languageManga}/` : ""}`)
				)
				.reverse()
				.map((filterChapter) => (
					<Link
						className="odd:bg-[#0D0D0D] even:bg-[#272727] w-full flex hover:opacity-80 duration-200 hover:bg-white/20"
						key={filterChapter.id}
						to={`/eng/manga-read?mangaID=${mangaID}&chapterID=${filterChapter.id}&provider=${provider}`}
					>
						<li className="flex text-[#fffc] w-full items-center max-md:flex-col">
							<div className="flex flex-col w-[70%] max-md:w-full max-md:text-center m-2">
								{(filterChapter.chapterNumber || filterChapter.chapter) && (
									<p className="text-orange-500">
										Chapter:{" "}
										{filterChapter.chapterNumber || filterChapter.chapter}
									</p>
								)}
								<p className="text-slate-400">{filterChapter.title}</p>
							</div>
							{(!!filterChapter?.volumeNumber ||
								!!filterChapter?.releasedDate) && (
								<div className="max-md:mx-auto ml-auto w-[30%] max-md:w-full text-center max-md:my-1 mx-4 p-2 pb-4">
									<p className="border-2 p-1 rounded text-sm text-slate-300 max-md:inline block w-full">
										{filterChapter?.volumeNumber
											? `Volume: ${filterChapter.volumeNumber}`
											: filterChapter?.releasedDate}
									</p>
								</div>
							)}
						</li>
					</Link>
				))}
		</>
	)
}

export default ChapterListENG
