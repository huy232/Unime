import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import DescriptionSkeleton from "../DescriptionSkeleton"

function RandomAnimeTitle({ randomAnime }) {
	return (
		<>
			<Card>
				<Card.Title className="description-title">
					{randomAnime?.AnimeName}
				</Card.Title>
				{randomAnime?.BannerImg && (
					<nav>
						<Link
							to={`/info/${randomAnime?.Slug}`}
							aria-label={randomAnime?.Slug}
						>
							<Card.Img
								className="today-banner-card-image"
								variant="bottom"
								src={randomAnime?.BannerImg}
								style={{
									height: "400px",
									objectFit: "cover",
								}}
								alt={randomAnime.AnimeName}
								loading="lazy"
							/>
						</Link>
					</nav>
				)}

				<Card.Body className="description-card h-100">
					<div className="line-clamp-5 h-100">{randomAnime?.Description}</div>
				</Card.Body>

				<Card.Footer
					style={{
						display: "flex",
						alignItems: "center",
						width: "100%",
						maxWidth: "100%",
					}}
				>
					<span className="studio-text">
						{!randomAnime?.Studio ? (
							<DescriptionSkeleton />
						) : (
							<>
								<span style={{ fontWeight: "700" }}>Studio: </span>
								{randomAnime?.Studio}
							</>
						)}
					</span>
				</Card.Footer>
			</Card>
		</>
	)
}

export default RandomAnimeTitle
