import React from "react"
import { useState } from "react"
import LoadingSpin from "react-loading-spin"
import ChapterListENG from "../ChapterListENG"

function ChapterHolderENG({
	mangaLanguageOption,
	loadingEpisodeList,
	info,
	provider,
	mangaID,
}) {
	const [languageManga, setLanguageManga] = useState(mangaLanguageOption[0])
	return (
		<>
			{!loadingEpisodeList && mangaLanguageOption.length > 0 && (
				<div className="max-lg:text-center flex max-lg:flex-col justify-between lg:[&>*]:mx-[20px]">
					<div className="flex flex-col">
						<label htmlFor="provider">LANGUAGE OPTION:</label>
						<select
							className="provider flex font-semibold uppercase rounded group bg-[#222] text-white p-[4px] cursor-pointer outline-none border-none"
							onChange={(e) => {
								localStorage.setItem(
									"unime-manga-language-option",
									e.target.value
								)
								setLanguageManga(e.target.value)
							}}
							defaultValue={mangaLanguageOption[0]}
						>
							{mangaLanguageOption.map((language) => (
								<option
									value={language}
									key={language}
									className="uppercase text-white bg-[#222] font-semibold"
								>
									{language}
								</option>
							))}
						</select>
					</div>
				</div>
			)}

			<ul className="overflow-y-scroll h-[500px] mx-4">
				{loadingEpisodeList ? (
					<div className="flex justify-center">
						<LoadingSpin primaryColor="red" />
					</div>
				) : (
					<ChapterListENG
						chapters={info.chapters}
						languageManga={languageManga}
						provider={provider}
						mangaID={mangaID}
					/>
				)}
			</ul>
		</>
	)
}

export default ChapterHolderENG
