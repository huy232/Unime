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
import Image from "../Image"

function ProfileContentVI({ userId }) {
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
				.post(`${API}/vi/get-history?page=${page}`, { userId: userId })
				.then((response) => {
					setData(response.data.data)
					if (response.data.success) {
						const { page, data, totalPage } = response.data.data
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
	}, [lang, navigate, page, userId])

	const handlePageClick = (event) => {
		setPage(event.selected + 1)
	}
	const executeScroll = () => scrollToRef.current.scrollIntoView()

	useDocumentTitle(loading ? "Đang tải" : "Trang cá nhân")
	return (
		<div>
			<h2 className="font-black mx-1 pt-2 max-md:text-center" ref={scrollToRef}>
				ĐÃ TỪNG XEM
			</h2>
			{!loading && (
				<>
					{data.length > 0 ? (
						<>
							<ul className="pt-4 grid max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 grid-cols-4 gap-4">
								{data.map((item) => (
									<li
										key={item.id}
										className="flex justify-center flex-col m-auto w-[320px]"
										title={item.anime_name}
									>
										<Link
											to={`/watch/${item.anime_slug}`}
											className="relative group"
										>
											<Image
												className="rounded-t-lg aspect-[16/9] w-[320px]"
												src={item.anime_image}
												alt={item.anime_name}
												loading="lazy"
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
										<div className="bg-neutral-900 p-2 rounded-b-lg">
											<p className="line-clamp-2 font-bold text-lg leading-6 h-[3rem]">
												{item.anime_name}
											</p>
											<div className="mt-1 bg-stone-700/40 rounded p-1">
												<p className="line-clamp-2 text-slate-300 text-sm leading-6 h-[3rem]">
													{item.anime_episode}
												</p>
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
						<div className="text-center">Bạn chưa xem phim nào cả.</div>
					)}
				</>
			)}
		</div>
	)
}

export default ProfileContentVI
