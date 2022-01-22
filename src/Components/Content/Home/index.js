import { useEffect, useState } from "react"
import { BsEyeFill } from "react-icons/bs"
import "./home.css"
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, { Pagination, Navigation } from "swiper"
SwiperCore.use([Pagination, Navigation])

// ---------------------------

function Home({ instance }) {
	const [sliders, setSliders] = useState([])
	const [done, setDone] = useState(false)

	const getSlide = async () => {
		const { data } = await instance.get("/slide")
		setSliders(data.data)
		setDone(true)
	}

	useEffect(() => {
		getSlide()
	}, [])

	return (
		<>
			<Swiper
				slidesPerView={1}
				pagination={{
					type: "progressbar",
				}}
				navigation={true}
				className="mySwiper"
			>
				{sliders.map((slider) => (
					<SwiperSlide key={slider.slug}>
						<div className="inner">
							<img src={slider.thumbnail} />
						</div>
						<div className="bottom-left">
							<h3>{slider.name}</h3>
							<p>
								<BsEyeFill /> {slider.views}
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default Home
