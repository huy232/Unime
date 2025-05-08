import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Lazy } from "swiper"
import { Link } from "react-router-dom"
import Image from "../Image"
import AnimeSkeleton from "../AnimeSkeleton"
import StatusBadge from "../StatusBadge"
import "./currentseason.css"

const CurrentSeason = ({ currentSeason, loadingCurrentSeason }) => {
	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-left text-[#B80000] max-sm:text-center uppercase font-bebas-neue tracking-wider">
				Current season
			</h1>
			{loadingCurrentSeason ? (
				<AnimeSkeleton />
			) : (
				<div className="px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
					<Swiper
						slidesPerView="auto"
						spaceBetween={10}
						className="current-season-swiper w-full"
						pagination={{
							type: "progressbar",
						}}
						modules={[Lazy]}
						lazy={true}
						preloadImages={false}
					>
						{currentSeason.map((anime, i) => (
							<SwiperSlide key={i}>
								<Link
									to={`/eng/info/${anime.id}`}
									title={
										anime.title.english ||
										anime.title.romaji ||
										anime.title.native ||
										anime.title.userPreferred
									}
									key={anime.id}
									aria-label={anime.id}
								>
									<div className="group select-none cursor-pointer">
										<div className="aspect-[2/3] group-hover:opacity-80 duration-500 ease-in-out relative group-hover:scale-90">
											<Image
												className="object-fill object-center w-full h-full linear absolute"
												src={
													anime.image ||
													anime.coverImage.extraLarge ||
													anime.coverImage.large ||
													anime.coverImage.medium ||
													""
												}
												alt={
													anime.title.english ||
													anime.title.romaji ||
													anime.title.native ||
													anime.title.userPreferred
												}
												loading="lazy"
											/>
											{anime.averageScore && (
												<StatusBadge
													position="top-0 right-0"
													className="rounded bg-black font-semibold"
												>
													<span className="text-[0.6rem]">
														{anime.averageScore}
													</span>
													/💯
												</StatusBadge>
											)}
											{anime.format && (
												<StatusBadge
													position="bottom-0 right-0"
													className="rounded bg-black font-bold"
												>
													{anime.format}
												</StatusBadge>
											)}
											{anime.status && (
												<StatusBadge
													position="bottom-0 left-0"
													status={anime.status}
													className="rounded bg-black font-semibold"
												>
													{anime.status}
												</StatusBadge>
											)}
											{anime.countryOfOrigin && (
												<StatusBadge
													position="top-0 left-0"
													className="rounded bg-black font-bold"
												>
													{anime.countryOfOrigin}
												</StatusBadge>
											)}
										</div>
										<div>
											<p
												className="line-clamp-2 font-semibold"
												style={{
													color:
														anime.coverImage?.color || anime?.color || "#fffc",
												}}
											>
												{anime.title.english ||
													anime.title.romaji ||
													anime.title.native ||
													anime.title.userPreferred}
											</p>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}
		</div>
	)
}
export default CurrentSeason
