import { FaCopyright } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';


function Footer() {

  return (
    <Container className='bg-primary text-light mt-4' fluid>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col xs={12} className='text-center'>
          <p className=''><FaCopyright className='me-1' style={{marginBottom: '2px'}}/> 2022 FlyAway.com </p>
          <p>All copyrights reserved</p>
        </Col>
      </Row>
    </Container>
  )
}


export default Footer