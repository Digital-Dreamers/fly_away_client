import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import passportImg from '../../images/passport-tickets.jpg'
import peakImg from '../../images/peak-bamboo.jpg'

function Content() {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img src={passportImg} alt="Passport" className='d-block w-100' style={{maxHeight: '500px'}}/>
          <Carousel.Caption className='bg-gray-out'>
            <h2>The Vacation of your life</h2>
            <h4>Book it with Fly Away!</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={peakImg} alt="Peak Bamboo"  className='d-block w-100' style={{maxHeight: '500px'}}/>
          <Carousel.Caption className='bg-gray-out' >
            <h4>Tropical Paradise</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
// <a href="https://www.freepik.com/photos/natural-scenery">Natural scenery photo created by 4045 - www.freepik.com</a>
// <a href="https://www.freepik.com/photos/visa">Visa photo created by freepik - www.freepik.com</a>

export default Content