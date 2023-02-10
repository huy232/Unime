import { Skeleton } from "@mui/material"
import React from "react"

function AnimeInfoBannerENG({ loading, info }) {
	return (
		<div
			className={`${
				loading ? "banner-anime-overlay-skeleton" : "banner-anime-overlay"
			}`}
		>
			<div className="banner-anime-image">
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
						<img
							src={info?.cover || ""}
							className="banner-info-image"
							alt=""
							style={
								info?.cover === null || typeof info?.cover === "undefined"
									? { minHeight: "auto" }
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

export default AnimeInfoBannerENG
