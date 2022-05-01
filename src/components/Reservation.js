import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Row, Modal, Button, Container } from 'react-bootstrap'
import { upperCase } from '../utilities/utility_functions'
import PassengerInformation from './PassengerInformation'

function Reservation() {
  const [data, setData] = useState('')
  const [seatOne, setSeatOne] = useState('')
  const [seatTwo, setSeatTwo] = useState('')
  const [seatId, setSeatId] = useState([])
  const [passengerOne, setPassengerOne] = useState('')
  const [passengerTwo, setPassengerTwo] = useState('')
  const [passengerOneId, setPassengerOneId] = useState('')
  const [passengerTwoId, setPassengerTwoId] = useState('')
  const [seatAvailable] = useState(true)
  const [show, setShow] = useState(false)
  const [cancel, setCancel] = useState(false)
  const reservationId = useParams()
  const navigate = useNavigate()

  const API_URL_SINGLE_RESERVATION = `http://localhost:3000/customers/reservations/${reservationId.id}`
  const API_URL_DELETE = `http://localhost:3000/customers/reservations/cancellation/${data._id}/${passengerOneId}-${passengerTwoId}`
  const API_URL_UPDATE_SEAT = `http://localhost:3000/customers/update-old-seat`

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL_SINGLE_RESERVATION)
      const resData = await response.json()

      setSeatId(resData.seatNumberId)
      setSeatOne(resData.seatNumberId[0])
      setData(resData)
      setPassengerOne(resData.passengerId[0])
      setPassengerTwo(resData.passengerId[1])
      setPassengerOneId(resData.passengerId[0]._id)
      if (resData.passengerId.length === 2) {
        setPassengerTwoId(resData.passengerId[1]._id)
        setSeatTwo(resData.seatNumberId[1])
      }
    }
    fetchData()
  }, [API_URL_SINGLE_RESERVATION, API_URL_DELETE])

  const handleDelete = (e) => {
    const deleteData = async () => {
      const response = await fetch(API_URL_DELETE, { method: 'DELETE' })
      return response
    }

    const updateAllSeats = seatId

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
  }
  const handleClose = () => setShow(false)

  const displayReservation = () => {
    return (
      <div>
        <h3 className="mt-5">Reservation Number</h3>
        <h6 className="mb-5">{!data ? null : data._id}</h6>
        <Container className="border">
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
                      <h5>
                        {passengerOne.firstName}, you are about to cancel your
                        reservation:
                      </h5>{' '}
                      <br />
                      {data._id}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="dark" onClick={handleDelete}>
                        Cancel Reservation
                      </Button>
                    </Modal.Footer>
                  </>
                ) : (
                  <Modal.Body>
                    <h5>Reservation Cancelled</h5> <br />
                    {data._id}
                  </Modal.Body>
                )}
              </Modal>
              <Col xs={12}>
                {!data
                  ? null
                  : `Flight Number - ${data.flightNumberId.flightNumber}`}
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={12} md={6}>
                    Departing From -{' '}
                    {!data ? null : data.flightNumberId.departure}
                  </Col>
                  <Col xs={12} md={6}>
                    Arriving At -{' '}
                    {!data ? null : data.flightNumberId.destination}
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={12} md={6}>
                    Departure Date -{' '}
                    {!data
                      ? null
                      : data.flightNumberId.departureDate.slice(0, 7)}
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
                    Arrival Time -{' '}
                    {!data ? null : data.flightNumberId.arrivalTime}
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={12} md={6}>
                    Seat Number - {!seatOne ? null : seatOne.seatNumber}
                  </Col>
                  <Col xs={12} md={6}>
                    Seat Class -{' '}
                    {!seatOne ? null : upperCase(seatOne.seatClass)}
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={12} md={6}>
                    {!seatTwo ? null : `Seat Number - ${seatTwo.seatNumber}`}
                  </Col>
                  <Col xs={12} md={6}>
                    {!seatTwo
                      ? null
                      : `Seat Class - ${upperCase(seatTwo.seatClass)}`}
                  </Col>
                </Row>
              </Col>
            </div>
          </main>
          {!passengerTwo ? (
            <>
              {' '}
              <h5 className="mt-5">Passenger Information</h5>
              <PassengerInformation passenger={passengerOne} />
            </>
          ) : (
            <>
              <h5 className="mt-5">Passenger One Information</h5>
              <PassengerInformation passenger={passengerOne} />
              <h5 className="mt-5">Passenger Two Information</h5>
              <PassengerInformation passenger={passengerTwo} />
            </>
          )}
        </Container>
        <div className="container mt-5">
          {' '}
          <button
            onClick={(e) => handleShow()}
            className="btn btn-dark col-5 m-3"
          >
            Cancel Reservation
          </button>{' '}
        </div>
      </div>
    )
  }

  const displayReservationMsg = () => {
    return (
      <>
        <h3 className="mt-5">Reservation not found</h3>
        <Button className="mt-5 bg-dark" onClick={(e) => navigate('/')}>
          Back
        </Button>
      </>
    )
  }

  return <>{data ? displayReservation() : displayReservationMsg()} </>
}

export default Reservation
