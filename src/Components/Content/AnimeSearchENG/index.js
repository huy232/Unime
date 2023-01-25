import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component"
import LoadingSpin from "react-loading-spin"
import { Link } from "react-router-dom"
import useDocumentTitle from "../DocumentTitleHook"

const PAGE_NUMBER = 1

function AnimeSearchENG() {
	const [loading, setLoading] = useState(true)
	const [searchResult, setSearchResult] = useState([])
	let [page, setPage] = useState(PAGE_NUMBER)
	const [hasNextPage, setHasNextPage] = useState(true)
	const { query } = useParams()
	const [storedState, setStoredState] = useState(query)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		if (storedState !== query) {
			page = PAGE_NUMBER
		}
		const getSearchResult = async () => {
			setTimeout(async () => {
				axios
					.get(`https://api.consumet.org/meta/anilist/${query}?page=${page}`, {
						cancelToken: source.token,
					})
					.then((response) => {
						if (storedState !== query) {
							setSearchResult(response.data.results)
							setStoredState(query)
						} else {
							setSearchResult((prev) => {
								return [...new Set([...prev, ...response.data.results])]
							})
						}
						setHasNextPage(response.data.hasNextPage)
						setLoading(false)
					})
					.catch((thrown) => {
						if (axios.isCancel(thrown)) return
					})
			}, 2000)
		}

		getSearchResult()
		return () => {
			clearTimeout(getSearchResult)
			source.cancel()
		}
	}, [page, query])

	const scrollThreshold = () => {
		const newPage = page + 1
		setPage(newPage)
	}

	useDocumentTitle("Search - Unime")

	return (
		<div>
			<h1 className="font-black">SEARCH</h1>
			{loading ? (
				<div className="block w-100 mt-[50px] text-center">
					<LoadingSpin primaryColor="red" />
				</div>
			) : (
				<InfiniteScroll
					initialScrollY={0}
					style={{ overflow: "none" }}
					dataLength={searchResult.length}
					scrollThreshold={0.95}
					next={scrollThreshold}
					hasMore={hasNextPage}
					loader={
						<div className="loading-spin">
							<LoadingSpin primaryColor="red" />
						</div>
					}
				>
					<div className="search-container md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
						{searchResult.map((item) => (
							<Link
								to={`/eng/info/${item.id}`}
								title={
									item.title?.english ||
									item.title?.romaji ||
									item.title?.native
								}
								key={item.id}
							>
								<div
									className="group search-item col-span-1 cursor-pointer flex flex-col items-center"
									title={item.title}
								>
									<div className="group-hover:opacity-70 search-item-image relative aspect-w-2 aspect-h-3 duration-300 ease-linear w-[180px]">
										<img
											className="w-[180px] h-[240px] object-cover"
											src={item.image}
											alt=""
										/>
									</div>
									<div className="search-item-title h-[60px] w-[180px]">
										<p
											className="line-clamp-2"
											style={{ color: item?.color || "#fff" }}
										>
											{item.title?.english ||
												item.title?.romaji ||
												item.title?.native}
										</p>
									</div>
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
