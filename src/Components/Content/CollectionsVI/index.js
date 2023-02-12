import React from "react"
import AnimeCollectionCard from "../AnimeCollectionCard"

function CollectionsVI() {
	return (
		<div className="anime-collection mt-[40px]">
			<div className="center-title">
				<div className="anime-collection-titleholder">
					<h1
						className="anime-collection-heading font-black"
						style={{ marginBottom: "42px" }}
					>
						BỘ SƯU TẬP
					</h1>
				</div>
				<AnimeCollectionCard />
			</div>
		</div>
	)
}

export default CollectionsVI
