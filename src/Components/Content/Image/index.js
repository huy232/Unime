import React, { useState } from "react"
import blackImage from "../../../Utilities/img/black.webp"

const Image = (props) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	const handleImageLoad = () => {
		setImageLoaded(true)
	}

	const imageStyle = {
		opacity: imageLoaded ? 1 : 0,
	}

	return (
		<img
			src={props?.src}
			alt={props?.alt}
			onLoad={handleImageLoad}
			style={imageStyle}
			placeholder={blackImage}
			{...props}
		/>
	)
}

export default Image
