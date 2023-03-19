import { Link } from "react-router-dom"

function SeasonHolderENG({ anime, title, color }) {
	return (
		<ul className="bg-[#0d0d0d] mx-2 p-2 my-2">
			<h3 className="font-extrabold" style={{ color: color }}>
				{title}
			</h3>
			{anime.map((item) => (
				<Link
					to={`/eng/info/${item.id}`}
					className="flex py-2 odd:bg-[#0D0D0D] even:bg-[#111111] group"
					key={item.id}
					title={
						item.title?.english ||
						item.title?.romaji ||
						item.title?.native ||
						item.title?.userPreferred
					}
				>
					<div className="w-[60px] aspect-[2/3] shrink-0 group-hover:opacity-50 duration-200 ease-in-out">
						<img
							src={
								item.coverImage?.extraLarge ||
								item.coverImage?.large ||
								item.coverImage?.medium
							}
							alt={
								item.title?.english ||
								item.title?.romaji ||
								item.title?.native ||
								item.title?.userPreferred
							}
							className="object-fit w-full h-full"
						/>
					</div>
					<div className="mx-2 text-[#fffc]">
						<p
							className="line-clamp-1 h-[30px] group-hover:opacity-50 duration-200 ease-in-out"
							style={{ color: item.coverImage.color || "#fffc" }}
						>
							{item.title?.english ||
								item.title?.romaji ||
								item.title?.native ||
								item.title?.userPreferred}
						</p>
						<div className="flex items-center">
							<span>{item.format}</span>
							<span className="mx-1 mt-[3px] w-1.5 h-1.5 bg-[#DC8449] rounded-full inline-block"></span>
							<span>{item.seasonYear}</span>
						</div>
						<div className="line-clamp-1">
							{item.genres.map((genre, i) => (
								<span key={i}>
									<span>{genre}</span>
									{item.genres.length !== 1 && i !== item.genres.length - 1 ? (
										<span className="mx-1 w-1.5 h-1.5 bg-[#237BB6] rounded-full inline-block"></span>
									) : (
										""
									)}
								</span>
							))}
						</div>
					</div>
				</Link>
			))}
		</ul>
	)
}

export default SeasonHolderENG
