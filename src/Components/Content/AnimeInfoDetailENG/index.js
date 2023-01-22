import React from "react"
import { ENG_GENRES, MAINSITE } from "../../../constants"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"

function AnimeInfoDetailENG({ loading, info }) {
	let resultCategory = ENG_GENRES.filter((genre) => {
		if (info && Object.keys(info).length !== 0) {
			return info.genres.find((selectedGenre) => selectedGenre === genre.name)
		}
	})

	return (
		<div className="w-[70vw]">
			<div className="eng-title">
				<h1
					className={`font-black`}
					style={{ color: `${info.anilist?.cover?.color || "#fff"}` }}
				>
					{info.title}
				</h1>
			</div>
			<div className="description">
				<p className="anime-description-paragraph">{info.description}</p>
			</div>
			{!loading && (
				<>
					<p>Genres:</p>
					<div className="genres flex">
						{resultCategory.map((genre) => (
							<Link to={`/eng/anime/${genre.slug}`}>
								<div className="cursor-pointer rounded p-[10px] bg-[#5f5f5f29] mx-[10px] my-0 duration-200 hover:opacity-80 ease-in-out">
									{genre.name}
								</div>
							</Link>
						))}
					</div>
					{info.anilist?.trailer && (
						<div className="w-100 flex flex-col items-center mt-[20px]">
							<h3>IN CASE YOU INTERESTED</h3>
							<div className="youtube-link">
								<ReactPlayer
									url={`${info.anilist?.trailer}&origin=${MAINSITE}`}
									controls={true}
								/>
							</div>
						</div>
					)}
					{info.episodes.length > 0 && (
						<div>
							<h3>EPISODE</h3>
							<div className="flex flex-wrap">
								{info.episodes.map((episode) => (
									<Link
										to={``}
										className="w-[80px] h-[40px] flex justify-center items-center"
									>
										<div className="">{`EP. ${episode.number}`}</div>
									</Link>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default AnimeInfoDetailENG
