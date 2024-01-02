import { Skeleton } from "@mui/material"
import React from "react"
import Image from "../Image"

function InfoBannerENG({ loading, info }) {
	return (
		<div
			className={`${
				loading ? "banner-image-overlay-skeleton" : "banner-image-overlay"
			}`}
		>
			<div className="banner-image">
				{loading ? (
					<Skeleton
						variant="rectangular"
						width="100%"
						height="450px"
						animation="wave"
						sx={{ bgcolor: "grey.900" }}
					/>
				) : (
					<>
						<Image
							src={info?.cover || info?.bannerImage || ""}
							className="banner-info-image duration-500 ease-in-out"
							alt={
								info?.name ||
								info?.title?.english ||
								info?.title?.romaji ||
								info?.title?.native
							}
							style={
								info?.cover === null || typeof info?.cover === "undefined"
									? { minHeight: "-webkit-fill-available" }
									: {}
							}
							loading="lazy"
						/>
						<div className="banner-overlay"></div>
					</>
				)}
			</div>
		</div>
	)
}

export default InfoBannerENG
