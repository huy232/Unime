import React from "react"
import { useAuth } from "../../../Contexts/auth"
import "./languagebutton.css"

function LanguageButton({ handleScrollToTop }) {
	const { setLanguage, language } = useAuth()

	const handleLanguage = (language) => {
		setLanguage(language)
	}

	return (
		<div className="language-container text-neutral-900 flex justify-end h-[40px] py-[4px]">
			<button
				className={`rounded-[2px] p-1 hover:opacity-80 duration-200 bg-white/60`}
				onClick={() => {
					handleScrollToTop()
					handleLanguage(language === "vi" ? "eng" : "vi")
				}}
				id={language === "vi" ? "vi-btn-language" : "eng-btn-language"}
				aria-label={
					language === "vi" ? "Viet button language" : "English button language"
				}
			>
				{language === "vi" ? (
					<div className="flex justify-center items-center h-100">
						<span className="fi fi-vn"></span>
						<span className="pl-[6px] font-medium max-md:hidden">VI</span>
					</div>
				) : (
					<div className="flex justify-center items-center h-100">
						<span className="fi fi-us"></span>
						<span className="pl-[6px] font-medium max-md:hidden">ENG</span>
					</div>
				)}
			</button>
		</div>
	)
}

export default LanguageButton
