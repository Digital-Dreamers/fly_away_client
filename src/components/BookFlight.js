import React, { useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import {Form, Row, Col} from 'react-bootstrap'
import SearchFlight from './subcomponents/SearchFlight'
 function BookFlight() {
  // const [passenger, setPassenger] = useState('')
  const [flights, setFlights] = useState([])
  return (
     <div>
        <Container className='mt-5'>
        {/* <Container className='mt-5'> */}
        <h3 className="mt-5">Passenger Information</h3>
        <section className="container mb-5">
        <Row className='border'>
      <Form className= 'mt-3' onSubmit={(e)=>{
        e.preventDefault()
      
      }}>
       <Form.Group controlId='Passenger Info'>
      {/* <div className="row g-3 mt-3"> */}
      <Row>
      <Col sm={10} md={6} className='my-3' >
        <Form.Group controlId="form.FirstName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First name" />
        </Form.Group>
        </Col>
        <Col sm={10} md={6} className='my-3' >
        <Form.Group controlId="form.LastName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Last name" />
        </Form.Group>
        </Col>
        </Row>
        <Row>
        <Col sm={14} md={9} className='my-3' >
        <Form.Group controlId="Address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Address" />
        </Form.Group>
        </Col>
        <Col sm={3} md={1} className='my-3' >
        <Form.Group controlId="State">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" />
        </Form.Group>
        </Col>
        <Col sm={4} md={2} className='my-3' >
        <Form.Group controlId="ZipCode">
            <Form.Label>ZipCode</Form.Label>
            <Form.Control type="number" placeholder="ZipCode" />
        </Form.Group>
        </Col>
        </Row>
        </Form.Group> 
      </Form>
      {/* </div> */}
      </Row>
      </section>
     
    {/* </Container> */}
    {/* <Container className='mt-5'> */}
      <Row className='border'>
        <Col xs={12}>
          <h3 className='mt-2'>Flight Details</h3>

          <SearchFlight setFlights={setFlights} flights={flights} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs={12}>
          {/* <Content /> */}
        </Col>
      </Row>
    </Container>
    {/* </Container> */}
    </div>
  )
}

export default BookFlight