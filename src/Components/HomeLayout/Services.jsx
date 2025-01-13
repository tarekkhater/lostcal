import { Link } from "react-router-dom";
import "./Services.css"
import React from "react";

function Services() {
  return (
    <div className="container2">
      <div id="services" className="services">
        <img src="/src/assets/images/light-blue-sky.png" className="services-img-right" />
        <img src="/src/assets/images/light-blue-sky.png" className="services-img-left" />
        <h2 className="section-header">Our Services</h2>
        <div className="cards-container">
          <div>
            <Link to="/find-the-lost">Find Your Own Lost</Link>
          </div>
          <div>
            <Link to="/add-the-lost">Add The Lost You Found</Link>
          </div>
          <div>
            <Link to="/search">Search About Lost People</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
