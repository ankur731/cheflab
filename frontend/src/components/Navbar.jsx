import React from 'react'
import "./Navbar.css"
import logo from "../assets/images/CHEFLAB.png"
import { useNavigate } from 'react-router-dom'


function Navbar() {
  const navigate = useNavigate();

  const sendToHome = () => {
    navigate("/");
  }
  


  return (
    <div className='navbar'>
      <img onClick={sendToHome} className='logo' src={logo} alt='logo' />
      {/* <button onClick={sendToViz} className='viz-btn'>Vizualization</button> */}
    </div>
  )
}

export default Navbar
