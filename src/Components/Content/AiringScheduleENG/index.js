import AiringScheduleENGComp from "../AiringScheduleENGComp"

function AiringScheduleENG({ loadingAiringSchedule, airingSchedule }) {
	return (
		<>
			{!loadingAiringSchedule && (
				<AiringScheduleENGComp airingSchedule={airingSchedule} />
			)}
		</>
	)
}

export default AiringScheduleENG
