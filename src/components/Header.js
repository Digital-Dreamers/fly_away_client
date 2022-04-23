import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
 function Header() {
    
    return (

        <div bg="dark" variant="dark" fixed="top">
            <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Fly Away</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/reservations">Reservations</Nav.Link>
                            {/* <Nav.Link href="/contact">Contact Us</Nav.Link> */}
                        </Nav>
                    </Container>
                </Navbar>



            </>
        </div>
    )
}
export default Header