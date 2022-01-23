import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { GENRES } from "../../../constants"
import "./header.css"
function Header() {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
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
								<NavDropdown.Item>{genre.name}</NavDropdown.Item>
							))}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
