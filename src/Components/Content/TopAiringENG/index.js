import { useState, useEffect } from "react"
import axios from "axios"
import "./topairing.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import TopAiringENGComp from "../TopAiringENGComp"
import { API } from "../../../constants"

function TopAiringENG() {
	const [loadingAiring, setLoadingAiring] = useState(true)
	const [topAiring, setTopAiring] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getTopAiring = async () => {
			await axios
				.get(`${API}/eng/top-airing`, {
					cancelToken: source.token,
				})
				.then((topAiring) => {
					setTopAiring(topAiring.data.data.results)
					setLoadingAiring(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}
		getTopAiring()
		return () => {
			source.cancel()
		}
	}, [])

	return (
		<div>
			<h1 className="font-black ml-6 mr-6 text-amber-200">POPULAR</h1>
			{loadingAiring ? (
				<div className="w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36">
					<SkeletonTheme baseColor="#202020" highlightColor="#444">
						<Skeleton className="h-[500px]" />
					</SkeletonTheme>
				</div>
			) : (
				<TopAiringENGComp topAiring={topAiring} />
			)}
		</div>
	)
}

export default TopAiringENG
