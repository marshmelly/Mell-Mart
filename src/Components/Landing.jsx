import React from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate("");
    const handleClick = () => {
        navigate('/home')
    }
  return (
     <section className="hero">
      <div className="hero-content">
        <h1>Summer Sale Up To 50% Off</h1>
        <p>Discover premium products at unbeatable prices</p>
        <button className="cta-button" type='button' onClick={handleClick}>Shop Now</button>
      </div>
    </section>
  )
}

export default Landing

