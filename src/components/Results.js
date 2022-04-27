import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// bootstrap comps
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// Global Context
import { GlobalContext } from './helpers/GlobalContext'

function Results() {
  const { flights, setSelectedFlight } = useContext(GlobalContext)
  const [filteredFlights, setFilteredFlights] = useState([])
  let navigate = useNavigate()


  useEffect(() => {
    if(flights.length > 0){
      flights.forEach(async (flight, index) => {
        const response = await fetch(`https://fly-away-api.herokuapp.com/customers/search/flight/available-seats/${flight._id}`)
        const parsedRes = await response.json()
        const seatsArr = parsedRes.seats.filter(seat => seat.available === true)
        if(seatsArr.length > 0){
          flight.availableSeats = seatsArr.length
          setFilteredFlights(...filteredFlights, [flight])
        }
      })
    }
  }, [])
  
  const handleBookClick = (flight) => {
    setSelectedFlight(flight)
    navigate('/book-flight')
  }

  const renderFlights = () => {
    return (
      <>
        {filteredFlights.map((flight) => {
          return (
            <Col xs={12} className="border mb-3" key={flight._id}>
              <Row>
                <Col xs={12}>
                  <h2>{flight.flightNumber}</h2>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={4}>
                  <Row>
                    <Col xs={12}>
                      <p>Departing: {flight.departure}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <p>Destination: {flight.destination}</p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6} md={4}>
                  <Row>
                    <Col xs={12}>
                      <p>Departure Time: {flight.departureTime}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <p>Arrival Time: {flight.arrivalTime}</p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6} md={4}>
                  <Row>
                    <Col xs={12}>
                      <p>Seat Price: {flight.seatPrice}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <p>Available Seats: {flight.availableSeats}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="my-3 d-flex justify-content-center">
                <Col xs={6} md={3}>
                  <Button
                    variant="primary"
                    onClick={() => handleBookClick(flight)}
                  >
                    Book Now!
                  </Button>
                </Col>
              </Row>
            </Col>
          )
        })}
      </>
    )
  }

  const renderNoFlights = () => {
    return(
      <Container>
        <Row>
          <Col xs={12}>
          <h4>No Flights found</h4>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col xs={12}>
            <Button onClick={()=> navigate('/')}>Back Home</Button>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container className="mt-5">
      <Row>{filteredFlights.length > 0 ? renderFlights() : renderNoFlights() }</Row>
    </Container>
  )
}

export default Results
