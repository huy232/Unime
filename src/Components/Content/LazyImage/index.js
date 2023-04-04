import React from "react"
import blackBackground from "../../../Utilities/img/black.webp"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { CONSUMET_CORS } from "../../../constants"
function LazyImage({ page, provider }) {
	return (
		<>
			<LazyLoadImage
				className="h-full"
				src={
					provider === "mangareader"
						? page.img
						: `${CONSUMET_CORS}url=${page.img}&referer=${page?.headerForImage?.Referer}`
				}
				alt={page.title}
				placeholderSrc={blackBackground}
				effect={"opacity"}
				threshold={700}
			/>
		</>
	)
}

export default LazyImage
