import React from "react"
import { ENG_GENRES, MAINSITE, MANGA_PROVIDER } from "../../../constants"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"
import RecommendENG from "../RecommendENG"
import { Skeleton } from "@mui/material"
import CharacterList from "../CharacterList"
import ClampedDivENG from "../DescriptionENG"
import CommentSection from "../CommentSection"
import ChapterHolderENG from "../ChapterHolderENG"
import LoadingSpin from "react-loading-spin"

function MangaInfoDetailENG({
	loading,
	info,
	setProvider,
	provider,
	setLoading,
	itemId,
	loadingEpisodeList,
	setLoadingEpisodeList,
	mangaLanguageOption,
}) {
	let resultCategory = ENG_GENRES.filter((genre) => {
		if (info && Object.keys(info).length !== 0) {
			return info.genres.find((selectedGenre) => selectedGenre === genre.name)
		}
	})

	return (
		<div className="w-[70vw] max-lg:w-full">
			<div className="eng-title">
				<h1
					className={`font-black max-lg:text-center`}
					style={{ color: `${info?.color || "#fff"}` }}
				>
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="100%"
							height="60px"
							animation="wave"
							sx={{ bgcolor: "grey.900" }}
							style={{
								marginTop: "10px",
								borderRadius: "6px",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						/>
					) : (
						info.title?.english || info.title?.romaji || info.title?.native
					)}
				</h1>
			</div>
			<div className="description">
				{!loading && (
					<div className="anime-description-paragraph">
						<ClampedDivENG>{info.description}</ClampedDivENG>
					</div>
				)}
			</div>
			{!loading && (
				<>
					<p className="max-lg:text-center">Genres:</p>
					<div className="genres flex flex-wrap max-lg:flex-col max-lg:items-center pb-8">
						{resultCategory.map((genre) => (
							<Link
								to={`/eng/anime/${genre.slug}`}
								key={genre.slug}
								className="lg:first:ml-[6px] lg:last:mr-[6px]"
								aria-label={genre.name}
							>
								<div className="cursor-pointer rounded p-[10px] bg-[#5f5f5f29] mx-[10px] my-[6px] duration-200 hover:opacity-80 ease-in-out">
									{genre.name}
								</div>
							</Link>
						))}
					</div>
					<div className="flex w-100 mt-[12px] max-lg:flex-col">
						{info?.releaseDate && (
							<div className="lg:ml-auto lg:mr-[30px] flex flex-col items-center">
								<span className="text-[#282828] font-semibold bg-[#ba5536] p-[5px] rounded">
									RELEASE
								</span>
								<span>{info.releaseDate}</span>
							</div>
						)}
					</div>
					{info?.trailer?.site === "youtube" && (
						<div className="w-100 flex flex-col items-center mt-[20px]">
							<h3 className="max-lg:text-center">IN CASE YOU INTERESTED</h3>
							<div className="youtube-link">
								<ReactPlayer
									url={`https://www.youtube-nocookie.com/embed/${info.trailer.id}&origin=${MAINSITE}`}
									controls={true}
								/>
							</div>
						</div>
					)}
					{info.characters.length > 0 && (
						<CharacterList characters={info.characters} />
					)}
					<div className="max-lg:text-center flex max-lg:flex-col justify-between lg:[&>*]:mx-[20px]">
						<div className="flex flex-col">
							<label htmlFor="provider">PROVIDER:</label>
							<select
								className="provider flex font-semibold uppercase rounded group bg-[#222] text-white p-[4px] cursor-pointer outline-none border-none"
								onChange={(e) => {
									localStorage.setItem("unime-manga-provider", e.target.value)
									setProvider(e.target.value)
									setLoadingEpisodeList(true)
								}}
								defaultValue={provider}
							>
								{MANGA_PROVIDER.map((providerSource) => (
									<option
										value={providerSource}
										key={providerSource}
										className="uppercase text-white bg-[#222] font-semibold"
									>
										{providerSource}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="list-episode-title-main">
						<h4 style={{ marginTop: "30px" }}>CHAPTER LIST</h4>
					</div>
					{loadingEpisodeList ? (
						<div className="flex justify-center">
							<LoadingSpin primaryColor="red" />
						</div>
					) : (
						<ChapterHolderENG
							mangaLanguageOption={mangaLanguageOption}
							info={info}
							provider={provider}
							mangaID={itemId}
						/>
					)}

					{info.recommendations.length > 0 && (
						<RecommendENG
							recommend={info.recommendations}
							setLoading={setLoading}
						/>
					)}

					<CommentSection
						itemId={itemId}
						itemTitle={
							info.title?.english || info.title?.romaji || info.title?.native
						}
						language={"en_US"}
						headingTitle={"COMMENTS"}
						route={"eng/manga-info"}
						shortname={"unime-eng"}
					/>
				</>
			)}
		</div>
	)
}

export default MangaInfoDetailENG
