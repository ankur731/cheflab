import React from 'react'
import "./Visualize.css";
import { TableauEmbed } from "@stoddabr/react-tableau-embed-live";
import Navbar from '../components/Navbar';
import Footer from '../components/landingPage/Footer';

function Visualize() {
  return (
      <div>
          <Navbar />
          <div className='viz-div'>
          <TableauEmbed sourceUrl="https://public.tableau.com/views/hackathon_16966654957710/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link" />
          </div>
          <Footer />
    </div>
  )
}

export default Visualize
