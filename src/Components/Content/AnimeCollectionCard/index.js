import { COLLECTIONS } from "../../../constants"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./animecollectioncard.css"

function AnimeCollectionCard() {
	return (
		<>
			<div className="anime-collection-card-holder">
				{COLLECTIONS.map((collection) => (
					<div className="collection-card" key={collection.slug}>
						<Nav.Link as={Link} to={`/collection/${collection.slug}`}>
							<div className="collection-card__title">
								<h4>{collection.name}</h4>
							</div>
						</Nav.Link>
					</div>
				))}
			</div>
		</>
	)
}

export default AnimeCollectionCard
