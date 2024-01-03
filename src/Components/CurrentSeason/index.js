import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Lazy } from "swiper"
import { Link } from "react-router-dom"
import Image from "../Content/Image"
import AnimeSkeleton from "../Content/AnimeSkeleton"
import "./currentseason.css"

const CurrentSeason = ({ currentSeason, loadingCurrentSeason }) => {
	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-left text-[#B80000] max-sm:text-center uppercase font-bebas-neue">
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
										<div className="aspect-[2/3] group-hover:opacity-80 duration-200 ease-in-out relative">
											<Image
												className="object-fill object-center w-full h-full group-hover:scale-90 duration-500 linear absolute"
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
