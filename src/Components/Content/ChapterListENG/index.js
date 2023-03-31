import React from "react"
import { Link } from "react-router-dom"

function ChapterListENG({ chapters, languageManga, provider, mangaID }) {
	return (
		<>
			{provider === "mangareader"
				? chapters
						.filter((chapter) => chapter.id.includes(`/${languageManga}/`))
						.map((filterChapter) => (
							<Link
								className="odd:bg-[#0D0D0D] even:bg-[#272727] w-full flex p-4 hover:opacity-80 duration-200 hover:bg-white/20"
								key={filterChapter.id}
								to={`/eng/manga-read?mangaID=${mangaID}&chapterID=${filterChapter.id}&provider=${provider}`}
							>
								<li className="flex text-[#fffc] w-full items-center">
									<div className="flex flex-col">
										{(filterChapter.chapterNumber || filterChapter.chapter) && (
											<p>
												Chapter:{" "}
												{filterChapter.chapterNumber || filterChapter.chapter}
											</p>
										)}
										<p>{filterChapter.title}</p>
									</div>
									{!!filterChapter?.volumeNumber && (
										<p className="ml-auto border-2 inline p-[4px] rounded">
											Volume: {filterChapter.volumeNumber}
										</p>
									)}
									{!!filterChapter?.releasedDate && (
										<p className="ml-auto border-2 inline p-[4px] rounded">
											{filterChapter.releasedDate}
										</p>
									)}
								</li>
							</Link>
						))
				: chapters.map((chapter) => (
						<Link
							className="odd:bg-[#0D0D0D] even:bg-[#272727] w-full flex p-4 hover:opacity-80 duration-200 hover:bg-white/20"
							key={chapter.id}
							to={`/eng/manga-read?mangaID=${mangaID}&chapterID=${chapter.id}&provider=${provider}`}
						>
							<li className="flex text-[#fffc] w-full items-center">
								<div className="flex flex-col">
									{(chapter.chapterNumber || chapter.chapter) && (
										<p>Chapter: {chapter.chapterNumber || chapter.chapter}</p>
									)}
									<p>{chapter.title}</p>
								</div>
								{!!chapter?.volumeNumber && (
									<p className="ml-auto border-2 inline p-[4px] rounded">
										Volume: {chapter.volumeNumber}
									</p>
								)}
								{!!chapter?.releasedDate && (
									<p className="ml-auto border-2 inline p-[4px] rounded">
										{chapter.releasedDate}
									</p>
								)}
							</li>
						</Link>
				  ))}
		</>
	)
}

export default ChapterListENG
