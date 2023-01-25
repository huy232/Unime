import { Skeleton } from "@mui/material"
import React from "react"

function AnimeInfoBoxENG({ loading, info }) {
	return (
		<div className="w-[30vw] max-lg:w-full">
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
						src={info.image}
						className="cover-image w-[180px] h-[260px]"
						alt=""
					/>
				)}
			</div>
			<div className="text-right [&>*]:mx-[60px] [&>*]:my-[0] max-lg:text-center">
				{info?.type && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							FORMAT
						</h5>
						<p>{info?.type}</p>
					</div>
				)}
				{info?.title && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							TITLE
						</h5>
						{info?.title?.romaji && (
							<h6>
								ROMAJI
								<p>{info?.title?.romaji}</p>
							</h6>
						)}
						{info?.title?.english && (
							<h6>
								ENGLISH
								<p>{info?.title?.english}</p>
							</h6>
						)}
						{info?.title?.native && (
							<h6>
								NATIVE
								<p>{info?.title?.native}</p>
							</h6>
						)}
					</div>
				)}
				{info?.popularity && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							POPULARITY
						</h5>
						<p>{info?.popularity.toLocaleString()}</p>
					</div>
				)}
				{info?.rating && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							RATING
						</h5>
						<p>{info?.rating}%</p>
					</div>
				)}
				{info?.subOrDub && (
					<div>
						<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
							VOICE
						</h5>
						<p className="uppercase">{info?.subOrDub}</p>
					</div>
				)}
				{info?.studios && (
					<>
						<div>
							<h5 className="font-black p-[6px] bg-[#282828]/[0.8] inline-block rounded">
								STUDIO
							</h5>
							<p>
								{info?.studios.map((studio, i, arr) =>
									i !== arr.length - 1 ? `${studio + ", "}` : `${studio}`
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
