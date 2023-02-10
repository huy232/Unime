import React from "react"
import { useAuth } from "../../../Contexts/auth"
import "./languagebutton.css"

function LanguageButton({ handleScrollToTop }) {
	const { setLanguage, language } = useAuth()

	const handleLanguage = (language) => {
		setLanguage(language)
	}

	return (
		<div className="language-container ml-auto text-neutral-900 flex ">
			<button
				className={`vi-btn mr-2 rounded p-1 hover:opacity-80 duration-200 ${
					language === "vi" && "bg-[#a5612a]"
				}`}
				onClick={() => {
					handleScrollToTop()
					handleLanguage("vi")
				}}
				id="vi-btn-language"
				aria-label="Viet button language"
			>
				VI
			</button>
			<button
				className={`eng-btn rounded p-1 hover:opacity-80 duration-200 ${
					language === "eng" && "bg-[#a5612a]"
				}`}
				onClick={() => {
					handleScrollToTop()
					handleLanguage("eng")
				}}
				id="eng-btn-language"
				aria-label="English button language"
			>
				ENG
			</button>
		</div>
	)
}

export default LanguageButton
