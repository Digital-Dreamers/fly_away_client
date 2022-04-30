import React from 'react'
import { Col, Row } from 'react-bootstrap'

function PassengerInformation({ passenger }) {
  return (
    <>
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
    </>
  )
}

export default PassengerInformation
