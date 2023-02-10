// COMPONENTS
import RandomAnimeTitle from "../RandomAnimeTitle"
import RandomAnimeInfo from "../RandomAnimeInfo"
import CharacterDetail from "../CharacterDetail"
import RandomAnimeRightCover from "../RandomAnimeRightCover"

function RandomAnime({ randomAnime, done3 }) {
	return (
		<>
			{Object.keys(randomAnime || {}).length === 0 ? (
				""
			) : (
				<div className="today-section" style={{ marginTop: "42px" }}>
					<h1
						className="today"
						style={{
							marginBottom: "42px",
							float: "right",
						}}
						loading="lazy"
					>
						CÓ THỂ BẠN SẼ THÍCH ĐÓ
					</h1>
					<div className="clearfix"></div>
					<div className="row w-full flex-responsive mb-[40px] mx-auto">
						<div className="col-9 flex-mobile">
							<RandomAnimeTitle randomAnime={randomAnime} />
							<div
								className="info-character-wrapper"
								style={{ marginTop: "22px" }}
							>
								<RandomAnimeInfo randomAnime={randomAnime} />
								<CharacterDetail randomAnime={randomAnime} done3={done3} />
							</div>
						</div>
						<div className="col-3">
							<RandomAnimeRightCover randomAnime={randomAnime} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default RandomAnime
