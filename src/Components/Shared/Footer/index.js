import {
	BsFileArrowUpFill,
	BsFacebook,
	BsDiscord,
	BsGithub,
} from "react-icons/bs"
import "./footer.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../../Contexts/auth"

function Footer() {
	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	const { language } = useAuth()
	return (
		<footer className="relative footer w-full flex justify-center items-center flex-col px-2 py-4 h-[300px]">
			<div className="text-center py-2 border-t-[1px] w-[320px]">
				<Link
					to="/"
					className="font-black text-xl text-[#fffc] hover:opacity-80 duration-200 ease-in-out"
				>
					UNIME
				</Link>
			</div>
			<div className="flex items-center h-[30px] mx-[40px] justify-center py-2">
				<div className="facebook-icon mx-[6px]">
					<a
						aria-label="Facebook link"
						href="https://www.facebook.com/giahuythai/"
						className="align-middle"
					>
						<BsFacebook size={30} />
					</a>
				</div>
				<div className="discord-icon mx-[6px]">
					<a
						aria-label="Discord link"
						href="https://discord.com/users/304967907505340427"
						className="align-middle"
					>
						<BsDiscord size={30} />
					</a>
				</div>
				<div className="github-icon mx-[6px]">
					<a
						aria-label="Github link"
						href="https://github.com/huy232"
						className="align-middle"
					>
						<BsGithub size={30} />
					</a>
				</div>
				<div
					className="go-up-icon ml-auto"
					onClick={handleScrollToTop}
					title={language === "vi" ? "Lên trên đầu chứ?" : `Want to go up?`}
				>
					<BsFileArrowUpFill size={30} />
				</div>
			</div>
			<p className="max-w-[640px] text-slate-400 text-sm px-2 h-[104px] overflow-y-scroll footer-description">
				{language === "vi"
					? "UNIME không liên kết với hoặc xác nhận bởi bất kỳ hãng phim hoạt hình nào đằng sau việc tạo ra phim hoạt hình được trình bày trên trang web này. Trang web này chỉ là một giao diện người dùng trình bày/liên kết các tệp tự lưu trữ khác nhau trên internet bởi các nhà cung cấp bên thứ ba khác để dễ dàng truy cập."
					: "UNIME is not affiliated with or endorsed by any of the anime studios behind the creation of the anime presented on this site. This website is only a user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access."}
			</p>
			<p className="py-2 font-bold max-md:text-center">
				© UNIME | {language === "vi" ? "Dựng với" : `Built with`}{" "}
				<a href="https://github.com/consumet">Consumet API</a>{" "}
				{language === "vi" ? "và nguồn từ" : "and source from"}{" "}
				<a href="https://github.com/chaycee">Chaycee</a>
			</p>
		</footer>
	)
}

export default Footer
