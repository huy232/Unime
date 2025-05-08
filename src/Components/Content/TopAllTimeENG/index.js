import Image from "../Image"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { SparklesIcon } from "@heroicons/react/24/solid"

const TopAllTimeENG = ({ topAnime, topLoading }) => {
	const statusColorClass = (anime) =>
		clsx({
			"text-teal-500": anime.status === "FINISHED",
			"text-yellow-500": anime.status === "RELEASING",
			"text-gray-500":
				anime.status !== "FINISHED" && anime.status !== "RELEASING",
		})
	return (
		!topLoading && (
			<div className="w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 max-w-[1300px] 2xl:max-w-[85%] mx-auto pb-4">
				<div className="flex items-center flex-col">
					<h1 className="uppercase text-center font-bebas-neue tracking-wider font-black border-b-2 border-yellow-400 mb-2">
						<span className="inline-block skew-x-6">TOP</span>
						<span className="text-[1.1em] text-yellow-400 animate-pulse mx-1">
							ALL
						</span>
						<span className="inline-block -skew-x-6">TIME</span>
					</h1>
					<div className="px-2 md:px-3 lg:px-5 w-full gap-1 scroll-smooth flex flex-col">
						{topAnime.map((anime, index) => {
							const image =
								anime.coverImage.extraLarge ||
								anime.coverImage.large ||
								anime.coverImage.medium ||
								""
							const title =
								anime.title.english ||
								anime.title.romaji ||
								anime.title.userPreferred ||
								anime.title.native
							return (
								<div className="flex items-center smoothie my-1" key={anime.id}>
									<span
										className={`font-bebas-neue flex-grow hidden md:flex items-center justify-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-wide mx-2 w-[2em]`}
										style={{ color: `${anime.coverImage.color}` || "#ffc" }}
									>
										#{index + 1}
									</span>
									<Link
										to={`/eng/info/${anime.id}`}
										className="relative group w-full flex flex-col justify-between p-2 rounded-md overflow-hidden duration-300 ease-linear hover:opacity-80 hover:backdrop-brightness-125 smoothie text-white border-none border-transparent"
										style={{
											backgroundImage: `url(${anime.bannerImage})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
										}}
									>
										<div className="layer-hero backdrop-blur-xs z-0" />
										<div className="w-full flex flex-row gap-3 sm:gap-4 items-center z-10">
											<div className="hidden sm:block aspect-[2/3] w-[90px] min-w-[90px]">
												<Image
													className="duration-500 ease-in-out object-cover w-full h-full rounded"
													src={image}
													alt={title}
												/>
											</div>

											<div className="flex flex-col flex-grow gap-2 lg:gap-1 tracking-wide">
												<p className="font-bebas-neue font-medium text-sm !leading-tight xl:text-base line-clamp-1 tracking-wide xl:tracking-wider">
													<span className="hidden sm:flex items-center gap-1 sm:text-[0.7rem] md:text-[1rem] text-yellow-300">
														<SparklesIcon className="w-4 h-4 inline-block animate-pulse" />
														<span>{anime.popularity}</span>
													</span>
													<span
														style={{
															color: `${anime.coverImage.color}` || "#ffc",
														}}
														className="tracking-wider text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-shadow-strong"
													>
														{title}
													</span>
												</p>
												<div className="flex xl:hidden gap-2 h-[1.5rem] overflow-hidden flex-wrap items-center text-gray-200">
													{anime.genres.slice(0, 3).map((genre, genreIndex) => (
														<span
															key={genreIndex}
															className="bg-white/30 rounded-xl text-[.6rem] text-center whitespace-nowrap font-semibold p-1 px-2 tracking-wider"
														>
															{genre}
														</span>
													))}
												</div>
												<div className="hidden xl:flex gap-2 h-[1.5rem] overflow-hidden flex-wrap items-center text-gray-200">
													{anime.genres.map((genre, genreIndex) => (
														<span
															key={genreIndex}
															className="bg-white/30 rounded-xl text-[.6rem] text-center whitespace-nowrap font-semibold p-1 px-2 tracking-wider"
														>
															{genre}
														</span>
													))}
												</div>
											</div>

											{/* Stats aligned to right */}
											<div className="hidden sm:flex items-center ml-auto text-gray-200 text-xs font-semibold text-shadow-strong">
												<div className="flex gap-2 items-center text-xs font-semibold">
													<div className="transform skew-x-[-12deg] bg-black px-3 py-0.5">
														<span className="block transform skew-x-[12deg] whitespace-nowrap">
															❤ {anime.averageScore}%
														</span>
													</div>
													<div className="transform skew-x-[-12deg] bg-black px-3 py-0.5">
														<span className="block transform skew-x-[12deg] whitespace-nowrap">
															{anime.format}
														</span>
													</div>
													<div
														className={clsx(
															"transform skew-x-[-12deg] bg-black px-3 py-0.5",
															statusColorClass(anime)
														)}
													>
														<span className="block transform skew-x-[12deg] whitespace-nowrap">
															{anime.status}
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="hidden sm:block transition-all duration-300 ease-linear max-h-0 opacity-0 overflow-hidden group-hover:max-h-32 group-hover:opacity-100 z-10 my-2 mx-4 backdrop-blur-sm skew-x-[-12deg] bg-black/80">
											<span
												className="line-clamp-5 text-sm text-white font-medium leading-5 px-3 py-0.5 shadow-sm"
												dangerouslySetInnerHTML={{
													__html: anime.description,
												}}
											/>
										</div>
									</Link>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	)
}
export default TopAllTimeENG
