import { Skeleton } from "@mui/material"
import React from "react"

function AnimeInfoBoxENG({ loading, info }) {
	return (
		<div className="w-[30vw]">
			<div className="info-image flex justify-center mt-[-5rem] mb-[20px]">
				{loading ? (
					<Skeleton
						variant="rectangular"
						width="160px"
						height="226px"
						animation="wave"
						sx={{ bgcolor: "grey.900" }}
						style={{ marginLeft: "auto", marginRight: "auto" }}
					/>
				) : (
					<img
						src={
							info.anilist?.cover?.large ||
							info.anilist?.cover?.medium ||
							info.anilist?.cover?.small ||
							info.image
						}
						className="cover-image w-[180px] h-[260px]"
						alt=""
					/>
				)}
			</div>
			<div className="text-right [&>*]:mx-[60px] [&>*]:my-[0]">
				{info.anilist?.format && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							FORMAT
						</h5>
						<p>{info.anilist?.format}</p>
					</div>
				)}
				{info.anilist?.title && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							TITLE
						</h5>
						{info.anilist?.title?.romaji && (
							<h6>
								ROMAJI
								<p>{info.anilist?.title?.romaji}</p>
							</h6>
						)}
						{info.anilist?.title?.english && (
							<h6>
								ENGLISH
								<p>{info.anilist?.title?.english}</p>
							</h6>
						)}
						{info.anilist?.title?.native && (
							<h6>
								NATIVE
								<p>{info.anilist?.title?.native}</p>
							</h6>
						)}
					</div>
				)}
				{info.anilist?.source && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							SOURCE
						</h5>
						<p>{info.anilist?.source}</p>
					</div>
				)}
				{info.anilist?.popularity && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							POPULARITY
						</h5>
						<p>{info.anilist?.popularity.toLocaleString()}</p>
					</div>
				)}
				{info.anilist?.favourites && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							FAVOURITES
						</h5>
						<p>{info.anilist?.favourites.toLocaleString()}</p>
					</div>
				)}
				{info.anilist?.trending && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							TRENDING
						</h5>
						<p>{info.anilist?.trending.toLocaleString()}</p>
					</div>
				)}
				{info.anilist?.studio && (
					<>
						<div>
							<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
								STUDIO
							</h5>
							<p>
								{info.anilist?.studio.map((studio, i, arr) =>
									i !== arr.length - 1
										? `${studio.name + ", "}`
										: `${studio.name}`
								)}
							</p>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default AnimeInfoBoxENG
