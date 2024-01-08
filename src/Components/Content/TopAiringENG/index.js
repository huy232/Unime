import "./topairing.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import TopAiringENGComp from "../TopAiringENGComp"

function TopAiringENG({ loadingAiring, topAiring }) {
	return (
		<div className="mt-2">
			<h1 className="font-black ml-6 mr-6 text-amber-200 font-bebas-neue">
				POPULAR
			</h1>
			{loadingAiring ? (
				<div className="h-[44vh] sm:h-[77vh] lg:h-[85vh] z-0 relative aspect-[3/1]">
					<SkeletonTheme baseColor="#202020" highlightColor="#444">
						<Skeleton className="h-[44vh] sm:h-[77vh] lg:h-[85vh]" />
					</SkeletonTheme>
				</div>
			) : (
				<TopAiringENGComp topAiring={topAiring} />
			)}
		</div>
	)
}

export default TopAiringENG
