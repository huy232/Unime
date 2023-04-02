import React from "react"
// import blackBackground from "../../../Utilities/img/black.webp"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useState } from "react"
function LazyImage({ src, title, page }) {
	const [loading, setLoading] = useState("blur")
	return (
		<>
			<LazyLoadImage
				className="mx-auto object-fit h-[100vh]"
				src={src}
				alt={title}
				key={page}
				placeholderSrc={src}
				effect={loading}
				beforeLoad={() => setLoading("blur")}
				afterLoad={() => setLoading("")}
			/>
		</>
	)
}

export default LazyImage
