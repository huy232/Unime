import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import clsx from "clsx"

function YearSeasonSelector({
	years,
	seasonOptions,
	year,
	setYear,
	season,
	setSeason,
}) {
	const handleYearClick = (selectedYear) => {
		setYear(selectedYear)
	}

	const handleSeasonClick = (selectedSeason) => {
		setSeason(selectedSeason)
	}

	return (
		<div className="space-y-4 w-full">
			<div className="overflow-x-auto">
				<div className="w-fit mx-auto whitespace-nowrap">
					{years.map((y) => (
						<button
							onClick={() => handleYearClick(y)}
							className={clsx(
								`px-4 py-2 rounded mx-[6px] my-[4px] hover:brightness-125 hover:scale-110 hover:opacity-80 duration-300 ease-linear`,
								y === year ? "bg-slate-400 text-black" : "bg-[#5f5f5f29]"
							)}
							key={y}
						>
							{y}
						</button>
					))}
				</div>
			</div>
			<div className="overflow-x-auto">
				<div className="w-fit mx-auto whitespace-nowrap">
					{seasonOptions.map((s) => (
						<button
							key={s}
							onClick={() => handleSeasonClick(s)}
							className={clsx(
								`px-2 py-2 rounded inline-block hover:scale-110 hover:opacity-80 duration-300 ease-linear hover:text-white font-bebas-neue font-bold text-2xl w-fit`,
								s === season
									? "text-yellow-500 -skew-x-6 underline"
									: "text-slate-400"
							)}
						>
							{s}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default YearSeasonSelector
