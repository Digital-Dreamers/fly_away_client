import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap'
 function Header() {
    
    return (

        <div bg="dark" variant="dark" fixed="top">
            <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Fly Away</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/about">About Us</Nav.Link>
                            <Nav.Link href="/flights">Flights</Nav.Link>
                            <Nav.Link href="/reservations">Reservations</Nav.Link>
                            {/* <Nav.Link href="/contact">Contact Us</Nav.Link> */}
                        </Nav>
                    </Container>
                </Navbar>



            </>
        </div>
    )
}
export default Header