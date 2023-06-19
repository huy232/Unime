import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from "../../../constants"
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
									<ul className="pt-4 grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
										{data.map((item) => (
											<li
												key={item.id}
												title={item.anime_name}
												className="flex z-40"
											>
												<Link to={item.anime_slug}>
													<div className="hover:opacity-80 duration-200 ease-in-out w-[160px]">
														<img
															className="aspect-[2/3] w-full"
															src={item.anime_image}
															alt={item.anime_name}
															loading="lazy"
														/>
													</div>
												</Link>
												<div className="w-full mx-[6px]">
													<div className="h-[70px]">
														<Link
															to={item.anime_slug}
															className="line-clamp-2 font-black mb-[4px] hover:opacity-80 duration-200 ease-in-out"
															style={{ color: item.anime_color || "#FFFC" }}
														>
															{item.anime_name}
														</Link>
													</div>
													<div className="flex mx-[8px]">
														<p className="border rounded text-white px-[2px] text-sm">
															{item.type}
														</p>
														<p className="border rounded mx-[4px] text-white px-[2px] text-sm">
															{item.status}
														</p>
													</div>
													<div className="h-[50px] mx-[10px]">
														<p className="line-clamp-2 text-white/40 text-sm mt-1">
															{item.current_watch}
														</p>
													</div>

													<div className="flex items-end">
														<Link
															className="rounded bg-orange-600 p-[4px] mx-[8px] mt-[6px] inline-block z-50 hover:opacity-80 duration-200 ease-in-out text-white"
															to={item.current_slug}
														>
															Wacth
														</Link>
													</div>
												</div>
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
