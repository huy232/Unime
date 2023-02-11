import React from "react"
import notFound from "../../../Utilities/img/not-found.webp"
import { Link } from "react-router-dom"
import { useAuth } from "../../../Contexts/auth"
import "./notfound.css"

function NotFound() {
	const { language } = useAuth()

	return (
		<div className="w-full">
			<div className="w-full"></div>
			<div
				className="w-full h-100"
				style={{
					background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${notFound})`,
					backgroundSize: `cover`,
					backgroundRepeat: `no-repeat`,
					backgroundPosition: "center",
				}}
			>
				{localStorage.getItem("unime-language") === "vi" ||
				language === "vi" ? (
					<div className="not-found">
						<div className="not-found-wrapper">
							<h2 className="font-black text-[#F55050]">404 Không tìm thấy</h2>
							<Link
								to="/"
								className="bg-[#000000] text-[#EEEEEE] p-[12px] hover:opacity-80 duration-200 ease-in-out rounded"
								aria-label="GO BACK - VI"
							>
								<button id="go-back-vi-btn" aria-label="Go back button - VIET">
									QUAY LẠI TRANG CHỦ
								</button>
							</Link>
						</div>
					</div>
				) : (
					<div className="not-found">
						<div className="not-found-wrapper">
							<h2 className="font-black text-[#F55050]">404 Not Found</h2>
							<Link
								to="/eng"
								className="bg-[#000000] text-[#EEEEEE] p-[12px] hover:opacity-80 duration-200 ease-in-out rounded"
								aria-label="GO BACK - ENG"
							>
								<button id="go-back-eng-btn" aria-label="Go back button - ENG">
									GO BACK TO HOME PAGE
								</button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default NotFound
