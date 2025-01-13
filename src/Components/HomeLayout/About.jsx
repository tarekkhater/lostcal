import "./About.css"
import React from "react";
function About() {
  return (
    <div className="about">
      <img src="/src/assets/images/question1.png" alt="" className="top-left-img" />
      <img src="/src/assets/images/suspect 1.png" alt="" className="bottom-right-img" />
      <h2 className="section-header">About Us</h2>
      <div className="content-main">
        <h3>We Are Lostcal</h3>
        <p>
          App and website <br></br>help you to find lost people by computer vision with cameras and authors then send to you all information about the lost.
        </p>
      </div>
      <div className="content-second">
        <div className="left-content">
          <p>Our Moto</p>
          <span>
            Don&apos;t worry, <br /> everything will be fine
          </span>
          <img src="/src/assets/images/1600px_COLOURBOX7835621 1.png" alt="" />
        </div>
        <div className="right-content">
          <div className="top-side">
            <p>We seek to expand the surveillance network to all countries</p>
            <img src="/src/assets/images/pngtree-vector-labyrinth-maze-game-illustration-image_1140401 1.png" alt="" />
          </div>
          <div className="bottom-side">
            <p>Our eyes are everywhere for your safety, so your safety is our mission</p>
            <img src="/src/assets/images/WhatsApp Image 2023-10-25 at 6.03 1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
