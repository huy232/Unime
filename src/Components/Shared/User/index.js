import React, { useEffect, useState } from "react"
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../../../supabaseClient"
import { useAuth } from "../../../Contexts/auth"
import "./user.css"

function User({ handleScrollToTop }) {
	const { user, signOut } = useAuth()
	// const [user, setUser] = useState({})

	// useEffect(() => {
	// 	const getUserData = async () => {
	// 		await supabase.auth.getUser().then((value) => {
	// 			if (value.data?.user) {
	// 				setUser(value.data.user)
	// 			}
	// 		})
	// 	}

	// 	getUserData()
	// }, [])

	async function handleSignOut() {
		// Ends user session
		await signOut()
	}

	return (
		<div>
			{user ? (
				<div className="user-info-container">
					<div className="user-info-holder">
						<div className="user-info-image">
							<img src={user.user_metadata.avatar_url} alt="" />
						</div>
						<div className="user-info-name">{user.user_metadata.full_name}</div>
					</div>
					<Nav.Link
						className="anime-nav-logout"
						as={Link}
						to="/"
						onClick={() => handleSignOut()}
						title="Đăng xuất"
					>
						<p className="anime-nav-paragraph">Đăng xuất</p>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
						</svg>
					</Nav.Link>
				</div>
			) : (
				<Nav.Link
					className="anime-nav-login"
					as={Link}
					to="/login"
					onClick={() => handleScrollToTop()}
					title="Đăng nhập"
				>
					<p className="anime-nav-paragraph">Đăng nhập</p>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
					</svg>
				</Nav.Link>
			)}
		</div>
	)
}

export default User
