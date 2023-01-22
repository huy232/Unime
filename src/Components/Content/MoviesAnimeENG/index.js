import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide, Navigation } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "./movieanime.css"
import AnimeSkeletonENG from "../AnimeSkeletonENG"
import { Link } from "react-router-dom"

function MoviesAnimeENG({ moviesAnime, loadingMovies }) {
	return (
		<div>
			<h1 className="font-black ml-6 mr-6 mt-2 border-b-4 border-white text-rose-500">
				MOVIES
			</h1>
			{loadingMovies ? (
				<AnimeSkeletonENG />
			) : (
				<div className="movies-anime-container px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
					<Swiper
						slidesPerView="auto"
						spaceBetween={10}
						className="movies-anime-swiper w-100"
						pagination={{
							type: "progressbar",
						}}
					>
						{moviesAnime.map((anime, i) => (
							<SwiperSlide key={i}>
								<Link
									to={`/eng/info/${anime.animeId}`}
									title={anime.animeTitle}
									key={anime.animeId}
								>
									<div
										className="group movies-anime-holder select-none cursor-pointer"
										title={anime.animeTitle}
									>
										<div className="movies-anime-image w-[240px] h-[340px] group-hover:opacity-80 duration-200 ease-in-out relative">
											<img
												className="object-cover object-center w-100 h-100 group-hover:scale-90 duration-500 linear absolute"
												src={anime.animeImg}
												alt=""
											/>
										</div>
										<div className="movies-anime-title">
											<p className="text-amber-300 line-clamp-2 font-medium">
												{anime.animeTitle}
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

export default MoviesAnimeENG
