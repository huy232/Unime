import { Link } from "react-router-dom"
import "./mangalayout.css"
import MangaLayoutSkeleton from "../MangaLayoutSkeleton"

function MangaLayoutENG({
	content,
	loading,
	headingTitle,
	color,
	navigateUrl,
}) {
	const preset = {
		POPULAR: "text-right text-[#FF8B13]",
		TRENDING: "text-left text-[#865DFF]",
		MANHWA: "text-left text-[#FCE700]",
	}
	return (
		<>
			{loading ? (
				<MangaLayoutSkeleton />
			) : (
				<>
					<h1
						className={`font-black ${preset[headingTitle]} ml-6 mr-6 mt-2 border-b-4 border-white max-sm:text-center`}
					>
						{headingTitle}
					</h1>
					<div className="manga-container md:px-12 lg:px-20 xl:px-28 2xl:px-36 w-full pb-12">
						<div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
							{content.map((manga, i) => (
								<Link
									to={`/eng/manga-info/${manga.id}`}
									title={
										manga.title.english ||
										manga.title.romaji ||
										manga.title.native ||
										manga.userPreferred
									}
									key={manga.id}
									aria-label={
										manga.title.english ||
										manga.title.romaji ||
										manga.title.native ||
										manga.userPreferred
									}
									className="group col-span-1 cursor-pointer flex flex-col items-center col-span-1 mb-[12px] relative float-left"
								>
									<div className="group-hover:opacity-70 relative aspect-w-2 aspect-h-3 duration-300 ease-linear pb-[156%] mb-0 w-full overflow-hidden">
										<img
											className="group-hover:scale-90 duration-500 linear absolute min-h-full"
											src={
												manga.coverImage.extraLarge ||
												manga.coverImage.large ||
												manga.coverImage.medium ||
												""
											}
											alt={
												manga.title.english ||
												manga.title.romaji ||
												manga.title.native ||
												manga.userPreferred
											}
											loading="lazy"
										/>
										<div className="absolute group-hover:scale-90 duration-500 linear text-right w-full h-full">
											<p className="inline-block mt-[4px] mr-[4px] p-[4px] bg-neutral-500/75 text-white rounded">
												❤ {manga.averageScore}%
											</p>
										</div>
										<div className="absolute group-hover:scale-90 duration-500 linear text-left w-full h-full">
											<p className="inline-block py-[2x] px-[6px] bg-neutral-500/75 text-white rounded border-solid border-2">
												{manga.countryOfOrigin}
											</p>
										</div>
									</div>
									<div className="w-full mx-2">
										<div className="manga-title flex flex-row items-center mt-[6px] h-[60px]">
											<p
												className="line-clamp-2 font-semibold mx-[2px]"
												style={{
													color: `${manga.coverImage.color || "#fffc"}`,
												}}
											>
												{manga.title.english ||
													manga.title.romaji ||
													manga.title.native ||
													manga.userPreferred}
											</p>
										</div>
										<div className="flex flex-row items-center h-[40px]">
											<p className="text-[#fffc]">{manga.status}</p>
											{manga.chapters && (
												<p className="inline-block ml-auto p-[4px] border-r-4 border-b-4 text-white">
													{manga.chapters}. ch
												</p>
											)}
										</div>
									</div>
								</Link>
							))}
						</div>
						{/* <div className="text-right mt-[24px]">
							<Link
								to={`/eng/manga-list/${navigateUrl}`}
								className="browse-button hover:text-[#fffc] font-semibold"
								style={{ "--c": color }}
							>
								MORE...
							</Link>
						</div> */}
					</div>
				</>
			)}
		</>
	)
}

export default MangaLayoutENG
