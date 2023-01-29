import React from "react"
import { useAuth } from "../../../Contexts/auth"
import HeaderVI from "../HeaderVI"
import HeaderENG from "../HeaderENG"
import "./header.css"

function Header() {
	const { language } = useAuth()
	return <>{language === "eng" ? <HeaderENG /> : <HeaderVI />}</>
}

export default Header
