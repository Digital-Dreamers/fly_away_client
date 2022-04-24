import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
function Header() {
    let navigate = useNavigate()
    // const [query, setquery] = useState('')
    const [reservationNumber, setReservationNumber] = useState('')

    return (
        <div bg="dark" variant="dark" fixed="top">
            <>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Fly Away</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                          
                            <div className="search-container">
                              
                                <Form className="d-flex" onSubmit={(e) => {
                                    e.preventDefault()
                                    // navigate to the page of reservation           
                                    navigate(`/reservation/${reservationNumber}`)

                                    setReservationNumber('')
                                }}>
                                  
                                    <Form.Control type="search" value={reservationNumber} placeholder="Enter Reservation"
                                        className="justify-content-end"
                                        onChange={(e) =>  setReservationNumber(e.target.value)} />
                                    <Button variant="success" type='submit'><i className="fa fa-search" aria-hidden="true"></i></Button>
                                    {/* </Form> */}
                                </Form>
                            </div>
                        </Nav>
                    </Container>
                </Navbar>



            </>
        </div>
    )
}
export default Header