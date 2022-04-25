import React, { useState, useContext, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap'
import SearchFlight from './subcomponents/SearchFlight'
import { GlobalContext } from './helpers/GlobalContext'

function BookFlight() {
  const flights = useContext(GlobalContext)
  const [allAvailableSeats, setAllAvailableSeats] = useState('')
  const [seatAvailable] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    city: '',
    state: '',
    reservationNumber: '',
    flightNumberId: flights.selectedFlight._id,
    seatNumberId: '',
  })

  const {
    firstName,
    lastName,
    age,
    address,
    city,
    state,
    reservationNumber,
    flightNumberId,
    seatNumberId,
  } = formData

  const API_URL_GET_SEATS = `http://localhost:3000/customers/search/flight/available-seats/${flights.selectedFlight._id}`
  const API_URL_BOOK_RESERVATION = `http://localhost:3000/customers/book`
  const API_URL_UPDATE_SEAT = `http://localhost:3000/customers/update-old-seat`

  const availableSeats = () => {
    if (allAvailableSeats) {
      const seats = allAvailableSeats
        .filter((seat) => seat.available === true)
        .map((seats) => (
          <option key={seats._id}>
            {/* {' '}value={seats._id} */}
            {seats._id}{' '}
          </option>
        ))
      return seats
    }
  }

  console.log(allAvailableSeats[0]._id)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    const userData = {
      firstName,
      lastName,
      address,
      city,
      state,
      age,
      flightNumberId: flights.selectedFlight._id,
      seatNumberId,
      reservationNumber,
    }
    const requestBooking = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }
    const bookFlight = async () => {
      const response = await fetch(API_URL_BOOK_RESERVATION, requestBooking)
      const resData = await response.json()

      console.log(response)
      console.log(resData)
      return response
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oldSeatId: seatNumberId,
        available: seatAvailable,
      }),
    }
    const updateSeat = async () => {
      const response = await fetch(API_URL_UPDATE_SEAT, requestOptions)
      return response
    }

    updateSeat()
    bookFlight()
    console.log('Submit clicked')
  }

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
        <Form className="mt-3" onSubmit={onSubmit}>
          <h3 className="mt-5">Passenger Information</h3>
          <section className="container mb-5">
            <Row className="border">
              <Form.Group controlId="Passenger Info">
                <Row>
                  <Col sm={10} md={6} className="my-3">
                    <Form.Group controlId="firstName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={onChange}
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
                        onChange={onChange}
                        name="lastName"
                        type="text"
                        placeholder=" Last Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {/* <Col sm={14} md={2} className="my-4">
                    <FloatingLabel controlId="age" label="Age:">
                      <Form.Control
                        onChange={onChange}
                        name="age"
                        type="number"
                        min="1"
                        max="105"
                        placeholder="1"
                        inputMode="numeric"
                        required
                      />
                    </FloatingLabel>
                  </Col> */}
                  <Col sm={14} md={7} className="my-3">
                    <Form.Group controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        onChange={onChange}
                        name="address"
                        type="text"
                        placeholder="Address"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={14} md={2} className="my-3">
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        onChange={onChange}
                        name="city"
                        type="text"
                        placeholder="City"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3} md={1} className="my-3">
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        onChange={onChange}
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
                        onChange={onChange}
                        name="zip"
                        type="number"
                        placeholder="Zip Code"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>
            </Row>
          </section>

          <Row className="border">
            <Col xs={12}>
              <h3 className="mt-2">Flight Details</h3>
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
                {!flights
                  ? null
                  : flights.selectedFlight.arrivalDate.slice(0, 7)}
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
              Select Seat Number
              <Row>
                <Form.Select
                  onChange={onChange}
                  name="seatNumberId"
                  aria-label="Default select example"
                >
                  <option>Select Seat</option>
                  {availableSeats()}
                </Form.Select>
              </Row>
            </Col>
          </Col>
          <Button className="m-5" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default BookFlight
