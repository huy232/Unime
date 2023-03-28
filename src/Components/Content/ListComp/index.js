import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import { Lazy } from "swiper"
import { Link } from "react-router-dom"
import { COLORLIST } from "../../../constants"

function ListComp({ data }) {
	return (
		<div className="recent-anime-container px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
			<Swiper
				modules={[Lazy]}
				lazy={true}
				preloadImages={false}
				slidesPerView="auto"
				spaceBetween={10}
				className="recent-anime-swiper w-full"
				pagination={{
					type: "progressbar",
				}}
			>
				{data.map((anime, i) => (
					<SwiperSlide key={i}>
						<Link
							to={`/info/${anime.slug}`}
							title={anime.name}
							key={anime.slug}
							aria-label={anime.name}
						>
							<div className="group recent-anime-holder select-none cursor-pointer">
								<div className="recent-anime-image aspect-[0.7] group-hover:opacity-80 duration-200 ease-in-out relative">
									<img
										className="object-fill object-center w-full h-full group-hover:scale-90 duration-500 linear absolute"
										src={anime.thumbnail}
										alt={anime.name}
										loading="lazy"
									/>
									{!!anime?.episode && (
										<div className="absolute group-hover:scale-90 duration-500 linear text-right w-full h-full">
											<p className="inline-block mt-[4px] mr-[4px] p-[4px] bg-neutral-500/75 text-white rounded">
												{anime.episode}
											</p>
										</div>
									)}
									{!!anime?.status && (
										<div className="absolute group-hover:scale-90 duration-500 linear inset-x-0 bottom-0 w-full text-center bg-black/80">
											<p className="text-[#ff0000] text-sm font-bold">
												{anime.status}
											</p>
										</div>
									)}
								</div>
								<div className="recent-anime-title">
									<p
										className="line-clamp-2 font-semibold h-[60px]"
										style={{ color: `${COLORLIST[i] || "#fffc"}` }}
									>
										{anime.name}
									</p>
									<p className="text-[#fffc]">{anime.views}</p>
								</div>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
			{/* <div className="text-right mt-[24px]">
				<Link
					to="/movies"
					className="browse-button hover:text-[#fffc] font-semibold"
					style={{ "--c": "#301E67" }}
				>
					XEM THÊM...
				</Link>
			</div> */}
		</div>
	)
}

export default ListComp
