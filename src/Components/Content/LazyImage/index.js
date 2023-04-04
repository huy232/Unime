import React from "react"
import blackBackground from "../../../Utilities/img/black.webp"
import { LazyLoadImage } from "react-lazy-load-image-component"
function LazyImage({ src, title, page }) {
	return (
		<>
			<LazyLoadImage
				className="h-full"
				src={src}
				alt={title}
				placeholderSrc={blackBackground}
				effect={"opacity"}
				threshold={700}
			/>
		</>
	)
}

export default LazyImage
