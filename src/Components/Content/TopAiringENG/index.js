import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "./topairing.css"
import { Pagination } from "swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { Link } from "react-router-dom"
import { toSlug } from "../../../Utilities/toSlug"

function TopAiringENG({ topAiring, loadingAiring }) {
	return (
		<div>
			<h1 className="font-black ml-6 mr-6 text-amber-200">POPULAR</h1>
			{loadingAiring ? (
				<div className="w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36">
					<SkeletonTheme baseColor="#202020" highlightColor="#444">
						<Skeleton className="h-[500px]" />
					</SkeletonTheme>
				</div>
			) : (
				<Swiper
					direction={"vertical"}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="top-airing-swiper h-[500px] w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full"
					slidesPerView={1}
				>
					{topAiring.map((item, i) => (
						<SwiperSlide key={i}>
							<div
								style={{ backgroundImage: `url(${item.cover})` }}
								className={`bg-cover bg-center h-full w-full bg-no-repeat rounded overflow-hidden`}
							>
								<div className="banner__overlay h-full w-full flex items-center">
									<div className="w-3/5 max-lg:w-full ml-[40px] max-sm:mx-0 max-sm:px-[30px] flex flex-col justify-center h-100">
										<Link
											to={`/eng/info/${item.id}`}
											className="hover:opacity-80 duration-200 ease-in-out"
										>
											<h2
												className="airing-info-main-title line-clamp-3 uppercase font-bold text-3xl max-lg:text-base"
												title={
													item.title.english ||
													item.title.romaji ||
													item.title.native ||
													item.title.userPreferred
												}
											>
												{item.title.english ||
													item.title.romaji ||
													item.title.native ||
													item.title.userPreferred}
											</h2>
										</Link>
										<div className="airing-info-genres flex flex-wrap my-[20px] max-lg:my-[4px]">
											{item.genres.map((genre, i) => (
												<Link
													to={`/eng/anime/${toSlug(genre)}`}
													className="hover:opacity-80 duration-200 ease-in-out genre inline p-[4px] m-[4px] first:ml-0 rounded text-gray-50 max-lg:text-xs"
													key={i}
												>
													{genre}
												</Link>
											))}
										</div>
										<div
											className="airing-info-description line-clamp-5 font-semibold text-base max-lg:text-xs"
											style={{
												color: "#fff",
												textShadow:
													"0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black",
											}}
											dangerouslySetInnerHTML={{
												__html: item.description?.replace(/<[br]+>/g, ""),
											}}
										></div>
										<div className="airing-info-status text-gray-50 mt-[20px] max-lg:text-xs max-lg:mt-[10px]">
											STATUS:{" "}
											<span className="rounded p-[4px] mt-[4px]">
												{item.status}
											</span>
										</div>
										<div className="airing-button hidden max-lg:inline-block mt-[20px]">
											<Link
												className="p-[6px] bg-orange-600 rounded hover:opacity-80 duration-200 hover:bg-neutral-800 ease-linear cursor-pointer"
												to={`/eng/info/${item.id}`}
											>
												PLAY NOW
											</Link>
										</div>
									</div>
									<div className="overlay__trigger max-lg:hidden w-2/5 h-fit flex justify-center items-center">
										<Link to={`/eng/info/${item.id}`}>
											<FontAwesomeIcon
												icon={faPlayCircle}
												className="w-16 h-16 rounded-full border-neutral-100 border-2 p-[1%] hover:border-transparent duration-200 ease-linear hover:text-orange-800 cursor-pointer"
											/>
										</Link>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	)
}

export default TopAiringENG
