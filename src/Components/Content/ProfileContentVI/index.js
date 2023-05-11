import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from "../../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons"
import useDocumentTitle from "../../../Hooks/useDocumentTitle"

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

	useDocumentTitle(loading ? "Đang tải" : "Trang cá nhân")
	return (
		<div>
			{loading ? (
				"Loading"
			) : (
				<ul className="pt-4 grid max-md:grid-rows-6 max-lg:grid-rows-4 grid-rows-3 grid-flow-col">
					{data.map((item) => (
						<li
							key={item.id}
							className="flex justify-center flex-col max-w-[400px] m-auto"
							title={item.anime_name}
						>
							<Link to={`/watch/${item.anime_slug}`} className="relative group">
								<img
									className="rounded-t-lg"
									src={item.anime_image}
									alt={item.anime_name}
								/>
								<FontAwesomeIcon
									icon={faPlay}
									className="absolute top-[50%] left-[50%] translate-[-50%] text-[#D21312] w-[20px] h-[20px] opacity-0 group-hover:opacity-100 duration-200 ease-in-out"
								/>
							</Link>
							<Link
								to={`/info/${item.anime_slug.split("?")[0].toString()}`}
								className="py-1.5 text-center bg-black/20 hover:bg-orange-600 duration-200 ease-in-out text-white hover:text-black"
							>
								<FontAwesomeIcon icon={faCircleInfo} />
								<span className="ml-[6px]">Thông tin</span>
							</Link>
							<div className="h-[96px]">
								<p className="line-clamp-2 font-bold text-lg">
									{item.anime_name}
								</p>
								<p className="line-clamp-2 text-slate-300">
									{item.anime_episode}
								</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default ProfileContentVI
