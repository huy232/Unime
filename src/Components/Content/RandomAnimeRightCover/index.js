import Skeleton from "@mui/material/Skeleton"
import { Link } from "react-router-dom"
import Image from "../Image"

function RandomAnimeRightCover({ randomAnime }) {
	return (
		<>
			<div className="image-box">
				{!randomAnime?.cover ? (
					<Skeleton
						className="aspect-[2/3]"
						variant="rectangular"
						width="100%"
						animation="wave"
						sx={{ bgcolor: "grey.900" }}
					/>
				) : (
					<Link to={`/info/${randomAnime.slug}`} aria-label={randomAnime.slug}>
						<Image
							src={
								randomAnime.cover?.extraLarge ||
								randomAnime.cover?.large ||
								randomAnime.cover?.medium ||
								""
							}
							className="today-cover-image w-full h-auto object-fill aspect-[2/3] duration-500 ease-in-out hover:opacity-80"
							alt={randomAnime.title.english}
							loading="lazy"
						/>
					</Link>
				)}
				<div className="title-box text-left flex flex-col">
					<span className="english" style={{ color: "#f6d365" }}>
						{randomAnime.title?.english && (
							<>
								<span style={{ fontWeight: "700" }}>ANH: </span>
								{randomAnime.title?.english}
							</>
						)}
					</span>
					<span className="native" style={{ color: "#d4fc79" }}>
						{randomAnime.title?.native && (
							<>
								<span style={{ fontWeight: "700" }}>NHẬT: </span>
								{randomAnime.title?.native}
							</>
						)}
					</span>
					<span className="romaji" style={{ color: "#fa709a" }}>
						{randomAnime.title?.romaji && (
							<>
								<span style={{ fontWeight: "700" }}>ROMAJI: </span>
								{randomAnime.title?.romaji}
							</>
						)}
					</span>
				</div>
			</div>
		</>
	)
}

export default RandomAnimeRightCover
