import { COLLECTIONS } from "../../../constants"
import randomColor from "randomcolor"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./animecollectioncard.css"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"

// import required modules
import { Grid, Pagination } from "swiper"

function AnimeCollectionCard() {
	return (
		<>
			{/* <div className="anime-collection-card-holder"> */}
			<div className="w-100 h-[300px]">
				<Swiper
					slidesPerView="auto"
					grid={{
						rows: 2,
					}}
					spaceBetween={10}
					modules={[Grid]}
					className="collectionSwiper h-100 w-[95%]"
				>
					{COLLECTIONS.map((collection) => (
						<SwiperSlide
							className="collection-card w-[240px] h-[120px] rounded hover:opacity-80 duration-200 ease-in-out"
							key={collection.slug}
							style={{
								background: `${randomColor({
									luminosity: "dark",
									format: "rgba",
									alpha: 0.8,
								})}`,
							}}
						>
							<Link
								to={`/collection/${collection.slug}`}
								className="flex justify-center items-center h-100 w-100"
							>
								<div className="collection-card__title m-[4px]">
									<h4 className="text-[#fff] whitespace-pre-wrap font-bold">
										{collection.name}
									</h4>
								</div>
							</Link>
						</SwiperSlide>
					)).reverse()}
				</Swiper>
			</div>
			{/* </div> */}
		</>
	)
}

export default AnimeCollectionCard
