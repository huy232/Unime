import React, { useEffect, useState } from "react"
import axios from "axios"
import notFound from "../../../Utilities/img/not-found.jpg"
import { Link } from "react-router-dom"
import { useAuth } from "../../../Contexts/auth"
import "./notfound.css"

function NotFound() {
	const { language } = useAuth()

	return (
		<div className="w-100 mt-[-140px]">
			<div className="h-[120px] w-100"></div>
			<div
				className="w-100 h-100"
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
							>
								<button>QUAY LẠI TRANG CHỦ</button>
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
							>
								<button>GO BACK TO HOME PAGE</button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default NotFound
