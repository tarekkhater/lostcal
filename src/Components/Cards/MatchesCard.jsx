import React, { Fragment, useState } from 'react'
import "./LostCard.css"
const MatchesCard = ({name,age,address,email,phoneNumber,images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className='lost-card'>
        <div className="card-container">
            <div className="slider">
                {
                    Array.isArray(images) ? 
                    (<Fragment>
                      {images && images.map((image,i)=>(
                        <div key={i} className ={i === currentIndex ? 'images slide active' : 'images slide'}>
                          <img src={image} alt={`child${i}`}/>
                        </div>
                      ))
                      }
                       <button className="prev" onClick={prevSlide} >
                          &#10094;
                        </button>
                        <button className="next" onClick={nextSlide}>
                          &#10095;
                        </button>
                    </Fragment>):(
                      <div className='images'>
                        <img src={images} alt={`matches/${images}`}/>
                      </div>
                    )
                }
            </div>
            <div className="card-info">
              <p>Name : <span style={{wordWrap:"break-word"}}>{name}</span></p>
              {age ? <p>age : <span>{age}</span></p>:null}
              <p>address : <span>{address}</span></p>
              {email ? <p>contact mail : <span>{email}</span></p>:null}
              <p>contact number: <span>{phoneNumber}</span></p>
            </div>
        </div>
    </div>
  )
}

export default MatchesCard