import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from "../../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faPlay } from "@fortawesome/free-solid-svg-icons"
import ReactPaginate from "react-paginate"
import useDocumentTitle from "../../../Hooks/useDocumentTitle"
import { useRef } from "react"

function ProfileContentENG({ userId }) {
	const navigate = useNavigate()
	const [profileParams] = useSearchParams()
	const lang = profileParams.get("lang")
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [totalPage, setTotalPage] = useState(1)
	const scrollToRef = useRef(null)
	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const getProfileData = async () => {
			await axios
				.post(`${API}/get-history?page=${page}`, { userId: userId })
				.then((response) => {
					setData(response.data.data)
					if (response.data.success) {
						const { page, data } = response.data.data
						setPage(parseInt(page))
						setTotalPage(totalPage)
						setData(data)
						setLoading(false)
					}
				})
		}

		getProfileData()
		return () => {
			source.cancel()
		}
	}, [lang, navigate, page, userId, totalPage])

	const handlePageClick = (event) => {
		setPage(event.selected + 1)
	}
	const executeScroll = () => scrollToRef.current.scrollIntoView()

	useDocumentTitle(loading ? "Loading" : "Profile")

	return (
		<>
			{!loading && (
				<div>
					<h2
						className="font-black mx-1 pt-2 max-md:text-center"
						ref={scrollToRef}
					>
						WATCHED
					</h2>
					{!loading && (
						<>
							{data.length > 0 ? (
								<>
									<ul className="pt-4">
										{data.map((item) => (
											<li key={item.id} className="" title={item.anime_name}>
												<Link to={item.current_slug} className="flex">
													<div className="aspect-[2/3]">
														<img
															className="w-[160px]"
															src={item.anime_image}
															alt={item.anime_name}
														/>
													</div>
													<div className="w-full mx-[4px]">
														<p
															className="line-clamp-2 font-black mb-[4px]"
															style={{ color: item.anime_color || "#FFFC" }}
														>
															{item.anime_name}
														</p>
														<div className="flex">
															<p className="border rounded text-white px-[2px] text-sm">
																{item.type}
															</p>
															<p className="border rounded mx-[4px] text-white px-[2px] text-sm">
																{item.status}
															</p>
														</div>
														<p className="line-clamp-2 text-white/40 text-sm mt-1">
															{item.current_watch}
														</p>
													</div>
												</Link>
											</li>
										))}
									</ul>
									<ReactPaginate
										nextLabel=">"
										onPageChange={handlePageClick}
										pageRangeDisplayed={3}
										marginPagesDisplayed={2}
										pageCount={totalPage}
										previousLabel="<"
										pageClassName="page-item"
										pageLinkClassName="page-link text-white focus:shadow-none bg-white/20 border-none"
										previousClassName="page-item"
										previousLinkClassName="page-link focus:shadow-none bg-white/20 border-none"
										nextClassName="page-item"
										nextLinkClassName="page-link focus:shadow-none bg-white/20 border-none"
										breakLabel="..."
										breakClassName="page-item"
										breakLinkClassName="page-link focus:shadow-none bg-white/20 border-none"
										containerClassName="pagination flex justify-center items-center py-4"
										activeClassName="active bg-yellow-800"
										renderOnZeroPageCount={null}
										onClick={() => executeScroll()}
									/>
								</>
							) : (
								<div className="text-center">
									You haven't watched any anime.
								</div>
							)}
						</>
					)}
				</div>
			)}
		</>
	)
}

export default ProfileContentENG
