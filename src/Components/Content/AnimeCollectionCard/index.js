import { COLLECTIONS, COLLECTION_COLOR } from "../../../constants"
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
			<div className="w-full h-[340px]">
				<Swiper
					slidesPerView="auto"
					grid={{
						rows: 2,
					}}
					spaceBetween={10}
					modules={[Grid]}
					className="collectionSwiper h-100 w-[95%]"
				>
					{COLLECTIONS.map((collection, i) => (
						<SwiperSlide
							className="collection-card mx-[20px] my-[10px] w-[260px] h-[140px] bg-[#222] rounded"
							key={collection.slug}
						>
							<Link
								to={`/collection/${collection.slug}`}
								className="flex justify-center items-center h-100 w-full hover:opacity-40 duration-200 ease-in-out rounded p-[4px]"
								style={{
									background: `${COLLECTION_COLOR[i]}`,
								}}
							>
								<div className="collection-card__title m-[4px]">
									<h4 className="text-[#191919] whitespace-pre-wrap font-bold uppercase">
										{collection.name}
									</h4>
								</div>
							</Link>
						</SwiperSlide>
					)).reverse()}
				</Swiper>
			</div>
		</>
	)
}

export default AnimeCollectionCard
