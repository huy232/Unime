import AiringScheduleENGComp from "../AiringScheduleENGComp"

function AiringScheduleENG({ loadingAiringSchedule, airingSchedule }) {
	return (
		<>
			{!loadingAiringSchedule && airingSchedule && (
				<AiringScheduleENGComp airingSchedule={airingSchedule} />
			)}
		</>
	)
}

export default AiringScheduleENG
