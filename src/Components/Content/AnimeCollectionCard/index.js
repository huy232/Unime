import { COLLECTIONS } from "../../../constants"
import randomColor from "randomcolor"
import { Link } from "react-router-dom"
import "./animecollectioncard.css"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/grid"
import "swiper/css/pagination"

// import required modules
import { Grid } from "swiper"

function AnimeCollectionCard() {
	return (
		<>
			{/* <div className="anime-collection-card-holder"> */}
			<div className="w-full h-[300px]">
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
							className="collection-card mx-[20px] my-[10px] w-[240px] h-[120px] bg-[#222] rounded"
							key={collection.slug}
						>
							<Link
								to={`/collection/${collection.slug}`}
								className="flex justify-center items-center h-100 w-full hover:opacity-40 duration-200 ease-in-out rounded p-[4px]"
								style={{
									background: `${randomColor({
										luminosity: "dark",
										format: "rgb",
										alpha: 0.8,
									})}`,
								}}
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
