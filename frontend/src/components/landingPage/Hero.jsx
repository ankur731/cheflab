import React from 'react'
import "./Hero.css"
import Lottie from 'lottie-react'
import hero from "../../assets/lottie/hero.json"
import { Navigate, useNavigate } from 'react-router-dom'

function Hero() {

    const navigate = useNavigate();

    const sendToRec = () => {
        navigate("/recommendation")
    }
  return (
    <div className='hero'>
          <div className='container hero-section'>
              <div className='row'>
                  <div className='col-lg-6 hero-left-div'>
                      <div className='hero-left'>
                          <h1>WE TAKE CARE ABOUT YOUR HEALTH</h1>
                          <p>Make sure your daily nutrition is sufficient. Consult your problem about nutrition with us. </p>
                          <button onClick={sendToRec} className='recbtn'>Get Recommendation</button>
                      </div>
                  </div>
                  <div className='col-lg-6 hero-right-div'>
                      <div className='hero-right'>
                          {/* <img className='heroimg' src={require("../../assets/images/food1.jpg")} alt='food1'/> */}
                          <Lottie animationData={hero}/>
                      </div>
                  </div>
              </div>
        </div>
    </div>
  )
}

export default Hero
