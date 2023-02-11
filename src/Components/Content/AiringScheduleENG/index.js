import React from "react"
import { Link } from "react-router-dom"

function AiringScheduleENG({ loadingAiringSchedule, airingSchedule }) {
	return (
		<>
			{!loadingAiringSchedule && (
				<div className="w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36">
					<div className="flex md:space-x-3 items-center flex-col">
						<h1 className="mb-2 uppercase font-black text-[#B99B6B] max-md:text-center">
							Estimated Schedule
						</h1>
						<span className="bg-[#AA5656] rounded p-1">
							{new Date().toLocaleString()}
						</span>
					</div>
					<div className="h-[400px] overflow-y-scroll my-12">
						{airingSchedule.map((anime, i) => (
							<div className="p4 odd:bg-white/5 even:bg-black/5" key={i}>
								<div className="flex justify-between w-full text-white p-4 max-md:flex-col">
									<div className="flex w-full items-center max-md:flex-col max-md:justify-center">
										<div className="flex max-md:flex-col items-center">
											<p className="text-slate-300 text-xs">
												{new Date(anime.airingAt * 1000).toLocaleString(
													navigator.language,
													{
														hour: "2-digit",
														minute: "2-digit",
													}
												)}
											</p>
											<p className="mx-2 w-[30px] text-center text-slate-300 text-xs">
												{anime.country}
											</p>
										</div>
										<Link
											to={`/eng/info/${anime.id}`}
											className="p-2 max-md:text-center"
											aria-label={
												anime.title?.english ||
												anime.title?.romaji ||
												anime.title?.native ||
												anime.title?.userPreferred
											}
										>
											{anime.title?.english ||
												anime.title?.romaji ||
												anime.title?.native ||
												anime.title?.userPreferred}
										</Link>
									</div>
									<div className="flex w-full justify-end items-center max-md:justify-center max-md:flex-col">
										{anime.rating && (
											<p className="mx-2 text-slate-300 text-xs">
												{anime.rating}% ❤
											</p>
										)}
										<p className="mx-2 bg-black rounded p-1 my-2 w-[150px] text-center">
											Episode {anime.episode}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default AiringScheduleENG
