import React from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate("");
    const handleClick = () => {
        navigate('/signin')
    }
  return (
     <section className="hero">
      <div className="hero-content">
        <h1>Summer Sale Up To 50% Off</h1>
        <p>Discover premium products at unbeatable prices</p>
        <button className="cta-button" type='button' onClick={handleClick}>Shop Now</button>
      </div>

      <div className="hero-content">
        <h1>Welcome To Mell Mart</h1>
        <p>Experience the best shopping with us at great discounts</p>
      </div>
    </section>
  )
}

export default Landing

