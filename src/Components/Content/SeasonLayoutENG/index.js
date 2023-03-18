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
					<div className="flex flex-row space-evenly w-full px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 pb-12">
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
