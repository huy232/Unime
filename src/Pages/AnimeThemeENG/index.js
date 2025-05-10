import { useEffect, useRef, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import { API, COLORLIST } from "../../constants"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import SwiperCore, { Mousewheel } from "swiper"
import { Skeleton } from "../../Components/Content/Skeleton" // 👈 update this import if needed
import YearSeasonSelector from "./YearSeasonSelector"
import ThemeVideo from "./ThemeVideo"

SwiperCore.use([Mousewheel])

const allSeasons = ["WINTER", "SPRING", "SUMMER", "FALL"]
const getCurrentSeasonIndex = () => Math.floor(dayjs().month() / 3)

export default function AnimeThemeENG() {
	const now = dayjs()
	const currentYear = now.year()
	const currentSeasonIndex = getCurrentSeasonIndex()
	const currentSeason = allSeasons[currentSeasonIndex]

	const [year, setYear] = useState(currentYear)
	const [season, setSeason] = useState(currentSeason)
	const [animeTheme, setAnimeTheme] = useState([])
	const [loading, setLoading] = useState(false)

	const [outerIndex, setOuterIndex] = useState(0)
	const [innerIndices, setInnerIndices] = useState({})
	const [swiperReady, setSwiperReady] = useState(false)

	const outerSwiperRef = useRef(null)
	const innerSwiperRefs = useRef({})

	const years = Array.from({ length: 11 }, (_, i) => currentYear - i)
	const seasonOptions =
		year === currentYear
			? allSeasons.slice(0, currentSeasonIndex + 1)
			: allSeasons

	useEffect(() => {
		const fetchThemes = async () => {
			try {
				setLoading(true)
				setSwiperReady(false)
				const res = await axios.get(`${API}/eng/season-theme`, {
					params: { year, season },
				})
				setAnimeTheme(res.data.data || [])
			} catch (err) {
				console.error("Failed to fetch themes:", err.message)
				setAnimeTheme([])
			} finally {
				setLoading(false)
			}
		}
		fetchThemes()
	}, [year, season])

	useEffect(() => {
		const timer = setTimeout(() => setSwiperReady(true), 50)
		return () => clearTimeout(timer)
	}, [animeTheme])

	const updateInnerIndex = (animeId, index) => {
		setInnerIndices((prev) => ({ ...prev, [animeId]: index }))
	}

	const isCurrentOuter = (i) => swiperReady && i === outerIndex
	const isCurrentInner = (animeId, idx) => innerIndices[animeId] === idx

	return (
		<div className="mx-8 sm:mx-12 md:mx-24 lg:mx-36 mb-8">
			<h1 className="uppercase text-center font-bebas-neue tracking-wider font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400 mb-2">
				<span className="block">SEASONAL THEME</span>
				<span className="inline">
					<span className="text-cyan-400">OP</span>/
					<span className="text-orange-400">ED</span>
				</span>
			</h1>

			<div className="mb-2 flex w-full justify-center items-center">
				<YearSeasonSelector
					years={years}
					seasonOptions={seasonOptions}
					year={year}
					setYear={setYear}
					season={season}
					setSeason={setSeason}
				/>
			</div>

			{loading ? (
				<div className="space-y-4">
					<Skeleton className="w-full h-[48px] rounded" />
					<Skeleton className="w-full h-[50svh] rounded" />
				</div>
			) : animeTheme.length > 0 ? (
				<Swiper
					direction="horizontal"
					slidesPerView={1}
					spaceBetween={20}
					mousewheel={true}
					onSlideChange={(swiper) => setOuterIndex(swiper.activeIndex)}
					onSwiper={(swiper) => {
						outerSwiperRef.current = swiper
						setOuterIndex(swiper.activeIndex)
					}}
					className="w-full h-[200px] sm:h-[40svh] md:h-[50svh] lg:h-[60svh] xl:h-[70svh]"
				>
					{animeTheme.map((anime, i) => (
						<SwiperSlide key={anime.id}>
							<div className="h-full flex flex-col">
								<p
									className="line-clamp-2 font-bold font-bebas-neue text-base md:text-xl lg:text-2xl xl:text-3xl mb-2 tracking-wider w-full md:w-4/5 mx-auto text-center"
									style={{ color: COLORLIST[i] }}
								>
									{anime.name}
								</p>
								<div className="flex-1 flex items-center justify-center overflow-hidden">
									<Swiper
										direction="vertical"
										slidesPerView={1}
										spaceBetween={10}
										mousewheel={true}
										onSlideChange={(swiper) =>
											updateInnerIndex(anime.id, swiper.activeIndex)
										}
										onSwiper={(swiper) => {
											innerSwiperRefs.current[anime.id] = swiper
											updateInnerIndex(anime.id, swiper.activeIndex)
										}}
										className="w-full h-full"
									>
										{anime.themes.map((theme, idx) => (
											<SwiperSlide
												key={theme.id}
												className="flex flex-col items-center gap-2 justify-center"
											>
												{isCurrentOuter(i) &&
												isCurrentInner(anime.id, idx) &&
												Math.abs(outerIndex - i) <= 1 ? (
													<ThemeVideo src={theme.videoUrl} />
												) : (
													<Skeleton className="w-full md:aspect-[3/1] lg:aspect-[3/1] rounded-lg overflow-hidden" />
												)}
												<span className="hidden md:block top-4 left-4 px-2 py-1 mx-2 text-xl uppercase tracking-wider font-knewave absolute backdrop-blur-md bg-black [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.6)] skew-x-[-12deg]">
													{theme.type === "OP" ? "Opening" : "Ending"}
												</span>
											</SwiperSlide>
										))}
										<div className="hidden md:block md:absolute bottom-4 right-4 w-[320px] lg:w-[520px] xl:w-[720px] backdrop-blur-sm [text-shadow:_0_2px_4px_rgb(0_0_0_/_0.6)] skew-x-[-12deg] bg-black px-3 py-0.5 p-1 z-10">
											<p className="text-sm line-clamp-3">{anime.synopsis}</p>
										</div>
									</Swiper>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<p className="font-bebas-neue text-center text-xl italic uppercase">
					No themes found
				</p>
			)}
		</div>
	)
}
