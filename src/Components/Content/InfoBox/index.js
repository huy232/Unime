import Skeleton from "@mui/material/Skeleton"

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
						<img
							src={
								info.coverImage?.extraLarge ||
								info.coverImage?.large ||
								info.coverImage?.medium
							}
							className="cover-image"
							alt={info.name}
							loading="lazy"
						/>
					)}
				</div>
				<div className="detail-cover-info">
					{info?.format && (
						<div className="format">
							<h5>ĐỊNH DẠNG</h5>
							<p>{info?.format}</p>
						</div>
					)}

					{info.title && (
						<div className="title">
							<h5>TÊN PHIM</h5>
							{info.title?.romaji && (
								<h6>
									ROMAJI
									<p>{info.title?.romaji}</p>
								</h6>
							)}
							{info.title?.english && (
								<h6>
									TIẾNG ANH
									<p>{info.title?.english}</p>
								</h6>
							)}
							{info.title?.native && (
								<h6>
									TIẾNG NHẬT
									<p>{info.title?.native}</p>
								</h6>
							)}
						</div>
					)}
					{info?.source && (
						<div className="source">
							<h5>CHUYỂN THỂ TỪ</h5>
							<p>{info.source}</p>
						</div>
					)}
					{!!info?.popularity && (
						<>
							{Number(info.popularity) !== 0 && (
								<div className="popularity">
									<h5>ĐỘ NỔI BẬT</h5>
									<p>{info.popularity.toLocaleString()}</p>
								</div>
							)}
						</>
					)}
					{!!info?.favourites && (
						<>
							{Number(info.favourites) !== 0 && (
								<div className="favourite">
									<h5>YÊU THÍCH</h5>
									<p>{info.favourites.toLocaleString()}</p>
								</div>
							)}
						</>
					)}
					{!!info?.trending && (
						<>
							{Number(info.trending) !== 0 && (
								<div className="trending">
									<h5>THỜI THƯỢNG</h5>
									<p>{info.trending.toLocaleString()}</p>
								</div>
							)}
						</>
					)}
					{info.studios?.edges?.length > 0 && (
						<div className="studios">
							<h5>STUDIO</h5>
							<p>
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
