import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation, Mousewheel, Lazy } from "swiper"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
SwiperCore.use([Pagination, Navigation, Mousewheel, Lazy])

function AnimeSkeletonENG() {
	return (
		<>
			<div className="px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
				<SkeletonTheme baseColor="#202020" highlightColor="#444">
					<Swiper
						slidesPerView="auto"
						spaceBetween={10}
						className="skeleton-anime-swiper w-100"
						pagination={{
							type: "progressbar",
						}}
					>
						{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
							<SwiperSlide key={i}>
								<div className="h-[420px] w-[240px]">
									<Skeleton
										height={340}
										className="skeleton-image w-[240px] h-[340px]"
									/>
									<Skeleton height={46} className="skeleton-title mt-[8px]" />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</SkeletonTheme>
			</div>
		</>
	)
}

export default AnimeSkeletonENG
