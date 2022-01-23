import { useEffect, useState, useRef } from "react"
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { GENRES } from "../../../constants"
import { LinkContainer } from "react-router-bootstrap"
import "./header.css"
function Header() {
	const [hideNavbar, setHideNavbar] = useState(false)
	const [scrollVertical, setScrollVertical] = useState(0)

	useEffect(() => {
		navbarCalculate()
	}, [hideNavbar])

	const navbarCalculate = () => {
		if (window.scrollY > 0) {
			setHideNavbar(true)
		} else setHideNavbar(false)
	}

	window.addEventListener("scroll", navbarCalculate)

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				bg="dark"
				variant="dark"
				fixed="top"
				className={!hideNavbar ? "" : "fixed-top-hide"}
			>
				<Container>
					<Navbar.Brand as={Link} to="/">
						Mirai
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/anime">
								Anime
							</Nav.Link>
							<NavDropdown title="Thể loại" id="collasible-nav-dropdown">
								{GENRES.map((genre) => (
									<LinkContainer to={`/anime/${genre.slug}`} key={genre.slug}>
										<NavDropdown.Item>{genre.name}</NavDropdown.Item>
									</LinkContainer>
								))}
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
