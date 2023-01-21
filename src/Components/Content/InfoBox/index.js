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
					}}
				>
					{loading ? (
						<Skeleton
							variant="rectangular"
							width="160px"
							height="226px"
							animation="wave"
							sx={{ bgcolor: "grey.900" }}
							style={{ marginLeft: "auto", marginRight: "auto" }}
						/>
					) : (
						<img
							src={
								info?.animeInfo?.CoverImg?.large ||
								info?.animeInfo?.CoverImg?.medium ||
								info?.animeInfo?.CoverImg?.small
							}
							className="cover-image"
							alt=""
						/>
					)}
				</div>
				<div className="detail-cover-info">
					<div className="format">
						{info?.animeInfo?.Format ? (
							<>
								{" "}
								<h5>ĐỊNH DẠNG</h5> <p>{info?.animeInfo?.Format}</p>
							</>
						) : (
							""
						)}
					</div>
					<div className="title">
						{info?.animeInfo?.Format ? (
							<>
								{" "}
								<h5>TÊN PHIM</h5>
								{info?.animeInfo?.Title?.romaji ? (
									<>
										<h6>
											ROMAJI <p>{info?.animeInfo?.Title?.romaji}</p>
										</h6>
									</>
								) : (
									""
								)}
								{info?.animeInfo?.Title?.english ? (
									<>
										<h6>
											TIẾNG ANH <p>{info?.animeInfo?.Title?.english}</p>
										</h6>
									</>
								) : (
									""
								)}
								{info?.animeInfo?.Title?.native ? (
									<>
										<h6>
											TIẾNG NHẬT <p>{info?.animeInfo?.Title?.native}</p>
										</h6>
									</>
								) : (
									""
								)}
							</>
						) : (
							""
						)}
					</div>
					<div className="source">
						{info?.animeInfo?.Source ? (
							<>
								{" "}
								<h5>CHUYỂN THỂ TỪ</h5> <p>{info?.animeInfo?.Source}</p>
							</>
						) : (
							""
						)}
					</div>
					<div className="popularity">
						{info?.animeInfo?.Popularity ? (
							<>
								{" "}
								<h5>ĐỘ NỔI BẬT</h5>{" "}
								<p>{info?.animeInfo?.Popularity.toLocaleString()}</p>
							</>
						) : (
							""
						)}
					</div>
					<div className="favourite">
						{info?.animeInfo?.Favourite ? (
							<>
								{" "}
								<h5>YÊU THÍCH</h5>{" "}
								<p>{info?.animeInfo?.Favourite.toLocaleString()}</p>
							</>
						) : (
							""
						)}
					</div>
					<div className="popularity">
						{info?.animeInfo?.Trending ? (
							<>
								{" "}
								<h5>THỜI THƯỢNG</h5>{" "}
								<p>{info?.animeInfo?.Trending.toLocaleString()}</p>
							</>
						) : (
							""
						)}
					</div>
					<div className="studios">
						{info?.animeInfo?.Studio ? (
							<>
								{" "}
								<h5>STUDIO</h5>{" "}
								<p>
									{info?.animeInfo?.Studio.map((studio, i, arr) =>
										i !== arr.length - 1
											? `${studio.name + ", "}`
											: `${studio.name}`
									)}
								</p>
							</>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default InfoBox
