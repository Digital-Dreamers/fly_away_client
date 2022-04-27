import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Row, Modal, Button } from 'react-bootstrap'
import { upperCase } from '../utilities/utility_functions'

function Reservation() {
  const [data, setData] = useState('')
  const [seat, setSeat] = useState('')
  const [seatId, setSeatId] = useState('')
  const [passenger, setPassenger] = useState('')
  const [seatAvailable] = useState(true)
  const [show, setShow] = useState(false)
  const [cancel, setCancel] = useState(false)

  const reservationId = useParams()
  const navigate = useNavigate()
  const API_URL = `https://fly-away-api.herokuapp.com/customers/reservations/${reservationId.id}`
  const API_URL_DELETE = `https://fly-away-api.herokuapp.com/customers/reservations/cancellation/${data._id}/${passenger._id}`
  const API_URL_UPDATE_SEAT = `https://fly-away-api.herokuapp.com/customers/update-old-seat`

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL)
      const resData = await response.json()

      setSeatId(resData.seatNumberId)
      setSeat(resData.seatNumberId)
      setData(resData)
      setPassenger(resData.passengerId)
    }
    fetchData()
  }, [reservationId.id, API_URL, API_URL_DELETE, seatAvailable])

  const handleDelete = (e) => {
    const deleteData = async () => {
      const response = await fetch(API_URL_DELETE, { method: 'DELETE' })
      return response
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldSeatId: seatId, available: seatAvailable }),
    }
    const updateSeat = async () => {
      const response = await fetch(API_URL_UPDATE_SEAT, requestOptions)
      return response
    }

    setCancel(true)
    updateSeat()
    deleteData()
    setTimeout(() => {
      handleClose()
      navigate('/')
    }, 2500)
  }

  const handleShow = () => {
    setShow(true)
    console.log('delete clicked')
  }
  const handleClose = () => setShow(false)

  return (
    <>
      <h3 className="mt-5">Reservation Number</h3>
      <h6>{!data ? null : data._id}</h6>
      <main className="container">
        <h5 className="mt-5">Flight Infomation</h5>
        <div className="row g-3 mt-3">
          <Modal show={show} onHide={handleClose}>
            {!cancel ? (
              <>
                <Modal.Header closeButton>
                  {' '}
                  <Modal.Title>Cancel Reservation?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>You are about to cancel Reservation:</h5> <br />
                  {data._id}
                </Modal.Body>
              </>
            ) : (
              <Modal.Body>
                <h5>Reservation Deleted</h5> <br />
                {data._id}
              </Modal.Body>
            )}

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="dark" onClick={handleDelete}>
                Cancel Reservation
              </Button>
            </Modal.Footer>
          </Modal>

          <Col xs={12}>
            {!data
              ? null
              : `Flight Number - ${data.flightNumberId.flightNumber}`}
          </Col>
          <Col xs={12}>
            <Row>
              <Col xs={12} md={6}>
                Departing From - {!data ? null : data.flightNumberId.departure}
              </Col>
              <Col xs={12} md={6}>
                Arriving At - {!data ? null : data.flightNumberId.destination}
              </Col>
            </Row>
          </Col>

          <Col xs={12}>
            <Row>
              <Col xs={12} md={6}>
                Departure Date -{' '}
                {!data ? null : data.flightNumberId.departureDate.slice(0, 7)}
              </Col>
              <Col xs={12} md={6}>
                Arrival Date -{' '}
                {!data ? null : data.flightNumberId.arrivalDate.slice(0, 7)}
              </Col>
            </Row>
          </Col>
          {/*  */}
          <Col xs={12}>
            <Row>
              <Col xs={12} md={6}>
                {' '}
                Depature Time -{' '}
                {!data ? null : data.flightNumberId.departureTime}
              </Col>
              <Col xs={12} md={6}>
                {' '}
                Arrival Time - {!data ? null : data.flightNumberId.arrivalTime}
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row>
              <Col xs={12} md={6}>
                Seat Number - {!seat ? null : seat.seatNumber}
              </Col>
              <Col xs={12} md={6}>
                Seat Class - {!seat ? null : upperCase(seat.seatClass)}
              </Col>
            </Row>
          </Col>
        </div>
      </main>
      <h5 className="mt-5">Passenger Information</h5>
      <section className="container mb-5">
        <div className="row g-3 mt-3">
          <Col xs={12}>
            <Row>
              <Col xs={12} md={6}>
                First Name - {!passenger ? null : passenger.firstName}{' '}
              </Col>
              <Col xs={12} md={6}>
                Last Name - {!passenger ? null : passenger.lastName}{' '}
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row>
              <Col xs={12} md={6}>
                Age - {!passenger ? null : passenger.age}
              </Col>
              <Col xs={12} md={6}>
                Address - {!passenger ? null : passenger.address}{' '}
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row>
              <Col xs={12} md={6}>
                City - {!passenger ? null : passenger.city}
              </Col>
              <Col xs={12} md={6}>
                State - {!passenger ? null : passenger.state}{' '}
              </Col>
            </Row>
          </Col>
        </div>
      </section>
      <div className="container">
        {' '}
        <button
          onClick={(e) => handleShow()}
          className="btn btn-dark col-5 m-3"
        >
          Cancel Reservation
        </button>{' '}
      </div>
    </>
  )
}

export default Reservation
