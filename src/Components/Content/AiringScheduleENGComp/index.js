import clsx from "clsx"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Image from "../Image"
import { formatDateTime } from "../../../Utilities/formatDayTime"
function AiringScheduleENGComp({ airingSchedule }) {
	const [selectedDay, setSelectedDay] = useState(null)
	const [currentTime, setCurrentTime] = useState(new Date())

	const handleDayClick = (day) => {
		setSelectedDay(day)
	}
	useEffect(() => {
		// Set the initial selected day to the current day
		const currentDay = new Date().getDay()
		const days = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		]
		const initialSelectedDay = days[currentDay]
		setSelectedDay(initialSelectedDay)

		const intervalId = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	const buttonClassName = (day) =>
		clsx(
			"uppercase rounded border-2 border-transparent duration-300 ease-in-out hover:opacity-80 flex-shrink-0 items-center"
		)

	const selectedDayClassName = (day) =>
		clsx("border-transparent border-2 my-2 mt-auto opacity-50", {
			"border-t-white border-b-white opacity-100 text-white":
				selectedDay === day,
		})

	return (
		<div className="w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 max-w-[1300px] 2xl:max-w-[85%] mx-auto pb-4">
			<div className="flex items-center flex-col">
				<h1 className="mb-2 uppercase font-black text-[#B99B6B] max-md:text-center font-bebas-neue text-3xl">
					Estimated Schedule
				</h1>
				<span className="bg-white/30 rounded p-1 mb-3">
					{formatDateTime(currentTime)}
				</span>
				<div className="flex w-full relative overflow-x-auto justify-center">
					{Object.keys(airingSchedule).map((day, index) => (
						<button
							className={buttonClassName(day)}
							key={day}
							onClick={() => handleDayClick(day)}
						>
							<div className="w-fit mx-auto flex flex-col items-center justify-center p-1 text-xs md:text-xl font-popin font-bold tracking-wide !uppercase smoothie text-white">
								<span className={selectedDayClassName(day)}>
									{day.slice(0, 3)}
								</span>
							</div>
						</button>
					))}
				</div>

				{selectedDay && (
					<div className="px-2 md:px-3 lg:px-5 w-full gap-1 scroll-smooth min-h-[28rem] max-h-[60rem] lg:max-h-[22.4rem] flex flex-col overflow-y-scroll scrollbar-hide">
						{airingSchedule[selectedDay].map((item, index) => {
							const title =
								item.title.english ||
								item.title.romaji ||
								item.title.userPreferred ||
								item.title.native
							return (
								<Link
									to={`/eng/info/${item.id}`}
									key={index}
									className="bg-white/5 w-full p-2 lg:px-5 2xl:px-16 hover:brightness-[1.2] flex-shrink-0 smoothie tracking-wide flex items-center justify-between rounded-md text-white hover:bg-white/20 duration-300 ease-in-out"
								>
									<div className="flex gap-2">
										<div className="hidden md:flex flex-col items-center w-[50px] gap-2">
											<p className="font-black">
												{new Date(item.airingAt * 1000).toLocaleString(
													"en-US",
													{
														hour: "2-digit",
														minute: "2-digit",
														hour12: false,
													}
												)}
											</p>
											<p className="text-white/40">{item.countryOfOrigin}</p>
										</div>
										<div className="flex items-center gap-2">
											<div className="aspect-2/3 w-[50px] h-[75px] relative flex-shrink-0">
												<Image
													className="w-full h-full rounded bg-white/10 duration-500 ease-in-out"
													src={item.coverImage}
													alt="Image"
												/>
											</div>
											<div className="flex flex-col !flex-shrink flex-grow gap-2 lg:gap-1 text-gray-100 tracking-wide">
												<span
													className="font-medium pr-1 text-sm !leading-tight xl:text-base line-clamp-2 tracking-wide xl:tracking-wider"
													style={{ color: item.color || "#ffc" }}
												>
													{title}
												</span>
												<div className="flex xl:hidden gap-2 h-[1.5rem] overflow-hidden flex-wrap items-center flex-shrink">
													{item.genres.slice(0, 3).map((genre, genreIndex) => (
														<span
															key={genreIndex}
															className="bg-white/30 rounded-xl text-[.6rem] text-center whitespace-nowrap flex-shrink font-semibold p-1 px-2 tracking-wider"
														>
															{genre}
														</span>
													))}
												</div>
												<div className="hidden xl:flex gap-2 h-[1.5rem] overflow-hidden flex-wrap items-center flex-shrink">
													{item.genres.map((genre, genreIndex) => (
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
									</div>
									<div className="ml-auto flex items-center">
										{item.rating.anilist && (
											<div className="hidden xl:flex">
												<p className="mx-2 text-slate-300 text-xs">
													{item.rating.anilist}/10 ❤
												</p>
											</div>
										)}
										<div className="hidden sm:flex">
											<p className="bg-black rounded-lg p-1 my-2 w-[120px] text-center text-xs">
												Episode {item.airingEpisode}
											</p>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default AiringScheduleENGComp
