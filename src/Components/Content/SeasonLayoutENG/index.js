import React from "react"
import SeasonHolderENG from "../SeasonHolderENG"

function SeasonLayoutENG({ data, loading }) {
	return (
		<>
			{!loading && (
				<>
					<h1 className="font-black ml-6 mr-6 mt-2 border-white text-left text-violet-500 max-sm:text-center pb-2">
						UPCOMING SEASON
					</h1>
					<div className="grid gap-0 2xl:grid-cols-4 xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full md:px-4 lg:px-8 xl:px-12 2xl:px-16 pb-12">
						<SeasonHolderENG
							anime={data.spring.media}
							title={"SPRING"}
							color={"#BE6DB7"}
						/>
						<SeasonHolderENG
							anime={data.summer.media}
							title={"SUMMER"}
							color={"#F77E21"}
						/>
						<SeasonHolderENG
							anime={data.fall.media}
							title={"FALL"}
							color={"#85586F"}
						/>
						<SeasonHolderENG
							anime={data.winter.media}
							title={"WINTER"}
							color={"#3E54AC"}
						/>
					</div>
				</>
			)}
		</>
	)
}

export default SeasonLayoutENG
