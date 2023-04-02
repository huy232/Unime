import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

function ChapterSkeleton() {
	return (
		<>
			<div className="text-center">
				<SkeletonTheme baseColor="#202020" highlightColor="#444">
					{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
						<div className="aspect-[2/3]" key={i}>
							<Skeleton className="skeleton-image sm:w-[50vw] w-full h-full" />
						</div>
					))}
				</SkeletonTheme>
			</div>
		</>
	)
}

export default ChapterSkeleton
