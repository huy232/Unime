import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import TopAiringVIComp from "../TopAiringVIComp"

function TopAiringVI({ loading, data }) {
	return (
		<>
			{!loading ? (
				<div className="w-full">
					<SkeletonTheme baseColor="#0D0D0D" highlightColor="#444">
						<Skeleton className="h-[320px] md:h-[440px] lg:h-[500px] mb-8" />
					</SkeletonTheme>
				</div>
			) : (
				<TopAiringVIComp data={data} />
			)}
		</>
	)
}

export default TopAiringVI
