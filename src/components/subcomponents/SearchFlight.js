import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'

//import context
import { GlobalContext } from '../helpers/GlobalContext'

function SearchFlight() {
  let navigate = useNavigate()
  // import global states
  const { setFlights } = useContext(GlobalContext)

  // departure, destination, departureDate, numberOfSeats
  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [numberOfSeats, setNumberOfSeats] = useState('')

  const getData = async () => {
        const response = await fetch(`http://localhost:3000/customers/search?departure=${departure.toUpperCase()}&destination=${destination.toUpperCase()}&departureDate=${departureDate}&numberOfSeats=${numberOfSeats}`)
        const fetchedFlights = await response.json()
        if(fetchedFlights.flights){
          setFlights(fetchedFlights.flights)
          navigate('/results')
        }
      }
      // RDU, JFK, 2022-04-30, 5

  return (
    <Form className='mt-3' onSubmit={ (e)=>{
      e.preventDefault()
      getData()
    }}>
      <Form.Group controlId='search-flight'>
        <Row>
          <Col sm={6} md={3} className='my-3' >
            <FloatingLabel controlId='departure' label='Leaving from'>
              <Form.Control type='text' onChange={(e)=> { setDeparture(e.target.value) }}  required/>
            </FloatingLabel>

          </Col>
          <Col sm={6} md={3} className='my-3' >
            <FloatingLabel controlId='destination' label='Going to'>
              <Form.Control type='text'  onChange={(e)=> { setDestination(e.target.value) }} value={destination} required/>
            </FloatingLabel>
          </Col>
          <Col sm={6} md={3} className='my-3'>
            <FloatingLabel controlId='departure-date' label='Departing'>
              <Form.Control type='date'  onChange={(e)=> { setDepartureDate(e.target.value) }} required/>
            </FloatingLabel>
          </Col>
          <Col sm={6} md={3} className='my-3'>
            <FloatingLabel controlId='number-of-seats' label='Travelers:'>
              <Form.Control type='number' min='1' max='6' placeholder='1' inputMode="numeric"   onChange={(e)=> { setNumberOfSeats(e.target.value) }} required/>
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='my-3'>
              <Button variant='primary' type='submit'>Submit</Button>
          </Col>
        </Row>
      </Form.Group>
    </Form >
  )
}

export default SearchFlight