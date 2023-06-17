import React from "react"
import blackBackground from "../../../Utilities/img/black.webp"
import { LazyLoadImage } from "react-lazy-load-image-component"
function LazyImage({ page, provider }) {
	return (
		<>
			<LazyLoadImage
				className="aspect-[2/3]"
				src={page.img}
				alt={page.title}
				placeholderSrc={blackBackground}
				effect={"opacity"}
				threshold={700}
			/>
		</>
	)
}

export default LazyImage
