import React from "react"
import AnimeCollectionCard from "../AnimeCollectionCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { API } from "../../../constants"

function CollectionsVI() {
	const [loadingCollections, setLoadingCollections] = useState(true)
	const [collections, setCollections] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getCollectionsList = async () => {
			await axios
				.get(`${API}/collections`)
				.then((data) => {
					if (data.data.success) {
						setCollections(data.data.data)
						setLoadingCollections(false)
					}
				})
				.catch((thrown) => {
					setCollections([])
					setLoadingCollections(true)
					if (axios.isCancel(thrown)) return
				})
		}

		getCollectionsList()
		return () => {
			source.cancel()
		}
	}, [])

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
				{!loadingCollections && (
					<AnimeCollectionCard collections={collections} />
				)}
			</div>
		</div>
	)
}

export default CollectionsVI
