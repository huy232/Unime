import React from "react"
import { useAuth } from "../../../Contexts/auth"
import "./languagebutton.css"

function LanguageButton() {
	const { setLanguage } = useAuth()

	const handleLanguage = (language) => {
		setLanguage(language)
	}

	return (
		<div className="language-container ml-auto text-neutral-900">
			<button
				className="vi-btn mr-2 bg-neutral-300 rounded p-1 hover:opacity-80 duration-200"
				onClick={() => handleLanguage("vi")}
			>
				VI
			</button>
			<button
				className="eng-btn bg-neutral-300 rounded p-1 hover:opacity-80 duration-200"
				onClick={() => handleLanguage("eng")}
			>
				ENG
			</button>
		</div>
	)
}

export default LanguageButton
