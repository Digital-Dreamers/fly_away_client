import React, { useState, useContext, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap'
import SearchFlight from './subcomponents/SearchFlight'
import { GlobalContext } from './helpers/GlobalContext'

function BookFlight() {
  const flights = useContext(GlobalContext)
  const [allAvailableSeats, setAllAvailableSeats] = useState('')
  const API_URL_GET_SEATS = `http://localhost:3000/customers/search/flight/available-seats/${flights.selectedFlight._id}`

  const availableSeats = () => {
    if (allAvailableSeats) {
      const seats = allAvailableSeats
        .filter((seat) => seat.available === true)
        .map((seats) => <option key={seats._id}> {seats.seatNumber} </option>)
      return seats
    }
  }

  // console.log(allAvailableSeats[0].available)
  // console.log(flights.selectedFlight)
  // console.log()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL_GET_SEATS)
      const resData = await response.json()
      setAllAvailableSeats(resData.seats)
      console.log(resData.seats)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Container className="mt-5">
        {/* <Container className='mt-5'> */}
        <h3 className="mt-5">Passenger Information</h3>
        <section className="container mb-5">
          <Row className="border">
            <Form
              className="mt-3"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <Form.Group controlId="Passenger Info">
                {/* <div className="row g-3 mt-3"> */}
                <Row>
                  <Col sm={10} md={6} className="my-3">
                    <Form.Group controlId="firstName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name="firstName"
                        type="text"
                        placeholder=" First Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={10} md={6} className="my-3">
                    <Form.Group controlId="lastName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name="lastName"
                        type="text"
                        placeholder=" Last Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={14} md={3} className="my-4">
                    <FloatingLabel controlId="age" label="Age:">
                      <Form.Control
                        name="age"
                        type="number"
                        min="1"
                        max="105"
                        placeholder="1"
                        inputMode="numeric"
                        required
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={14} md={6} className="my-3">
                    <Form.Group controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="address"
                        type="text"
                        placeholder="Address"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3} md={1} className="my-3">
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        name="state"
                        type="text"
                        placeholder="State"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={4} md={2} className="my-3">
                    <Form.Group controlId="zip">
                      <Form.Label>ZipCode</Form.Label>
                      <Form.Control
                        name="zip"
                        type="number"
                        placeholder="Zip Code"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
            {/* </div> */}
          </Row>
        </section>

        {/* <Container className='mt-5'> */}
        <Row className="border">
          <Col xs={12}>
            <h3 className="mt-2">Flight Details</h3>
            {/* <SearchFlight setFlights={setFlights} flights={flights} /> */}
          </Col>
        </Row>
        <Col className="mt-5" xs={12}>
          {!flights
            ? null
            : `Flight Number - ${flights.selectedFlight.flightNumber}`}
        </Col>
        <Col xs={12}>
          <Row>
            <Col className="mt-5" xs={12} md={6}>
              Departing From -{' '}
              {!flights ? null : flights.selectedFlight.departure}
            </Col>
            <Col className="mt-5" xs={12} md={6}>
              Arriving At -{' '}
              {!flights ? null : flights.selectedFlight.destination}
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Row>
            <Col className="mt-5" xs={12} md={6}>
              Departure Date -{' '}
              {!flights
                ? null
                : flights.selectedFlight.departureDate.slice(0, 7)}
            </Col>
            <Col className="mt-5" xs={12} md={6}>
              Arrival Date -{' '}
              {!flights ? null : flights.selectedFlight.arrivalDate.slice(0, 7)}
            </Col>
          </Row>
        </Col>
        {/*  */}
        <Col xs={12}>
          <Row>
            <Col className="mt-5" xs={12} md={6}>
              {' '}
              Depature Time -{' '}
              {!flights ? null : flights.selectedFlight.departureTime}
            </Col>
            <Col className="mt-5" xs={12} md={6}>
              {' '}
              Arrival Time -{' '}
              {!flights ? null : flights.selectedFlight.arrivalTime}
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Col className="mt-5 " xs={12} md={12}>
            Seat Number
            <Row>
              <Form.Select aria-label="Default select example">
                <option>Select Seat</option>
                {availableSeats()}
              </Form.Select>
            </Row>
          </Col>
        </Col>
      </Container>
    </div>
  )
}

export default BookFlight
