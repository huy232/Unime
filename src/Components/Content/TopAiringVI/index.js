import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import TopAiringVIComp from "../TopAiringVIComp"

function TopAiringVI({ loading, data }) {
	return (
		<>
			{!loading ? (
				<div className="w-full">
					<SkeletonTheme baseColor="#202020" highlightColor="#444">
						<Skeleton className="h-[500px]" />
					</SkeletonTheme>
				</div>
			) : (
				<TopAiringVIComp data={data} />
			)}
		</>
	)
}

export default TopAiringVI
