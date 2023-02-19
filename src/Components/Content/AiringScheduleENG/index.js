import AiringScheduleENGComp from "../AiringScheduleENGComp"

function AiringScheduleENG({ loadingAiringSchedule, airingSchedule }) {
	return (
		<>
			{!loadingAiringSchedule && airingSchedule.length > 0 && (
				<AiringScheduleENGComp airingSchedule={airingSchedule} />
			)}
		</>
	)
}

export default AiringScheduleENG
