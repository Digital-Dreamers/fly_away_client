
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Form, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

// icons
import { MdOutlineAirplaneTicket } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'

function Header() {
    let navigate = useNavigate()
    const [reservationNumber, setReservationNumber] = useState('')

    return (

        <Navbar bg="primary" variant="dark" expand='sm'>
            <Container>
                <Navbar.Brand as={Link} to="/"><MdOutlineAirplaneTicket style={{fontSize: '2em'}} className="me-1"/>Fly Away</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                    <div className="search-container">
                        <Row className='d-flex justify-content-center'>
                            <Col xs={8} sm={12}>
                                <Form className="d-flex" onSubmit={(e) => {
                                    e.preventDefault()
                                    // navigate to the page of reservation           
                                    navigate(`/reservation/${reservationNumber}`)
                                    setReservationNumber('')
                                }}>
                                    <Form.Control type="search" value={reservationNumber} placeholder="Enter Reservation"
                                        className="me-2"
                                        onChange={(e) => setReservationNumber(e.target.value)} />
                                    <Button variant="success" type='submit' className="d-flex justify-content-center align-items-center"><FaSearch /></Button>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header