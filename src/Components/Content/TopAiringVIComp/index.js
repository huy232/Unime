import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import { Pagination, Autoplay, Lazy } from "swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { toSlug } from "../../../Utilities/toSlug"
import { COLORLIST } from "../../../constants"

function TopAiringVIComp({ data }) {
	return (
		<Swiper
			pagination={{
				clickable: true,
			}}
			modules={[Pagination, Autoplay, Lazy]}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			centeredSlides={true}
			spaceBetween={10}
			loop={true}
			className="top-airing-swiper h-[500px] w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 mb-8"
			slidesPerView={1}
			preloadImages={false}
			lazy={true}
		>
			{data.map((item, i) => (
				<SwiperSlide key={i}>
					<div
						style={{ backgroundImage: `url(${item.banner})` }}
						className={`bg-cover bg-center h-full w-full bg-no-repeat rounded overflow-hidden`}
						loading="lazy"
					>
						<div className="banner__overlay h-full w-full flex items-center">
							<div className="w-3/5 max-lg:w-full ml-[40px] max-sm:mx-0 max-sm:px-[30px] flex flex-col justify-center h-100">
								<Link
									to={`/info/${item.slug}`}
									className="hover:opacity-80 duration-200 ease-in-out"
									style={{
										color: COLORLIST[i] || "#fffc",
										textShadow: `3px 3px 3px rgba(0,0,0,1)`,
									}}
									aria-label={item.slug}
								>
									<h2
										className="airing-info-main-title line-clamp-3 uppercase font-bold text-3xl max-lg:text-base"
										title={item.title}
									>
										{item.title}
									</h2>
								</Link>
								<p className="text-[#fffc] flex items-center">
									<FontAwesomeIcon
										icon={faEye}
										className="pr-[4px] h-[14px] w-[14px] mt-[2px]"
									/>
									{item.views}
								</p>
								<div className="airing-button hidden max-lg:inline-block mt-[20px]">
									<Link
										className="p-[6px] bg-orange-600 rounded hover:opacity-80 duration-200 hover:bg-neutral-800 ease-linear cursor-pointer"
										to={`/info/${item.slug}`}
										aria-label={item.slug}
									>
										XEM NGAY
									</Link>
								</div>
							</div>
							<div className="overlay__trigger max-lg:hidden w-2/5 h-fit flex justify-center items-center">
								<Link to={`/info/${item.slug}`} aria-label={item.slug}>
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
	)
}

export default TopAiringVIComp
