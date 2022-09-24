// const url = "https://mirai-reborn.herokuapp.com/api"
const url = "https://mirai-backend.onrender.com/api"

const genres = [
	{ slug: "hanh-dong", name: "Hành Động" },
	{ slug: "vien-tuong", name: "Viễn Tưởng" },
	{ slug: "lang-man", name: "Lãng Mạn" },
	{ slug: "kinh-di", name: "Kinh Dị" },
	{ slug: "vo-thuat", name: "Võ Thuật" },
	{ slug: "hai-huoc", name: "Hài Hước" },
	{ slug: "truong-hoc", name: "Trường Học" },
	{ slug: "trinh-tham", name: "Trinh Thám" },
	{ slug: "am-nhac", name: "Âm Nhạc" },
	{ slug: "chuyen-sinh", name: "Chuyển Sinh" },
	{ slug: "phieu-luu", name: "Phiêu Lưu" },
	{ slug: "sieu-nhien", name: "Siêu Nhiên" },
	{ slug: "doi-thuong", name: "Đời Thường" },
	{ slug: "gia-tuong", name: "Giả Tưởng" },
	{ slug: "robot", name: "Robot" },
	{ slug: "game", name: "Game" },
	{ slug: "the-thao", name: "Thể Thao" },
	{ slug: "kich-tinh", name: "Kịch Tính" },
	{ slug: "phap-thuat", name: "Pháp Thuật" },
]

const collections = [
	{ slug: "anime-mua-thu-2015", name: "Bộ sưu tập Anime Mùa Thu 2015" },
	{ slug: "hom-nay-xem-gi", name: "Hôm nay xem gì" },
	{ slug: "anime-mua-dong-2016", name: "Bộ sưu tập Anime Mùa Đông 2016" },
	{ slug: "anime-mua-xuan-2016", name: "Bộ sưu tập Anime Mùa Xuân 2016" },
	{ slug: "anime-mua-he-2016", name: "Bộ sưu tập Anime Mùa Hè 2016" },
	{
		slug: "tuyen-tap-anime-cua-studio-ghibli",
		name: "Bộ sưu tập Anime Studio Ghibli",
	},
	{ slug: "anime-the-thao", name: "Bộ sưu tập Anime Thể Thao" },
	{ slug: "anime-game", name: "Bộ sưu tập Anime Game" },
	{ slug: "anime-dai-tap", name: "Bộ sưu tập Anime Dài Tập" },
	{ slug: "anime-tam-ly", name: "Bộ sưu tập Anime Tâm Lý" },
	{
		slug: "anime-lang-man-hay-nhat",
		name: "Bộ sưu tập siêu phẩm Anime Lãng Mạn",
	},
	{
		slug: "nhung-sieu-pham-anime-hanh-dong",
		name: "Bộ sưu tập siêu phẩm Anime Hành Động",
	},
	{ slug: "anime-mua-thu-2016", name: "Bộ sưu tập Anime Mùa Thu 2016" },
	{ slug: "anime-mua-dong-2017", name: "Bộ sưu tập Anime Mùa Đông 2017" },
	{ slug: "dien-cung-madhouse", name: "Bộ sưu tập Anime Studio Madhouse" },
	{ slug: "anime-mua-xuan-2017", name: "Bộ sưu tập Anime Mùa Xuân 2017" },
	{ slug: "anime-hai-huoc-nhat", name: "Bộ sưu tập Anime Hài Hước nhất" },
	{
		slug: "anime-phieu-luu-hay-nhat",
		name: "Bộ sưu tập Anime Phiêu Lưu li kỳ",
	},
	{
		slug: "anime-sinh-ton-kich-tinh-nhat",
		name: "Bộ sưu tập Anime Sinh Tồn kịch tính",
	},
	{
		slug: "anime-kinh-dinh-dang-so-nhat",
		name: "Bộ sưu tập Anime Kinh Dị đáng sợ",
	},
	{ slug: "anime-mua-thu-2017", name: "Bộ sưu tập Anime Mùa Thu 2017" },
	{ slug: "anime-mua-he-2017", name: "Bộ sưu tập Anime Mùa Hè 2017" },
	{ slug: "anime-mua-dong-2018", name: "Bộ sưu tập Anime Mùa Đông 2018" },
	{ slug: "anime-mua-xuan-2018", name: "Bộ sưu tập Anime Mùa Xuân 2018" },
	{ slug: "anime-mua-he-2018", name: "Bộ sưu tập Anime Mùa Hè 2018" },
	{ slug: "anime-mua-thu-2018", name: "Bộ sưu tập Anime Mùa Thu 2018" },
	{ slug: "anime-mua-dong-2019", name: "Bộ sưu tập Anime Mùa Đông 2019" },
	{ slug: "anime-mua-xuan-2019", name: "Bộ sưu tập Anime Mùa Xuân 2019" },
	{ slug: "anime-mua-he-2019", name: "Bộ sưu tập Anime Mùa Hè 2019" },
	{ slug: "anime-mua-thu-2019", name: "Bộ sưu tập Anime Mùa Thu 2019" },
	{ slug: "anime-mua-dong-2020", name: "Bộ sưu tập Anime Mùa Đông 2020" },
	{ slug: "anime-mua-xuan-2020", name: "Bộ sưu tập Anime Mùa Xuân 2020" },
	{ slug: "anime-mua-he-2020", name: "Bộ sưu tập Anime Mùa Hè 2020" },
	{ slug: "anime-mua-thu-2020", name: "Bộ sưu tập Anime Mùa Thu 2020" },
	{ slug: "anime-mua-dong-2021", name: "Bộ sưu tập Anime Mùa Đông 2021" },
	{ slug: "anime-mua-xuan-2021", name: "Bộ sưu tập Anime Mùa Xuân 2021" },
	{ slug: "anime-mua-he-2021", name: "Bộ sưu tập Anime Mùa Hè 2021" },
	{ slug: "anime-mua-thu-2021", name: "Bộ sưu tập Anime Mùa Thu 2021" },
	{ slug: "anime-mua-dong-2022", name: "Bộ sưu tập Anime Mùa Đông 2022" },
	{ slug: "anime-mua-xuan-2022", name: "Bộ sưu tập Anime Mùa Xuân 2022" },
	{ slug: "anime-mua-he-2022", name: "Bộ sưu tập Anime Mùa Hè 2022" },
	{ slug: "anime-mua-thu-2022", name: "Bộ sưu tập Anime Mùa Thu 2022" },
]

export const API = url
export const GENRES = genres
export const COLLECTIONS = collections
