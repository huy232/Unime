import React from "react"
import { ENG_GENRES, PROVIDER } from "../../../constants"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"
import AnimeInfoEpisodeHolderENG from "../AnimeInfoEpisodeHolderENG"
import RecommendENG from "../RecommendENG"
import { Skeleton } from "@mui/material"
import "./animeinfodetail.css"
import { duration } from "../../../Utilities/duration"

function AnimeInfoDetailENG({
	loading,
	info,
	setProvider,
	provider,
	setLoading,
	providerRef,
	animeId,
	setInfo,
	loadingEpisodeList,
	setLoadingEpisodeList,
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
			{info.nextAiringEpisode && (
				<div className="flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
					{loading ? (
						""
					) : (
						<>
							<div className="leading-none mx-[6px] p-[8px]">
								Next episode estimated:
							</div>
							<div className="leading-none mx-[6px] bg-[#533483] rounded p-[8px]">
								{new Date(
									info.nextAiringEpisode.airingTime * 1000
								).toLocaleString()}
							</div>
						</>
					)}
				</div>
			)}
			<div className="description">
				{loading ? (
					<p className="anime-description-paragraph"></p>
				) : (
					<p
						className="anime-description-paragraph"
						dangerouslySetInnerHTML={{
							__html: info.description,
						}}
					></p>
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
								className="first:ml-[6px] last:mr-[6px]"
							>
								<div className="cursor-pointer rounded p-[10px] bg-[#5f5f5f29] mx-[10px] my-[6px] duration-200 hover:opacity-80 ease-in-out">
									{genre.name}
								</div>
							</Link>
						))}
					</div>
					<div className="flex w-100 mt-[12px] max-lg:flex-col">
						{info?.countryOfOrigin && (
							<div className="flex flex-col items-center mx-[10px]">
								<span className="text-[#282828] font-semibold bg-[#f98866] p-[5px] rounded">
									COUNTRY
								</span>
								<span>{info.countryOfOrigin}</span>
							</div>
						)}
						{info?.duration && (
							<div className="flex flex-col items-center mx-[10px]">
								<span className="text-[#282828] font-semibold bg-[#80bd9e] p-[5px] rounded">
									DURATION
								</span>
								<span>{duration(Number(info.duration))}</span>
							</div>
						)}
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
									url={`https://www.youtube.com/watch?v=${info.trailer.id}`}
									controls={true}
								/>
							</div>
						</div>
					)}
					<div className="mt-[18px] mb-[8px]">
						<p className="inline-block text-white/50 border-l-[6px] border-white/70 px-[6px] bg-white/10 rounded-r">
							<i>*Recommend</i>: <strong>Gogoanime</strong> and{" "}
							<strong>Zoro</strong> providers for best and most stable
							quality...
						</p>
					</div>
					<div className="max-lg:text-center flex max-lg:flex-col justify-between lg:[&>*]:mx-[20px]">
						<div className="flex flex-col">
							<label htmlFor="provider">PROVIDER:</label>
							<select
								className="provider flex font-semibold uppercase rounded group bg-[#222] text-white p-[4px] cursor-pointer outline-none border-none"
								onChange={(e) => {
									localStorage.setItem("unime-provider", e.target.value)
									setProvider(e.target.value)
									setLoadingEpisodeList(true)
								}}
								defaultValue={provider}
							>
								{PROVIDER.map((providerSource) => (
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
						<h4 style={{ marginTop: "30px" }}>EPISODE LIST</h4>
					</div>
					<div>
						<AnimeInfoEpisodeHolderENG
							info={info}
							provider={provider}
							providerRef={providerRef}
							animeId={animeId}
							setInfo={setInfo}
							setLoadingEpisodeList={setLoadingEpisodeList}
							loadingEpisodeList={loadingEpisodeList}
						/>
					</div>
					{info.recommendations.length > 0 && (
						<RecommendENG
							recommend={info.recommendations}
							setLoading={setLoading}
						/>
					)}
				</>
			)}
		</div>
	)
}

export default AnimeInfoDetailENG
