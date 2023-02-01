import {
	BsFileArrowUpFill,
	BsFacebook,
	BsDiscord,
	BsGithub,
} from "react-icons/bs"
import "./footer.css"

function Footer() {
	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	return (
		<footer className="relative footer h-[50px] w-full bg-[#494848]">
			<div className="flex items-center h-100 mx-[40px]">
				<div className="facebook-icon mx-[6px]">
					<a href="https://www.facebook.com/giahuythai/">
						<BsFacebook size={30} />
					</a>
				</div>
				<div className="discord-icon mx-[6px]">
					<a href="https://discord.com/users/304967907505340427">
						<BsDiscord size={30} />
					</a>
				</div>
				<div className="github-icon mx-[6px]">
					<a href="https://github.com/huy232">
						<BsGithub size={30} />
					</a>
				</div>
				<div className="go-up-icon ml-auto" onClick={handleScrollToTop}>
					<BsFileArrowUpFill size={30} />
				</div>
			</div>
		</footer>
	)
}

export default Footer
