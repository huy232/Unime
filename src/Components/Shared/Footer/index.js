import {
	BsFileArrowUpFill,
	BsFacebook,
	BsDiscord,
	BsGithub,
} from "react-icons/bs"
import "./footer.css"

function Footer() {
	return (
		<div className="footer">
			<div className="facebook-icon">
				<BsFacebook size={30} />
			</div>
			<div className="discord-icon">
				<BsDiscord size={30} />
			</div>
			<div className="github-icon">
				<BsGithub size={30} />
			</div>
			<div className="go-up-icon" style={{ marginRight: "50px" }}>
				<BsFileArrowUpFill size={30} />
			</div>
		</div>
	)
}

export default Footer
