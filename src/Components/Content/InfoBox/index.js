import Skeleton from "@mui/material/Skeleton"
import blackImage from "../../../Utilities/img/black.webp"
import Image from "../Image"

function InfoBox({ info, loading }) {
	return (
		<>
			<div className="cover-wrapper ">
				<div
					className="info-image flex justify-center"
					style={{
						height: "300px",
						marginTop: "-5rem",
						marginBottom: "20px",
					}}
				>
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="200px"
							height="300px"
							animation="wave"
							sx={{ bgcolor: "grey.900" }}
							style={{ marginLeft: "auto", marginRight: "auto" }}
						/>
					) : (
						<Image
							src={
								info.coverImage?.extraLarge ||
								info.coverImage?.large ||
								info.coverImage?.medium ||
								blackImage
							}
							className="cover-image"
							alt={info.name}
							loading="lazy"
						/>
					)}
				</div>
				<div className="flex flex-col max-lg:flex-row text-right max-lg:text-center max-lg:overflow-x-scroll [&>div]:lg:mx-4 [&>div]:max-lg:inline-flex [&>div]:max-lg:shrink-0 [&>div]:max-lg:flex-col [&>div]:max-lg:flex-nowrap [&>div]:max-lg:mx-2 [&>div:nth-child(2)]:max-lg:hidden">
					{info?.format && (
						<div>
							<h5 className="inline-block px-[10px] py-[2px] bg-[#282828] rounded-[14px] font-black m-0">
								ĐỊNH DẠNG
							</h5>
							<p className="pb-[6px]">{info?.format}</p>
						</div>
					)}
					{info.title && (
						<div>
							<h5 className="inline-block px-[10px] py-[2px] bg-[#282828] rounded-[14px] font-black m-0">
								TÊN PHIM
							</h5>
							{info.title?.romaji && (
								<h6>
									ROMAJI
									<p className="pb-[6px]">{info.title?.romaji}</p>
								</h6>
							)}
							{info.title?.english && (
								<h6>
									TIẾNG ANH
									<p className="pb-[6px]">{info.title?.english}</p>
								</h6>
							)}
							{info.title?.native && (
								<h6>
									TIẾNG NHẬT
									<p className="pb-[6px]">{info.title?.native}</p>
								</h6>
							)}
						</div>
					)}
					{info?.source && (
						<div>
							<h5 className="inline-block px-[10px] py-[2px] bg-[#282828] rounded-[14px] font-black m-0">
								CHUYỂN THỂ TỪ
							</h5>
							<p className="pb-[6px]">{info.source}</p>
						</div>
					)}
					{!!info?.popularity && (
						<>
							{Number(info.popularity) !== 0 && (
								<div>
									<h5 className="inline-block px-[10px] py-[2px] bg-[#282828] rounded-[14px] font-black m-0">
										ĐỘ NỔI BẬT
									</h5>
									<p className="pb-[6px]">{info.popularity.toLocaleString()}</p>
								</div>
							)}
						</>
					)}
					{!!info?.favourites && (
						<>
							{Number(info.favourites) !== 0 && (
								<div>
									<h5 className="inline-block px-[10px] py-[2px] bg-[#282828] rounded-[14px] font-black m-0">
										YÊU THÍCH
									</h5>
									<p className="pb-[6px]">{info.favourites.toLocaleString()}</p>
								</div>
							)}
						</>
					)}
					{!!info?.trending && (
						<>
							{Number(info.trending) !== 0 && (
								<div>
									<h5 className="inline-block px-[10px] py-[2px] bg-[#282828] rounded-[14px] font-black m-0">
										THỜI THƯỢNG
									</h5>
									<p className="pb-[6px]">{info.trending.toLocaleString()}</p>
								</div>
							)}
						</>
					)}
					{info.studios?.edges?.length > 0 && (
						<div>
							<h5 className="inline-block px-[10px] py-[2px] bg-[#282828] rounded-[14px] font-black m-0">
								STUDIO
							</h5>
							<p className="pb-[6px]">
								{info.studios.edges.map((studio, i, arr) =>
									i !== arr.length - 1
										? `${studio.node.name + ", "}`
										: `${studio.node.name}`
								)}
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default InfoBox
