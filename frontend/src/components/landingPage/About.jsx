import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="container about-container">
        <div className="topbar">
          <button className="abtbtn">About Us</button>
          <p>
          At CHEFLAB, we are passionate about bringing you delicious and nutritious recipes tailored to your unique needs. Our advanced recommendation system takes into account your nutritional preferences, along with your individual height and weight, to provide you with recipes that suit your lifestyle and wellness goals. Whether you're looking for a healthy dinner option, a quick breakfast idea, or a special treat, we're here to help you discover the perfect recipe for every occasion. Join us on a culinary journey that's as unique as you are!
          </p>
        </div>
        <div className="bottombar">
          <div className="row">
            
            <div className="bar1 col-lg-4">
              <div className="card bar-card">
                <h4>1 Lac +</h4>
                <p>Recipes available</p>
              </div>
            </div>
            <div className="bar1 col-lg-4">
              <div className="card bar-card">
                <h4>Visualization  </h4>
                <p>Visualize Top recipe </p>
              </div>
            </div>
            <div className="bar1 col-lg-4">
              <div className="card bar-card">
                <h4>Calorie</h4>
                <p>Based Recommendation</p>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
