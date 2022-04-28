import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { GlobalContext } from './helpers/GlobalContext'

function BookFlight() {
  const flights = useContext(GlobalContext)
  const [allAvailableSeats, setAllAvailableSeats] = useState('')
  const [seatAvailable] = useState(false)
  const navigate = useNavigate()
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
          <option value={seats._id.toString()} key={seats._id}>
            {seats.seatNumber}
          </option>
        ))
      return seats
    }
  }

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
      const id = resData.reservation._id

      navigate(`/reservation/${id}`)

      return resData
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
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL_GET_SEATS)
      const resData = await response.json()
      setAllAvailableSeats(resData.seats)
    }
    fetchData()
  }, [API_URL_GET_SEATS])

  return (
    <div>
      <Container className="mt-5">
        <Form className="mt-3" onSubmit={onSubmit}>
          <h3 className="mt-5">Passenger Information</h3>
          <section className="container mb-5">
            <Row className="border">
              <Form.Group controlId="Passenger Info">
                <Row>
                  <Col sm={10} md={5} className="my-3">
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        onChange={onChange}
                        name="firstName"
                        type="text"
                        placeholder=" First Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={10} md={5} className="my-3">
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        onChange={onChange}
                        name="lastName"
                        type="text"
                        placeholder=" Last Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={10} md={2} className="my-3">
                    <Form.Group controlId="age" label="Age:">
                      <Form.Label>Age</Form.Label>

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
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={14} md={9} className="my-3">
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

                  <Col sm={14} md={3} className="my-3">
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
                </Row>
                <Row>
                  <Form.Group className="my-3 pb-3" as={Col} md={3}>
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      onChange={onChange}
                      name="state"
                      type="text"
                      defaultValue="Choose..."
                    >
                      <option>Select State</option>
                      <option value="AK">Alaska</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CT">Connecticut</option>
                      <option value="CO">Colorado</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="IA">Iowa</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="MA">Massachussets</option>
                      <option value="MD">Maryland</option>
                      <option value="ME">Maine</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MO">Missouri</option>
                      <option value="MS">Mississippi</option>
                      <option value="MT">Montana</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="NE">Nebraska</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NV">Nevada</option>
                      <option value="NY">New York</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VA">Virginia</option>
                      <option value="VT">Vermont</option>
                      <option value="WA">Washington</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WV">West Virginia</option>
                      <option value="WY">Wyoming</option>
                    </Form.Select>
                  </Form.Group>
                  <Col sm={14} md={2} className="my-3 pb-3">
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

          <Row className="border mx-1">
            <Col xs={12}>
              <h3 className="mt-2 ">Flight Details</h3>
            </Col>
          </Row>
          <Container className="border mt-5">
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

            <Col xs={12}>
              <Row>
                <Col className="mt-5" xs={12} md={6}>
                  {' '}
                  Departure Time -{' '}
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
              <Col className="mt-5 mb-5 container " xs={6} sm={12} md={2}>
                <Form.Label>Select Seat Number</Form.Label>

                <Row xs={6} sm={6} md={4}>
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
          </Container>
          <Button className="m-5" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default BookFlight
