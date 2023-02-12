import { useEffect, useState } from "react"
import axios from "axios"

import { API } from "../../../constants"
import AiringScheduleENGComp from "../AiringScheduleENGComp"

function AiringScheduleENG() {
	const [loadingAiringSchedule, setLoadingAiringSchedule] = useState(true)
	const [airingSchedule, setAiringSchedule] = useState([])

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getAiringSchedule = async () => {
			await axios
				.get(`${API}/eng/schedule`, {
					cancelToken: source.token,
				})
				.then((scheduleAnime) => {
					setAiringSchedule(scheduleAnime.data.data.results)
					setLoadingAiringSchedule(false)
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getAiringSchedule()

		return () => {
			source.cancel()
		}
	}, [])

	return (
		<>
			{!loadingAiringSchedule && (
				<AiringScheduleENGComp airingSchedule={airingSchedule} />
			)}
		</>
	)
}

export default AiringScheduleENG
