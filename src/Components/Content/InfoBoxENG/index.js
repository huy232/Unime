import { Skeleton } from "@mui/material"
import React from "react"

function InfoBoxENG({ loading, info }) {
	return (
		<div className="w-[30vw] max-lg:w-full">
			<div className="info-image flex justify-center mt-[-5rem] mb-[20px]">
				{loading ? (
					<Skeleton
						variant="rectangular"
						width="200px"
						height="300px"
						animation="wave"
						sx={{ bgcolor: "grey.900" }}
						style={{ marginLeft: "auto", marginRight: "auto" }}
					/>
				) : (
					<img
						src={info.image}
						className="cover-image aspect-[2/3] h-[300px]"
						alt={
							info.title?.english || info.title?.romaji || info.title?.native
						}
						loading="lazy"
					/>
				)}
			</div>
			<div className="text-right [&>*]:mx-[60px] [&>*]:my-[0] max-lg:text-center">
				{!loading && (
					<>
						{info.type && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded">
									FORMAT
								</h5>
								<p className="mb-[6px]">{info?.type}</p>
							</div>
						)}
						{info.title && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded">
									TITLE
								</h5>
								{info?.title?.romaji && (
									<h6>
										ROMAJI
										<p className="mb-[6px]">{info?.title?.romaji}</p>
									</h6>
								)}
								{info?.title?.english && (
									<h6>
										ENGLISH
										<p className="mb-[6px]">{info?.title?.english}</p>
									</h6>
								)}
								{info?.title?.native && (
									<h6>
										NATIVE
										<p className="mb-[6px]">{info?.title?.native}</p>
									</h6>
								)}
							</div>
						)}
						{info.status && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded">
									STATUS
								</h5>
								<p className="mb-[6px]">{info?.status}</p>
							</div>
						)}
						{!!info.popularity && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded">
									POPULARITY
								</h5>
								<p className="mb-[6px]">{info?.popularity.toLocaleString()}</p>
							</div>
						)}
						{info.rating && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded">
									RATING
								</h5>
								<p className="mb-[6px]">{info?.rating}%</p>
							</div>
						)}
						{info.subOrDub && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded">
									VOICE
								</h5>
								<p className="uppercase mb-[6px]">{info?.subOrDub}</p>
							</div>
						)}
						{info.season && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded">
									SEASON
								</h5>
								<p className="uppercase mb-[6px]">{info?.season}</p>
							</div>
						)}
						{info.studios && (
							<>
								<div>
									<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded">
										STUDIO
									</h5>
									<p className="mb-[6px]">
										{info?.studios.map((studio, i, arr) =>
											i !== arr.length - 1 ? `${studio + ", "}` : `${studio}`
										)}
									</p>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default InfoBoxENG
