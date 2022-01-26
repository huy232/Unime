import { useEffect, useState } from "react"
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { GENRES } from "../../../constants"
import { LinkContainer } from "react-router-bootstrap"
import { debounce } from "../../../Utilities/debounce"
import TextField from "@mui/material/TextField"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

import "./header.css"

function Header() {
	let navigate = useNavigate()
	const [input, setInput] = useState("")
	const [submit, setSubmit] = useState("")
	const [prevScrollPos, setPrevScrollPos] = useState(0)
	const [visible, setVisible] = useState(true)

	const handleScroll = debounce(() => {
		const currentScrollPos = window.pageYOffset

		setVisible(
			(prevScrollPos > currentScrollPos &&
				prevScrollPos - currentScrollPos > 100) ||
				currentScrollPos < 100
		)

		setPrevScrollPos(currentScrollPos)
	}, 100)

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		navigate(`/search/${encodeURI(input)}`)
		setInput("")
	}
	const handleKeypress = (e) => {
		//it triggers by pressing the enter key
		if (e.keyCode === 13) {
			handleSubmit()
		}
	}
	const handleScrollToTop = () => {
		window.scrollTo(0, 0)
	}

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
					<Navbar.Brand as={Link} to="/" onClick={handleScrollToTop}>
						Mirai
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/anime" onClick={handleScrollToTop}>
								<div className="anime-nav">Anime</div>
							</Nav.Link>
							<NavDropdown title="Thể loại" id="collasible-nav-dropdown">
								{GENRES.map((genre) => (
									<LinkContainer
										to={`/anime/${genre.slug}`}
										key={genre.slug}
										onClick={handleScrollToTop}
									>
										<NavDropdown.Item>{genre.name}</NavDropdown.Item>
									</LinkContainer>
								))}
							</NavDropdown>
							<form style={{ display: "flex" }}>
								<TextField
									label="Tìm kiếm"
									variant="outlined"
									className="search-navbar"
									color="primary"
									onChange={handleChange}
									onKeyPress={handleKeypress}
									value={input}
								/>
								<button
									onClick={handleSubmit}
									type="submit"
									style={{
										backgroundColor: "var(--bs-dark-rgb)",
										border: "0",
										margin: "0",
										marginLeft: "10px",
									}}
									className="submit-button"
								>
									<BsSearch className="search-icon" />
								</button>
							</form>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
