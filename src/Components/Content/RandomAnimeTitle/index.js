import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import ClampedDiv from "../Description"

function RandomAnimeTitle({ randomAnime }) {
	return (
		<>
			<Card>
				<Card.Title
					className="description-title"
					style={{ color: `${randomAnime.cover.color || "#ffc"}` }}
				>
					{randomAnime.title.romaji ||
						randomAnime.name.english ||
						randomAnime.name ||
						randomAnime.userPreferred}
				</Card.Title>
				{randomAnime?.banner && (
					<nav>
						<Link
							to={`/info/${randomAnime.slug}`}
							aria-label={randomAnime.slug}
						>
							<Card.Img
								className="today-banner-card-image object-cover hover:opacity-80 rounded-t-md"
								variant="bottom"
								src={randomAnime.banner}
								alt={randomAnime.name}
								loading="lazy"
								style={{
									opacity: 0,
									transition: "opacity 0.5s ease-in-out",
								}}
								onLoad={(e) => {
									e.target.style.opacity = 1
								}}
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
