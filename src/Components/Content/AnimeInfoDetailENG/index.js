import React from "react"
import { ENG_GENRES } from "../../../constants"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"
import AnimeInfoEpisodeHolderENG from "../AnimeInfoEpisodeHolderENG"
import DateAiring from "../DateAiring"
import RecommendENG from "../RecommendENG"

function AnimeInfoDetailENG({
	loading,
	info,
	setProvider,
	provider,
	prefer,
	setPrefer,
	timeZone,
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
					{info.title?.english || info.title?.romaji || info.title?.native}
				</h1>
			</div>
			{/* new Date(anime.airingAt * 1000) */}
			{info.nextAiringEpisode && (
				<div className="flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
					<div className="leading-none mx-[6px] p-[8px]">
						Next episode estimated:
					</div>
					<div className="leading-none mx-[6px] bg-[#533483] rounded p-[8px]">
						{new Date(info.nextAiringEpisode.airingTime * 1000)
							.toLocaleString("en-US", {
								timeZone: `${timeZone}`,
							})
							.toString()}
					</div>
				</div>
			)}
			<div className="description">
				<p
					className="anime-description-paragraph"
					dangerouslySetInnerHTML={{
						__html: info.description,
					}}
				></p>
			</div>
			{!loading && (
				<>
					<p className="max-lg:text-center">Genres:</p>
					<div className="genres flex flex-wrap max-lg:flex-col max-lg:items-center">
						{resultCategory.map((genre) => (
							<Link to={`/eng/anime/${genre.slug}`} key={genre.slug}>
								<div className="cursor-pointer rounded p-[10px] bg-[#5f5f5f29] mx-[10px] my-[6px] duration-200 hover:opacity-80 ease-in-out">
									{genre.name}
								</div>
							</Link>
						))}
					</div>
					{info?.trailer?.site === "youtube" && (
						<div className="w-100 flex flex-col items-center mt-[20px]">
							<h3>IN CASE YOU INTERESTED</h3>
							<div className="youtube-link">
								<ReactPlayer
									url={`https://www.youtube.com/watch?v=${info.trailer.id}`}
									controls={true}
								/>
							</div>
						</div>
					)}
					<div className="max-lg:text-center mt-[12px] flex max-lg:flex-col justify-between lg:[&>*]:mx-[20px]">
						<div>
							<div>PROVIDER</div>
							<div className="max-lg:block flex [&>*]:m-[6px] [&>*]:p-[6px] [&>*]:rounded group">
								<button
									className={`${
										provider !== "zoro"
											? "bg-[#f48484] text-[#1A120B]"
											: "bg-[#5f5f5f29] text-[#fff]"
									} hover:opacity-80 duration-200 ease-in-out`}
									onClick={() => {
										localStorage.setItem("unime-provider", "")
										setProvider("")
									}}
								>
									GogoAnime
								</button>
								<button
									className={`${
										provider === "zoro"
											? "bg-[#f48484] text-[#1A120B]"
											: "bg-[#5f5f5f29] text-[#fff]"
									} hover:opacity-80 duration-200 ease-in-out`}
									onClick={() => {
										localStorage.setItem("unime-provider", "zoro")
										setProvider("zoro")
									}}
								>
									Zoro
								</button>
							</div>
						</div>
						<div>
							<div className="lg:text-right">PREFER</div>
							<div className="max-lg:block flex [&>*]:m-[6px] [&>*]:p-[6px] [&>*]:rounded group ">
								<button
									className={`${
										prefer === "vi"
											? "bg-[#f48484] text-[#1A120B]"
											: "bg-[#5f5f5f29] text-[#fff]"
									} hover:opacity-80 duration-200 ease-in-out`}
									onClick={() => {
										localStorage.setItem("unime-prefer", "vi")
										setPrefer("vi")
									}}
								>
									VI
								</button>
								<button
									className={`${
										prefer === "eng"
											? "bg-[#f48484] text-[#1A120B]"
											: "bg-[#5f5f5f29] text-[#fff]"
									} hover:opacity-80 duration-200 ease-in-out`}
									onClick={() => {
										localStorage.setItem("unime-prefer", "eng")
										setPrefer("eng")
									}}
								>
									ENG
								</button>
							</div>
						</div>
					</div>
					<div className="list-episode-title-main">
						<h4 style={{ marginTop: "30px" }}>EPISODE LIST</h4>
					</div>
					<div>
						{!loading && (
							<AnimeInfoEpisodeHolderENG
								info={info}
								provider={provider}
								prefer={prefer}
							/>
						)}
					</div>
					{!loading && info.recommendations.length > 0 && (
						<RecommendENG recommend={info.recommendations} />
					)}
				</>
			)}
		</div>
	)
}

export default AnimeInfoDetailENG
