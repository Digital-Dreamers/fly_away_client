import React from 'react'
function Footer() {
    let footerStyle ={
        position:"relative",
        top: "80vh",
        width:"100%"
    }
  return (
    <div className='bg-dark text-light py-3' style={footerStyle}>
        <p className='text-center'> Copyright $copy; FlyAway.com
        All copy rights reserved</p>
    </div>
  )
}


export default Footer