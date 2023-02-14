import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Contexts/auth"
import useDocumentTitle from "../../Hooks/useDocumentTitle"
import AnimeRandomQuote from "../../Components/Content/AnimeRandomQuote"
import background from "../../Utilities/img/background.webp"
import "./login.css"

export default function Login() {
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			navigate("/")
		}
	})
	const {
		signInWithGoogle,
		signInWithDiscord,
		signInWithFacebook,
		user,
		language,
	} = useAuth()

	const handleSignInGoogle = async () => {
		await signInWithGoogle()
	}

	const handleSignInDiscord = async () => {
		await signInWithDiscord()
	}

	const handleSignInFacebook = async () => {
		await signInWithFacebook()
	}

	const handleGoBack = (language) => {
		if (language === "eng") {
			navigate("/eng")
		} else {
			navigate("/")
		}
	}

	useDocumentTitle(language === "vi" ? `Đăng nhập - Unime` : `Login - Unime`)

	return (
		<>
			<div className="login-container">
				<div
					className="col-40 max-sm:h-[calc(var(--vh,1vh)*100)] relative"
					style={{
						background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${background})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
				>
					<AnimeRandomQuote />
				</div>
				<div className="col-60 max-sm:absolute">
					<div className="login-section">
						<h1 className="login-heading">
							<div
								className="login-go-back-btn"
								onClick={() => handleGoBack(language)}
								title={
									language === "vi" ? "Trở về trang chủ" : "Back to homepage"
								}
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path d="M272 157.1v197.8c0 10.7-13 16.1-20.5 8.5l-98.3-98.9c-4.7-4.7-4.7-12.2 0-16.9l98.3-98.9c7.5-7.7 20.5-2.3 20.5 8.4zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" />
								</svg>
							</div>
							{language === "vi" ? "ĐĂNG NHẬP" : "LOGIN"}
						</h1>
						<button
							className="social-button google-button"
							onClick={() => handleSignInGoogle()}
							id="google-btn-sign-in"
							aria-label="Google button sign in"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 48 48"
								width="48px"
								height="48px"
							>
								<path
									fill="#FFC107"
									d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
								/>
								<path
									fill="#FF3D00"
									d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
								/>
								<path
									fill="#4CAF50"
									d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
								/>
								<path
									fill="#1976D2"
									d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
								/>
							</svg>

							<p className="social-paragraph">
								{language === "vi"
									? "Đăng nhập bằng Google"
									: "Login through Google"}
							</p>
						</button>
						<button
							className="social-button facebook-button"
							onClick={() => handleSignInFacebook()}
							id="facebook-btn-sign-in"
							aria-label="Facebook button sign in"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 48 48"
								width="48px"
								height="48px"
							>
								<path
									fill="#3f51b5"
									d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
								/>
								<path
									fill="#fffc"
									d="M29.368,24H26v12h-5V24h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H30v4h-2.287 C26.104,16,26,16.6,26,17.723V20h4L29.368,24z"
								/>
							</svg>

							<p className="social-paragraph">
								{language === "vi"
									? "Đăng nhập bằng Facebook"
									: "Login through Facebook"}
							</p>
						</button>
						<button
							className="social-button discord-button"
							onClick={() => handleSignInDiscord()}
							id="discord-btn-sign-in"
							aria-label="Discord button sign in"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 48 48"
								width="48px"
								height="48px"
							>
								<path
									fill="#8c9eff"
									d="M42,45l-9-7.001L34,41H10c-2.761,0-5-2.238-5-5V10c0-2.762,2.239-5,5-5h27c2.762,0,5,2.238,5,5V45z"
								/>
								<path
									fill="#fffc"
									d="M32.59,16.24c0,0-2.6-2.01-5.68-2.24l-0.27,0.55c2.78,0.67,4.05,1.64,5.38,2.83 C29.73,16.21,27.46,15,23.5,15s-6.23,1.21-8.52,2.38c1.33-1.19,2.85-2.27,5.38-2.83L20.09,14c-3.23,0.31-5.68,2.24-5.68,2.24 S11.5,20.43,11,28.62c2.94,3.36,7.39,3.38,7.39,3.38l0.92-1.23c-1.57-0.54-3.36-1.51-4.9-3.27c1.84,1.38,4.61,2.5,9.09,2.5 s7.25-1.12,9.09-2.5c-1.54,1.76-3.33,2.73-4.9,3.27L28.61,32c0,0,4.45-0.02,7.39-3.38C35.5,20.43,32.59,16.24,32.59,16.24z M20,27 c-1.1,0-2-1.12-2-2.5s0.9-2.5,2-2.5s2,1.12,2,2.5S21.1,27,20,27z M27,27c-1.1,0-2-1.12-2-2.5s0.9-2.5,2-2.5s2,1.12,2,2.5 S28.1,27,27,27z"
								/>
							</svg>

							<p className="social-paragraph">
								{language === "vi"
									? "Đăng nhập bằng Discord"
									: "Login through Discord"}
							</p>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
