import "./topairing.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import TopAiringENGComp from "../TopAiringENGComp"

function TopAiringENG({ loadingAiring, topAiring }) {
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
