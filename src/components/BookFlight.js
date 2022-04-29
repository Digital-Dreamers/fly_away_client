import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { GlobalContext } from './helpers/GlobalContext'
import PassengerForm from './subcomponents/PassengerForm'

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
  const [formData2, setFormData2] = useState({
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
  } = formData2

  const API_URL_GET_SEATS = `http://localhost:3000/customers/search/flight/available-seats/${flights.selectedFlight._id}`
  const API_URL_BOOK_RESERVATION = `http://localhost:3000/customers/book`
  const API_URL_UPDATE_SEAT = `http://localhost:3000/customers/update-old-seat`

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log(formData)
  }
  const onChangeTwo = (e) => {
    setFormData2((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log(formData2)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    console.log(formData2)
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
        <Container className="border mt-5">
          <h3 className="mt-5 ">Flight Details</h3>
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
              <Col className="mt-5 mb-5" xs={12} md={6}>
                {' '}
                Arrival Time -{' '}
                {!flights ? null : flights.selectedFlight.arrivalTime}
              </Col>
            </Row>
          </Col>
          <h3 className="mt-5">Passenger Information</h3>
          {/*  */}
          <Form onSubmit={onSubmit}>
            <PassengerForm onSubmit={onSubmit} onChange={onChange} />
            <PassengerForm onSubmit={onSubmit} onChange={onChangeTwo} />

            <Button className="m-5" type="submit">
              Submit
            </Button>
          </Form>
          {/*  */}
        </Container>
      </Container>
    </div>
  )
}

export default BookFlight
