import { useState, useEffect } from "react"
import axios from "axios"
import { API } from "../../../constants"
import InfiniteScroll from "react-infinite-scroll-component"
import useDocumentTitle from "../../../Hooks/useDocumentTitle"
import LoadingSpin from "react-loading-spin"
import { Link } from "react-router-dom"

function MangaBrowseENG({ subUrl, title }) {
	const [mangaData, setMangaData] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [hasNextPage, setHasNextPage] = useState(true)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()

		const getManga = async () => {
			await axios
				.get(`${API}/${subUrl}?page=${page}`, {
					cancelToken: source.token,
				})
				.then((data) => {
					if (data.data.success) {
						const mangaPayload = data.data.data
						const mangaObject = Object.values(mangaPayload)[0]
						setMangaData((prev) => {
							return [...new Set([...prev, ...mangaObject.media])]
						})
						setPage(mangaObject.pageInfo.currentPage)
						setHasNextPage(mangaObject.pageInfo.hasNextPage)
						setLoading(false)
					}
				})
				.catch((thrown) => {
					if (axios.isCancel(thrown)) return
				})
		}

		getManga()
		return () => {
			source.cancel()
		}
	}, [page, subUrl])

	const scrollThreshold = () => {
		const newPage = page + 1
		setPage(newPage)
	}

	useDocumentTitle(`${title} MANGA - Unime`)
	return (
		<>
			<h1 className="font-black mx-1 max-md:text-center">{title} MANGA</h1>
			{loading ? (
				<div className="block w-full mt-[50px] text-center">
					<LoadingSpin primaryColor="red" />
				</div>
			) : (
				<InfiniteScroll
					initialScrollY={0}
					style={{ overflow: "none" }}
					dataLength={mangaData.length}
					scrollThreshold={0.9}
					next={scrollThreshold}
					hasMore={hasNextPage}
					loader={
						<div className="loading-spin mt-0">
							<LoadingSpin primaryColor="red" />
						</div>
					}
				>
					<div className="anime-container md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
						{mangaData.map((item, i) => (
							<Link
								to={`/eng/manga-info/${item.id}`}
								title={
									item.title?.english ||
									item.title?.romaji ||
									item.title?.native ||
									item.title?.userPreferred
								}
								aria-label={
									item.title?.english ||
									item.title?.romaji ||
									item.title?.native ||
									item.title?.userPreferred
								}
								key={i}
								className="group col-span-1 cursor-pointer flex flex-col items-center col-span-1 mb-[12px] relative float-left"
							>
								<div className="group-hover:opacity-70 anime-item-image relative aspect-w-2 aspect-h-3 duration-300 ease-linear pb-[156%] mb-0 w-full overflow-hidden">
									<img
										className="object-fit absolute w-100 min-h-full"
										src={
											item.coverImage?.extraLarge ||
											item.coverImage?.large ||
											item.coverImage?.medium ||
											""
										}
										alt={
											item.title?.english ||
											item.title?.romaji ||
											item.title?.native ||
											item.title?.userPreferred
										}
										loading="lazy"
									/>
									{item.episodeNumber && (
										<div className="z-10 absolute right-0 bg-black/80 p-[4px] text-[#fffc]">
											EP. {item.episodeNumber}
										</div>
									)}
								</div>
								<div className="anime-item-title h-[60px] w-full mt-[4px]">
									<p
										className="line-clamp-2 px-[4px] text-base font-semibold"
										style={{
											color: item.coverImage?.color || "#fffc",
										}}
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
		</>
	)
}

export default MangaBrowseENG
