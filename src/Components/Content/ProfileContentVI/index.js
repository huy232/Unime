import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from "../../../constants"

function ProfileContentVI({ userId }) {
	const navigate = useNavigate()
	const [profileParams] = useSearchParams()
	const lang = profileParams.get("lang")
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getProfileData = async () => {
			await axios
				.post(`${API}/vi/get-history?page=${page}`, { userId: userId })
				.then((response) => {
					setData(response.data.data)
					if (response.data.success) {
						const { page, data } = response.data.data
						console.log(page, data)
						setPage(parseInt(page))
						setData(data)
						setLoading(false)
					}
				})
		}

		getProfileData()
		return () => {
			source.cancel()
		}
	}, [lang, navigate, page, userId])
	return (
		<div>
			{loading ? (
				"Loading"
			) : (
				<ul className="pt-4 grid max-md:grid-rows-6 max-lg:grid-rows-4 grid-rows-3 grid-flow-col gap-4">
					{data.map((item) => (
						<li
							key={item.id}
							className="flex justify-center flex-col items-center"
						>
							<div className="">
								<img
									className="rounded-t-lg"
									src={item.anime_image}
									alt={item.anime_name}
								/>
							</div>
							<div className="h-[48px]">
								<p className="line-clamp-2 bg-black/40">{item.anime_episode}</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default ProfileContentVI
