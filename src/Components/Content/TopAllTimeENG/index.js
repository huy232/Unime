import Image from "../Image"
import clsx from "clsx"
import { Link } from "react-router-dom"

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
					<h1 className="uppercase text-center font-bebas-neue">
						TOP ALL TIME
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
										className="w-full flex gap-4 justify-between p-2 rounded-md overflow-hidden bg-white/5 hover:brightness-125 hover:bg-white/20 duration-300 ease-in-out"
									>
										<div className="w-full flex gap-3 sm:gap-4 h-full items-center">
											<div className="aspect-[2/3] w-[90px] min-w-[90px]">
												<Image
													className="duration-500 ease-in-out object-cover w-full h-full rounded"
													src={image}
													alt={title}
												/>
											</div>
											<div className="flex flex-col flex-grow gap-2 lg:gap-1 tracking-wide">
												<p
													className="font-bebas-neue font-medium text-sm !leading-tight xl:text-base line-clamp-1 tracking-wide xl:tracking-wider"
													style={{
														color: `${anime.coverImage.color}` || "#ffc",
													}}
												>
													{title}
												</p>
												<div className="flex xl:hidden gap-2 h-[1.5rem] overflow-hidden flex-wrap items-center flex-shrink text-gray-200">
													{anime.genres.slice(0, 3).map((genre, genreIndex) => (
														<span
															key={genreIndex}
															className="bg-white/30 rounded-xl text-[.6rem] text-center whitespace-nowrap flex-shrink font-semibold p-1 px-2 tracking-wider"
														>
															{genre}
														</span>
													))}
												</div>
												<div className="hidden xl:flex gap-2 h-[1.5rem] overflow-hidden flex-wrap items-center flex-shrink text-gray-200">
													{anime.genres.map((genre, genreIndex) => (
														<span
															key={genreIndex}
															className="bg-white/30 rounded-xl text-[.6rem] text-center whitespace-nowrap flex-shrink font-semibold p-1 px-2 tracking-wider"
														>
															{genre}
														</span>
													))}
												</div>
											</div>
										</div>
										<div className="w-full hidden sm:flex items-center text-gray-200">
											<div className="flex items-center justify-between ml-auto gap-4 w-full">
												<div className="flex text-sm">
													❤ {anime.averageScore}%
												</div>
												<div className="flex flex-col text-xs">
													{anime.format}
												</div>
												<div className="flex flex-col text-xs">
													<span className={statusColorClass(anime)}>
														{anime.status}
													</span>
												</div>
											</div>
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
