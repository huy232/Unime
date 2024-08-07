import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Link } from "react-router-dom"
import { Lazy } from "swiper"
import Image from "../Image"
import StatusBadge from "../StatusBadge"

function TrendingAnimeENGComp({ trendingAnime }) {
	return (
		<div className="popular-anime-container px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
			<Swiper
				slidesPerView="auto"
				spaceBetween={10}
				className="popular-anime-swiper w-full"
				pagination={{
					type: "progressbar",
				}}
				modules={[Lazy]}
				lazy={true}
				preloadImages={false}
			>
				{trendingAnime.map((anime, i) => (
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
							<div className="group popular-anime-holder select-none cursor-pointer">
								<div className="popular-anime-image aspect-[2/3] group-hover:opacity-80 ease-in-out relative group-hover:scale-90 duration-500">
									<Image
										className="object-fill object-center w-full h-full duration-500 linear absolute"
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
								<div className="popular-anime-title">
									<p
										className="line-clamp-2 font-semibold"
										style={{
											color: anime.coverImage?.color || anime?.color || "#fffc",
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
			<div className="text-right mt-[24px]">
				<Link
					to="/eng/trending"
					className="browse-button hover:text-[#fffc] font-semibold"
					style={{ "--c": "#F94A29" }}
					aria-label="MORE"
				>
					MORE...
				</Link>
			</div>
		</div>
	)
}

export default TrendingAnimeENGComp
