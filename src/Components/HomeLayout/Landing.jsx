import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="container">
        <div className="img-left">
          <img src="/src/assets/images/paint-splat.png" alt="img-left" />
        </div>
        <div className="content">
          <div className="title">
            <img src="/src/assets/images/landing-title.png" alt="title" />
          </div>
          <div className="text1">
            <p>In a world filled with countless uncertainties, one of the most distressing experiences is the loss of a loved one Whether it is a missing child, a disappeared family member, or a lost friend, the pain and anguish of not knowing their whereabouts can be overwhelming</p>
          </div>
          <div className="glass">
            <img src="/src/assets/images/glasses.png" alt="glass" />
          </div>
          <div className="btn">
            <Link to="/find-the-lost">find the lost</Link>
          </div>
          <div className="text2">
            <p>We help families reunite and work to find lost people and find out what they looked like over the years</p>
          </div>
          <div className="images">
            <img src="/src/assets/images/magnifying-glass.png" alt="img1" />
            <img src="/src/assets/images/missing-person.png" alt="img2" />
            <img src="/src/assets/images/people.png" alt="img3" />
          </div>
        </div>
        <div className="img-right">
          <img src="/src/assets/images/lovepik-splash-material-png-image(r).png" alt="img-right" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
