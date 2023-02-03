import React from "react"
import { useAuth } from "../../../Contexts/auth"
import "./languagebutton.css"

function LanguageButton() {
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
				onClick={() => handleLanguage("vi")}
			>
				VI
			</button>
			<button
				className={`eng-btn rounded p-1 hover:opacity-80 duration-200 ${
					language === "eng" && "bg-[#a5612a]"
				}`}
				onClick={() => handleLanguage("eng")}
			>
				ENG
			</button>
		</div>
	)
}

export default LanguageButton
