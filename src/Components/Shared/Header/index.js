import { useEffect, useState } from "react"
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { GENRES } from "../../../constants"
import { LinkContainer } from "react-router-bootstrap"
import { debounce } from "../../../Utilities/debounce"
import "./header.css"
function Header() {
	const [prevScrollPos, setPrevScrollPos] = useState(0)
	const [visible, setVisible] = useState(true)

	const handleScroll = debounce(() => {
		const currentScrollPos = window.pageYOffset

		setVisible(
			(prevScrollPos > currentScrollPos &&
				prevScrollPos - currentScrollPos > 70) ||
				currentScrollPos < 70
		)

		setPrevScrollPos(currentScrollPos)
	}, 100)

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)

		return () => window.removeEventListener("scroll", handleScroll)
	}, [prevScrollPos, visible, handleScroll])

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				bg="dark"
				variant="dark"
				fixed="top"
				className={visible ? "" : "fixed-top-hide"}
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
