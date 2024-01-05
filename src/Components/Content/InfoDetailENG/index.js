import React from "react"
import { ENG_GENRES } from "../../../constants"
import { Link } from "react-router-dom"
import AnimeInfoEpisodeHolderENG from "../AnimeInfoEpisodeHolderENG"
import RecommendENG from "../RecommendENG"
import { Skeleton } from "@mui/material"
import "./animeinfodetail.css"
import { duration } from "../../../Utilities/duration"
import CharacterList from "../CharacterList"
import ClampedDivENG from "../DescriptionENG"
import CommentSection from "../CommentSection"
import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FaPlay } from "react-icons/fa"

function InfoDetailENG({
	watchNow,
	loading,
	info,
	setProvider,
	provider,
	setLoading,
	providerRef,
	itemId,
	setInfo,
	setWatchNow,
	providerOptions,
}) {
	let resultCategory = ENG_GENRES.filter((genre) => {
		if (info && Object.keys(info).length !== 0) {
			return info.genres.find((selectedGenre) => selectedGenre === genre)
		}
		return false
	})

	const scrollToRef = useRef(null)
	const executeScroll = () => scrollToRef.current.scrollIntoView()

	return (
		<div className="w-[70vw] max-lg:w-full">
			<div className="eng-title">
				<h1
					className={`font-black max-lg:text-center font-bebas-neue my-1 text-5xl`}
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
			{!loading && (
				<div className="flex max-lg:justify-center max-md:justify-center my-2">
					<button
						onClick={() => executeScroll()}
						className="flex justify-center items-center gap-1 mx-2 p-2 bg-yellow-600 border-transparent rounded hover:opacity-80 duration-200 hover:bg-transparent hover:border-yellow-600 border-2 text-white"
					>
						<FontAwesomeIcon icon={faArrowDown} />
						<span className="mx-[6px] text-sm whitespace-nowrap">
							Episode list
						</span>
					</button>
					{watchNow && (
						<Link
							className="flex justify-center items-center gap-1 mx-2 p-2 bg-red-600 border-transparent rounded hover:opacity-80 duration-200 hover:bg-transparent hover:border-red-600 border-2 text-white"
							to={`/eng/watch/${itemId}?current=${watchNow.id}&provider=${provider}&episodeNumber=${watchNow.number}`}
						>
							<span className="whitespace-nowrap text-sm">Watch now</span>
							<span>
								<FaPlay className="mt-[2px]" />
							</span>
						</Link>
					)}
				</div>
			)}
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
					<div className="genres flex flex-row max-lg:items-center pb-2 group md:flex-wrap max-md:overflow-x-scroll max-md:flex-nowrap">
						{resultCategory.map((genre) => (
							<Link
								to={`/eng/anime/${encodeURIComponent(genre)}`}
								key={genre}
								className="lg:first:ml-[6px] lg:last:mr-[6px] hover:brightness-150 duration-200 ease-in-out"
								aria-label={genre}
							>
								<div className="rounded p-[10px] bg-[#5f5f5f29] mx-[10px] my-[6px]">
									{genre}
								</div>
							</Link>
						))}
					</div>
					<div className="flex w-100 mt-[12px] flex-row max-lg:items-center pb-2 group md:flex-wrap max-md:overflow-x-scroll max-md:flex-nowrap">
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
							<div className="lg:ml-auto lg:mr-[30px] flex flex-col items-center mx-[10px]">
								<span className="text-[#282828] font-semibold bg-[#ba5536] p-[5px] rounded">
									RELEASE
								</span>
								<span>{info.releaseDate}</span>
							</div>
						)}
					</div>
					{info?.trailer && (
						<div className="w-100 flex flex-col items-center mt-[20px]">
							<h3 className="max-lg:text-center font-bebas-neue text-4xl">
								IN CASE YOU INTERESTED
							</h3>
							<div className="w-full max-w-[560px] mx-auto aspect-video">
								<iframe
									className="w-full h-full"
									src={`https://www.youtube.com/embed/${
										info.trailer.split("watch?v=")[1]
									}`}
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						</div>
					)}
					{info.characters.length > 0 && (
						<CharacterList characters={info.characters} />
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
							<label htmlFor="provider" className="font-bold">
								PROVIDER
							</label>
							<select
								className="provider flex font-semibold uppercase rounded group bg-[#222] text-white p-[4px] cursor-pointer outline-none border-none"
								onChange={(e) => {
									setWatchNow({})
									setProvider(e.target.value)
								}}
								defaultValue={provider}
							>
								{providerOptions.map((providerSource) => (
									<option
										value={providerSource.providerId}
										key={providerSource.providerId}
										className="uppercase text-white bg-[#222] font-semibold"
									>
										{providerSource.providerId}
									</option>
								))}
							</select>
						</div>
					</div>
					<div
						className="list-episode-title-main font-bebas-neue"
						ref={scrollToRef}
					>
						<h4 style={{ marginTop: "30px" }} className="text-2xl">
							EPISODE LIST
						</h4>
					</div>
					<div>
						<AnimeInfoEpisodeHolderENG
							info={info}
							provider={provider}
							providerRef={providerRef}
							animeId={itemId}
							setInfo={setInfo}
							setWatchNow={setWatchNow}
						/>
					</div>
					{info.recommendation.length > 0 && (
						<RecommendENG
							recommend={info.recommendation}
							setLoading={setLoading}
							title={"RECOMMENDS"}
						/>
					)}
					{info.relations.length > 0 && (
						<RecommendENG
							recommend={info.relations}
							setLoading={setLoading}
							title={"RELATIONS"}
						/>
					)}
					{!loading && (
						<CommentSection
							itemId={itemId}
							itemTitle={
								info.title?.english || info.title?.romaji || info.title?.native
							}
							language={"en_US"}
							headingTitle={"COMMENTS"}
							route={"eng/info"}
							shortname={"unime-eng"}
						/>
					)}
				</>
			)}
		</div>
	)
}

export default InfoDetailENG
