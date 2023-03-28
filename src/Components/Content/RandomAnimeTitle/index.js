import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import ClampedDiv from "../Description"

function RandomAnimeTitle({ randomAnime }) {
	return (
		<>
			<Card>
				<Card.Title className="description-title">
					{randomAnime.name}
				</Card.Title>
				{randomAnime?.banner && (
					<nav>
						<Link
							to={`/info/${randomAnime.slug}`}
							aria-label={randomAnime.slug}
						>
							<Card.Img
								className="today-banner-card-image object-cover"
								variant="bottom"
								src={randomAnime.banner}
								alt={randomAnime.name}
								loading="lazy"
							/>
						</Link>
					</nav>
				)}

				<Card.Body className="description-card h-100 text-left">
					<ClampedDiv>{randomAnime?.description}</ClampedDiv>
				</Card.Body>
				<Card.Footer className="flex items-center w-full">
					<span className="studio-text">
						{randomAnime?.studio && (
							<>
								<span style={{ fontWeight: "700" }}>Studio: </span>
								{randomAnime.studio}
							</>
						)}
					</span>
				</Card.Footer>
			</Card>
		</>
	)
}

export default RandomAnimeTitle
