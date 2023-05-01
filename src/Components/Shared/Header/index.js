import React from "react"
import { useAuth } from "../../../Contexts/auth"
import HeaderVI from "../HeaderVI"
import HeaderENG from "../HeaderENG"
import { useLocation } from "react-router-dom"

function Header() {
	const pathname = useLocation()
	const { language } = useAuth()
	return (
		<>
			{pathname.pathname.split("/")[1] !== "eng" ? <HeaderVI /> : <HeaderENG />}
		</>
	)
}

export default Header
