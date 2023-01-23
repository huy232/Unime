import React from "react"
import { ENG_GENRES } from "../../../constants"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"
import AnimeInfoEpisodeHolderENG from "../AnimeInfoEpisodeHolderENG"

function AnimeInfoDetailENG({ loading, info }) {
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
			<div className="description">
				<p
					className="anime-description-paragraph"
					dangerouslySetInnerHTML={{
						__html: info.description?.replace(/<[br]+>/g, ""),
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
					{info.episodes.length > 0 && (
						<div>{!loading && <AnimeInfoEpisodeHolderENG info={info} />}</div>
					)}
				</>
			)}
		</div>
	)
}

export default AnimeInfoDetailENG
