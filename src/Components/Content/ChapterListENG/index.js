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
						className="odd:bg-[#0D0D0D] even:bg-[#272727] w-full flex p-4 hover:opacity-80 duration-200 hover:bg-white/20"
						key={filterChapter.id}
						to={`/eng/manga-read?mangaID=${mangaID}&chapterID=${filterChapter.id}&provider=${provider}`}
					>
						<li className="flex text-[#fffc] w-full items-center">
							<div className="flex flex-col w-[70%] max-md:w-full max-md:items-center">
								{(filterChapter.chapterNumber || filterChapter.chapter) && (
									<p>
										Chapter:{" "}
										{filterChapter.chapterNumber || filterChapter.chapter}
									</p>
								)}
								<p>{filterChapter.title}</p>
							</div>
							<div className="max-md:mx-auto ml-auto w-[30%] max-md:w-full text-center max-md:my-[14px]">
								{!!filterChapter?.volumeNumber && (
									<p className="border-2 inline p-[4px] rounded text-sm text-slate-300">
										Volume: {filterChapter.volumeNumber}
									</p>
								)}
								{!!filterChapter?.releasedDate && (
									<p className="border-2 inline p-[4px] rounded text-sm text-slate-300">
										{filterChapter.releasedDate}
									</p>
								)}
							</div>
						</li>
					</Link>
				))}
		</>
	)
}

export default ChapterListENG
