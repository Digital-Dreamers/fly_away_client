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
  const [numberOfPassengers] = useState(2)
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

  const API_URL_GET_SEATS = `http://localhost:3000/customers/search/flight/available-seats/${flights.selectedFlight._id}`
  const API_URL_BOOK_RESERVATION = `http://localhost:3000/customers/book`
  const API_URL_UPDATE_SEAT = `http://localhost:3000/customers/update-old-seat`

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onChangeTwo = (e) => {
    setFormData2((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // const allData = [formData, formData2]
    const allData = [formData]

    if (numberOfPassengers === 2) {
      allData.push(formData2)
    }
    console.log(allData.length)

    const requestBooking = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allData),
      // body: JSON.stringify(formData),
    }
    const bookFlight = async () => {
      const response = await fetch(API_URL_BOOK_RESERVATION, requestBooking)
      const resData = await response.json()
      const id = resData.reservation._id
      console.log(resData)
      navigate(`/reservation/${id}`)

      return resData
    }

    const { seatNumberId: seatNumberIdOne } = formData
    const { seatNumberId: seatNumberIdTwo } = formData2
    // const updateAllSeats = [seatNumberIdOne, seatNumberIdTwo]
    const updateAllSeats = [seatNumberIdOne]
    if (numberOfPassengers === 2) {
      updateAllSeats.push(seatNumberIdTwo)
    }

    console.log(updateAllSeats.length)
    console.log(updateAllSeats)
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        oldSeatId: updateAllSeats,
        available: seatAvailable,
      }),
    }

    const updateSeat = async () => {
      const response = await fetch(API_URL_UPDATE_SEAT, requestOptions)
      console.log(response)
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
          {/*  */}
          <Form onSubmit={onSubmit}>
            {numberOfPassengers === 1 ? (
              <>
                <h3 className="mt-5 mb-5">Passenger Information</h3>
                <PassengerForm onSubmit={onSubmit} onChange={onChange} />
              </>
            ) : (
              <>
                {' '}
                <h3 className="mt-5 mb-5">Passenger One Information</h3>
                <PassengerForm
                  key={1}
                  onSubmit={onSubmit}
                  onChange={onChange}
                />
                <h3 className="mt-5 mb-5">Passenger Two Information</h3>
                <PassengerForm
                  key={2}
                  onSubmit={onSubmit}
                  onChange={onChangeTwo}
                />
              </>
            )}

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
