import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component"
import LoadingSpin from "react-loading-spin"
import { Link } from "react-router-dom"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import { API } from "../../constants"
import Image from "../../Components/Content/Image"

const PAGE_NUMBER = 1

function AnimeSearchENG() {
	const [loading, setLoading] = useState(true)
	const [searchResult, setSearchResult] = useState([])
	const [hasNextPage, setHasNextPage] = useState(true)
	let [page, setPage] = useState(PAGE_NUMBER)
	const { query } = useParams()
	const prevQuery = useRef({ query, page: 1 })

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		if (prevQuery.current.query !== query) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			page = PAGE_NUMBER
		}
		const getSearchResult = async () => {
			axios
				.get(`${API}/eng/search/${query}?page=${page}`, {
					cancelToken: source.token,
				})
				.then((response) => {
					if (response.data.success && response.data?.data) {
						if (prevQuery.current.query !== query) {
							prevQuery.current.query = query
							setSearchResult(response.data.data.results)
						} else {
							setSearchResult((prev) => {
								return [...new Set([...prev, ...response.data.data.results])]
							})
						}
						setHasNextPage(response.data.data.hasNextPage)
						setLoading(false)
					} else {
						if (response.data?.data) {
							setSearchResult((prev) => {
								return [...new Set([...prev, ...response.data.data.results])]
							})
						}
						setLoading(false)
					}
				})
				.catch((thrown) => {
					setLoading(false)
					if (axios.isCancel(thrown)) return
				})
		}

		getSearchResult()
		return () => {
			source.cancel()
		}
	}, [query, page])

	const scrollThreshold = () => {
		const newPage = page + 1
		setPage(newPage)
	}

	useDocumentTitle("Search - Unime")

	return (
		<div>
			<h1 className="font-black font-bebas-neue text-[#d3d9] text-center">
				SEARCH
			</h1>
			{loading ? (
				<div className="block w-full mt-[50px] text-center">
					<LoadingSpin primaryColor="red" />
				</div>
			) : searchResult.length === 0 ? (
				<p>There are no anime you're are looking for...</p>
			) : (
				<InfiniteScroll
					initialScrollY={0}
					style={{ overflow: "none" }}
					dataLength={searchResult.length}
					scrollThreshold={0.9}
					next={scrollThreshold}
					hasMore={hasNextPage}
					loader={
						<div className="loading-spin mt-0">
							<LoadingSpin primaryColor="red" />
						</div>
					}
				>
					<div className="search-container md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
						{searchResult.map((item, i) => (
							<Link
								to={`/eng/info/${item.id}`}
								title={
									item.title?.english ||
									item.title?.romaji ||
									item.title?.native ||
									item.title?.userPreferred
								}
								key={item.id + i}
								className="group cursor-pointer flex flex-col items-center col-span-1 mb-[12px] relative float-left"
								aria-label={
									item.title?.english ||
									item.title?.romaji ||
									item.title?.native ||
									item.title?.userPreferred
								}
							>
								<div className="group-hover:opacity-70 anime-item-image relative aspect-w-2 aspect-h-3 duration-300 ease-linear pb-[156%] mb-0 w-full overflow-hidden">
									<Image
										className="object-fit absolute w-100 min-h-full duration-500 ease-in-out"
										src={item.image || ""}
										alt={
											item.title?.english ||
											item.title?.romaji ||
											item.title?.native ||
											item.title?.userPreferred
										}
										loading="lazy"
									/>
								</div>
								<div className="anime-item-title h-[60px] w-full mt-[4px]">
									<p
										className="line-clamp-2 px-[4px] text-base font-semibold"
										style={{ color: item?.color || "#fffc" }}
									>
										{item.title?.english ||
											item.title?.romaji ||
											item.title?.native ||
											item.title?.userPreferred}
									</p>
								</div>
							</Link>
						))}
					</div>
				</InfiniteScroll>
			)}
		</div>
	)
}

export default AnimeSearchENG
