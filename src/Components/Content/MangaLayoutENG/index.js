import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import { Lazy } from "swiper"
import { Link } from "react-router-dom"
import "./mangalayout.css"

function MangaLayoutENG({ content, loading, headingTitle }) {
	const preset = {
		POPULAR: "text-right text-[#FF8B13]",
		TRENDING: "text-left text-[#865DFF]",
		MANHWA: "text-left text-[#FCE700]",
	}
	return (
		<>
			{loading ? (
				"Loading"
			) : (
				<>
					<h1
						className={`font-black ${preset[headingTitle]} ml-6 mr-6 mt-2 border-b-4 border-white max-sm:text-center`}
					>
						{headingTitle}
					</h1>
					<div className="manga-container px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
						<Swiper
							modules={[Lazy]}
							lazy={true}
							preloadImages={false}
							slidesPerView="auto"
							spaceBetween={10}
							className="manga-swiper w-full"
							pagination={{
								type: "progressbar",
							}}
						>
							{content.map((manga, i) => (
								<SwiperSlide key={i}>
									<Link
										to={`/eng/info/${manga.id}`}
										title={
											manga.title.english ||
											manga.title.romaji ||
											manga.title.native ||
											manga.userPreferred
										}
										key={manga.id}
										aria-label={
											manga.title.english ||
											manga.title.romaji ||
											manga.title.native ||
											manga.userPreferred
										}
									>
										<div className="group manga-holder select-none cursor-pointer">
											<div className="manga-image aspect-[0.7] group-hover:opacity-80 duration-200 ease-in-out relative">
												<img
													className="object-fill object-center w-full h-full group-hover:scale-90 duration-500 linear absolute"
													src={
														manga.coverImage.extraLarge ||
														manga.coverImage.large ||
														manga.coverImage.medium
													}
													alt={
														manga.title.english ||
														manga.title.romaji ||
														manga.title.native ||
														manga.userPreferred
													}
													loading="lazy"
												/>
												<div className="absolute group-hover:scale-90 duration-500 linear text-right w-full h-full">
													<p className="inline-block mt-[4px] mr-[4px] p-[4px] bg-neutral-500/75 text-white rounded">
														❤ {manga.averageScore}%
													</p>
												</div>
											</div>
											<div className="mx-[4px]">
												<div className="flex flex-row items-center h-[40px]">
													<p>{manga.status}</p>
													{manga.chapters && (
														<p className="inline-block ml-auto p-[4px] bg-stone-900 text-white">
															{manga.chapters}. chapters
														</p>
													)}
												</div>
												<div className="manga-title flex flex-row items-center mt-[6px]">
													<p
														className="line-clamp-2 font-semibold"
														style={{
															color: `${manga.coverImage.color || "#fffc"}`,
														}}
													>
														{manga.title.english ||
															manga.title.romaji ||
															manga.title.native ||
															manga.userPreferred}
													</p>
													<p className="inline-block mr-[4px] ml-auto py-[2x] px-[6px] text-white rounded border-solid border-2">
														{manga.countryOfOrigin}
													</p>
												</div>
											</div>
										</div>
									</Link>
								</SwiperSlide>
							))}
						</Swiper>
						<div className="text-right mt-[24px]">
							<Link
								to="/eng/"
								className="browse-button hover:text-[#fffc] font-semibold"
								style={{ "--c": "#301E67" }}
							>
								MORE...
							</Link>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default MangaLayoutENG
