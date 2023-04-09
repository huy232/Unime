import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

function MangaLayoutSkeleton({ number = 21 }) {
	return (
		<>
			<SkeletonTheme baseColor="#202020" highlightColor="#444">
				<h1
					className={`ml-6 mr-6 mt-2 border-b-4 border-white max-sm:text-center`}
				>
					<Skeleton />
				</h1>
				<div className="manga-container md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
					<div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
						{[...Array(number).keys()].map((i) => (
							<div
								className="mx-[4px] mb-[12px] relative float-left group"
								key={i}
							>
								<Skeleton className="pb-[156%] mb-0 w-full relative overflow-hidden rounded-[4px] duration-500 ease-in-out scale-100" />
								<div className="h-[60px] w-full mt-[4px]">
									<Skeleton className="text-xs leading-none p-0 m-0 duration-500 ease-in-out scale-100" />
								</div>
							</div>
						))}
					</div>
				</div>
			</SkeletonTheme>
		</>
	)
}

export default MangaLayoutSkeleton
