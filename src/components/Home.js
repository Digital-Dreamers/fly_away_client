import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Components
import SearchFlight from './subcomponents/SearchFlight'
import Content from './subcomponents/Content'

function Home() {
  const [flights, setFlights] = useState('')
  return (
    <Container className='mt-5'>
      <Row className='border'>
        <Col xs={12}>
          <h3 className='mt-2'>Search Flight</h3>
          
          <SearchFlight setFlights={setFlights} flights={flights} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs={12}>
          <Content />
        </Col>
      </Row>
    </Container>

  )
}

export default Home