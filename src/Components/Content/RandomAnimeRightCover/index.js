/* eslint-disable jsx-a11y/alt-text */
import Skeleton from "@mui/material/Skeleton"
import { Link } from "react-router-dom"
import DescriptionSkeleton from "../DescriptionSkeleton"

function RandomAnimeRightCover({ randomAnime }) {
	return (
		<>
			<div className="image-box">
				{!randomAnime?.CoverImg ? (
					<Skeleton
						variant="rectangular"
						width="100%"
						style={{ minHeight: "300px", maxHeight: "300px" }}
						animation="wave"
						sx={{ bgcolor: "grey.900" }}
					/>
				) : (
					<nav>
						<Link to={`/info/${randomAnime?.Slug}`}>
							<img
								src={
									randomAnime?.CoverImg?.large ||
									randomAnime?.CoverImg?.medium ||
									randomAnime?.CoverImg?.small
								}
								style={{
									width: "100%",
									height: "auto",
									objectFit: "fill",
								}}
								className="today-cover-image"
							/>
						</Link>
					</nav>
				)}

				<div
					className="title-box"
					style={{ display: "flex", flexDirection: "column" }}
				>
					<span className="english" style={{ color: "#f6d365" }}>
						{!randomAnime?.AnimeAllTitle ? (
							<DescriptionSkeleton />
						) : (
							<>
								<span style={{ fontWeight: "700" }}>ANH:</span>{" "}
								{randomAnime?.AnimeAllTitle?.english}
							</>
						)}
					</span>
					<span className="native" style={{ color: "#d4fc79" }}>
						{!randomAnime?.AnimeAllTitle ? (
							<DescriptionSkeleton />
						) : (
							<>
								<span style={{ fontWeight: "700" }}>NHẬT:</span>{" "}
								{randomAnime?.AnimeAllTitle?.native}
							</>
						)}
					</span>
					<span className="romaji" style={{ color: "#fa709a" }}>
						{!randomAnime?.AnimeAllTitle ? (
							<DescriptionSkeleton />
						) : (
							<>
								<span style={{ fontWeight: "700" }}>ROMAJI:</span>{" "}
								{randomAnime?.AnimeAllTitle?.romaji}
							</>
						)}
					</span>
				</div>
			</div>
		</>
	)
}

export default RandomAnimeRightCover
