import React from 'react'
import {Carousel} from 'react-bootstrap'

const Inicio = () => {
  return (
    <Carousel >
    <Carousel.Item className='carousel'>
      <img
        className="d-block w-100"
        src="./images/1.jpg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3 style={{color:"black"}}>First slide label</h3>
        <p style={{color:"black"}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item className='carousel'>
      <img
        className="d-block w-100"
        src="./images/2.jpg"
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3 style={{color:"black"}}>Second slide label</h3>
        <p style={{color:"black"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item className='carousel'>
      <img
        className="d-block w-100"
        src="./images/2.jpg"
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3 style={{color:"black"}}>Third slide label</h3>
        <p style={{color:"black"}}>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default Inicio