import { Skeleton } from "@mui/material"
import React from "react"
import Image from "../Image"
import { Link } from "react-router-dom"

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
					<Image
						src={info?.image || info?.coverImage || ""}
						className="cover-image aspect-[2/3] h-[300px] duration-500 ease-in-out"
						alt={
							info.title?.english || info.title?.romaji || info.title?.native
						}
						loading="lazy"
					/>
				)}
			</div>
			<div className="flex flex-col justify-center max-lg:flex-row text-right max-lg:text-center max-lg:overflow-x-scroll [&>div]:lg:mx-4 [&>div]:max-lg:shrink-0 [&>div]:max-lg:flex-col [&>div]:max-lg:flex-nowrap [&>div]:max-lg:mx-2">
				{!loading && (
					<>
						{info.type && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									FORMAT
								</h5>
								<p className="mb-[6px]">{info?.type}</p>
							</div>
						)}
						{info.title && (
							<div className="hidden lg:block">
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
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
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									STATUS
								</h5>
								<p className="mb-[6px]">{info?.status}</p>
							</div>
						)}
						{!!info.popularity.anilist && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									POPULARITY
								</h5>
								<p className="mb-[6px]">
									{info?.popularity.anilist.toLocaleString()}
								</p>
							</div>
						)}
						{info.rating?.anilist && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									RATING
								</h5>
								<p className="mb-[6px]">{info.rating?.anilist}/10</p>
							</div>
						)}
						{info.subOrDub && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									VOICE
								</h5>
								<p className="uppercase mb-[6px]">{info?.subOrDub}</p>
							</div>
						)}
						{info.season && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									SEASON
								</h5>
								<p className="uppercase mb-[6px]">{info?.season}</p>
							</div>
						)}
						{info.studios && (
							<div>
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									STUDIO
								</h5>
								<p className="mb-[6px]">
									{info?.studios.map((studio, i, arr) =>
										i !== arr.length - 1 ? `${studio + ", "}` : `${studio}`
									)}
								</p>
							</div>
						)}
						{info.synonyms?.length > 0 && (
							<div className="hidden lg:block">
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									SYNONYMS
								</h5>
								<p className="mb-[6px] flex flex-col gap-1 text-sm mx-2">
									{info.synonyms.map((synonym, i) => (
										<span key={i}>{synonym}</span>
									))}
								</p>
							</div>
						)}
						{info.tags?.length > 0 && (
							<div className="hidden lg:block">
								<h5 className="font-black my-[2px] p-[6px] bg-[#282828]/[0.8] inline-block rounded font-bebas-neue text-xl">
									TAGS
								</h5>
								<div className="mb-[6px] flex flex-col gap-1 text-sm mx-2">
									{info.tags.map((tag, i) => (
										<Link to={`/eng/tag/${encodeURIComponent(tag)}`} key={i}>
											{tag}
										</Link>
									))}
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default InfoBoxENG
