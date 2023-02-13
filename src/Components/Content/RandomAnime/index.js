import RandomAnimeTitle from "../RandomAnimeTitle"
import RandomAnimeInfo from "../RandomAnimeInfo"
import CharacterDetail from "../CharacterDetail"
import RandomAnimeRightCover from "../RandomAnimeRightCover"

function RandomAnime({ randomAnime, done3 }) {
	return (
		<>
			{Object.keys(randomAnime).length > 0 && (
				<div className="today-section max-md:text-center text-right my-[42px] w-full">
					<h1
						className="today inline-block border-[#5a00b3] border-t-[5px] border-r-[5px] border-l-[5px] font-black select-none	"
						loading="lazy"
					>
						CÓ THỂ BẠN SẼ THÍCH ĐÓ
					</h1>
					<div className="clearfix"></div>
					<div className="row w-full flex-responsive mb-[40px] mx-auto">
						<div className="col-9 flex-mobile">
							<RandomAnimeTitle randomAnime={randomAnime} />
							<div className="info-character-wrapper mt-[22px]">
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
