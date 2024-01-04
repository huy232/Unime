import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { parseTime } from "../../Utilities/parseTime"
import { API } from "../../constants"
import { Link } from "react-router-dom"
import Image from "../../Components/Content/Image"
import slugify from "slugify"

function AnimeImageSearchLayout({ searchResult, setToggle }) {
	const [loading, setLoading] = useState(true)
	const [view, setView] = useState({})
	const [select, setSelect] = useState(0)
	const prevAnilist = useRef()

	useEffect(() => {
		const getAnime = async (number) => {
			setLoading(true)
			if (prevAnilist.current !== searchResult.result[number].anilist.id) {
				const { data } = await axios.get(
					`${API}/eng/info/${searchResult.result[number].anilist.id}`
				)
				setView(data.data)
			}
			prevAnilist.current = searchResult.result[number].anilist.id
			setLoading(false)
		}
		getAnime(select)
	}, [searchResult.result, select])

	return (
		<div className="flex w-full flex-col gap-8 md:flex-row px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36">
			<div className="w-full space-y-4 md:w-[30%] overflow-y-scroll h-[calc(var(--vh,1vh)*100-40px)]">
				{searchResult.result.map((item, i) => (
					<div
						key={i}
						title={
							item.anilist.title.english ||
							item.anilist.title.romaji ||
							item.anilist.title.native
						}
						className={`space-y-2 bg-background-900 p-4 hover:bg-white/20 transition duration-300 cursor-pointer ${
							select === i && "bg-white/20"
						}`}
						onClick={() => {
							setSelect(i)
						}}
					>
						<p className="line-clamp-2 font-black text-lg">
							{item.anilist.title.english ||
								item.anilist.title.romaji ||
								item.anilist.title.native}
						</p>
						<div className="grid grid-cols-10">
							<div className="col-span-5 flex flex-col justify-between">
								<p>Episode - {item.episode}</p>
								<p>
									{parseTime(Math.floor(item.from))} -{" "}
									{parseTime(Math.floor(item.to))}
								</p>
								<p>~{Math.round(item.similarity * 10000) / 100}% similarity</p>
							</div>
							<div className="col-span-5">
								<Image
									className="w-full object-contain duration-500 ease-in-out"
									src={item.image || item.coverImage || ""}
									alt={
										item.anilist.title.english ||
										item.anilist.title.romaji ||
										item.anilist.title.native
									}
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="w-full bg-background-900 md:w-[70%]">
				<div>
					<button
						className="bg-white/10 hover:opacity-80 duration-200 ease-in-out rounded p-[6px] m-[6px]"
						onClick={() => setToggle(true)}
						id="search-another-btn"
						aria-label="Search another button"
					>
						SEARCH ANOTHER IMAGE
					</button>
				</div>
				<div className="w-full 2xl:w-[40%] xl:w-[50%] lg:w-[60%] md:w-[70%]  mx-auto flex justify-center items-center">
					<video
						className="w-full object-contain"
						src={searchResult.result[select].video}
						autoPlay
						muted
						controls
						playsInline
						loop
					/>
				</div>
				{Object.keys(view).length > 0 && (
					<div className="my-[16px]">
						{!loading && (
							<div className="flex md:flex-row flex-col text-center">
								<div className="max-md:mx-auto w-[160px]">
									<div className="relative aspect-w-2 aspect-h-3">
										<Image
											src={view.image || view.coverImage || ""}
											alt={
												view.title?.english ||
												view.title?.romaji ||
												view.title?.native
											}
											loading="lazy"
											className="duration-500 ease-in-out"
										/>
									</div>
								</div>
								<div className="w-full mx-[6px]">
									<h3
										className="font-black md:text-left"
										style={{ color: `${view?.color || "#fffc"}` }}
									>
										{view.title?.english ||
											view.title?.romaji ||
											view.title?.native}
									</h3>
									<div className="flex flex-col mx-[12px]">
										<div className="flex items-center flex-wrap max-md:justify-center">
											{view.genres.map((genre) => (
												<Link
													to={slugify(genre.toLowerCase())}
													className="bg-white/20 rounded m-[4px] p-[4px]"
													key={genre}
												>
													<p className="p-0">{genre}</p>
												</Link>
											))}
										</div>
										<div className="flex items-center my-[6px] max-md:justify-center">
											<span className="font-bold">
												❤: {view.rating?.anilist}/10
											</span>

											<span className="dot w-[3px] h-[3px] mx-[6px] rounded-[50%] inline-block bg-[#6d7583]"></span>
											<span className="font-bold">
												🔥: {view.popularity?.anilist.toLocaleString()}
											</span>
										</div>
										<div>
											<p
												className="max-md:text-center text-left line-clamp-5"
												dangerouslySetInnerHTML={{
													__html: view.description.replace(/<[br]+>/g, " "),
												}}
											></p>
										</div>
										<div className="my-[6px] flex max-md:justify-center">
											<Link to={`/eng/info/${view.id}`} aria-label="WATCH NOW">
												<button
													className="bg-[#F94A29] hover:opacity-70 duration-500 ease-in-out font-bold p-[8px] m-[8px] rounded"
													id="watch-now-btn"
													aria-label="Watch now button"
												>
													WATCH NOW
												</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default AnimeImageSearchLayout
