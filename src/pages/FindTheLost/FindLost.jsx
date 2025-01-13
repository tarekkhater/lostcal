import { useEffect, useState } from "react";
import "./FindLost.css";
import nameImg from "../../assets/images/profile 3.png";
import ageImg from "../../assets/images/market 1.png";
import addressImg from "../../assets/images/location 1.png";
import splatter from "../../assets/images/paint-splat-paint-splashes-design-use-abstract-vector-illus-illustration-85649903 1.png";
import mainImage from "../../assets/images/undraw_People_search_re_5rre-removebg-preview 1.png";
import logo from "../../assets/images/WhatsApp Image 2023-10-07 at 11.03 1.png";
import addImage from "../../assets/images/image-gallery 1.png";
import emailImg from "../../assets/images/email 2.png";
import phone from "../../assets/images/phone-call 2.png";
import { showErrorAlert, showSuccessAlert } from "../../Components/alert&loader/alerts";
import { useDispatch, useSelector } from "react-redux";
import { findTheLost, resetLostSuccess } from "../../redux/lostSlice";
import { CustomLoader } from "../../Components/alert&loader/CustomLoader";
import { useNavigate } from "react-router-dom";

function FindLost() {
    const token=useSelector((state)=>state.user.token);
    const loading=useSelector((state)=>state.lost.loading);
    const success=useSelector((state)=>state.lost.success);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [images,setImages]=useState([]);
    const [name,setName]=useState('');
    const [age,setAge]=useState('');
    const [address,setAddress]=useState('');
    const [email,setEmail]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('');

    const handleImageChange = (e) => {
      const files=e.target.files;
      const selectedImgs=[];
      for(let i=0; i<files.length;i++){
        selectedImgs.push(files[i]);
      }
      setImages(selectedImgs);
    };
    
    const handleSubmit=()=>{
      if (!token) {
        showErrorAlert("You can't add lost person without login ");
        return
      };
      if(images.length < 3 || images.length > 5){
        showErrorAlert("Please add images between 3 to 5 images");
        return
      }
      if( !name|| !age || !address || !email || !phoneNumber ){
        showErrorAlert("Please fill out all the fields");
        return
      }
      {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('address',address);
        formData.append('email', email);
        formData.append('phoneNumber',phoneNumber);
        images.forEach((image, index) => {
          formData.append(`img`, image);
        });
        dispatch(findTheLost({formData,token}));
        setImages([]);
        setName("");
        setAge("");
        setAddress("");
        setEmail("");
        setPhoneNumber("");
    }
    }
    useEffect(()=>{
      if(success){
        navigate("/");
        dispatch(resetLostSuccess());
      }
    },[success,navigate])
  return (
    <div>
    {
      loading ?(
        <div className="loader-overlay">
          <CustomLoader/>
        </div>
        ):(
        <div className="find-lost">
          <div className="test">
            <div className="find-lost-container">
              <div className="find-lost-left">
                <h2>Find your own lost</h2>
                <p>Please fill out the complete information to reach the lost person , you can help us by send from 3 to 5 images to your lost person </p>
                <div>
                  <div className="find-lost-row">
                    <span>Name</span>
                    <div>
                      <img className="input-logo" src={nameImg} alt="name-img"/>
                      <input type="text" placeholder="Enter name lost person " name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                  </div>
                  <div className="find-lost-row">
                    <span>Age</span>
                    <div>
                      <img className="input-logo" src={ageImg} alt="age-img" />
                      <input type="number" placeholder="Enter age for lost person" name="age" value={age} onChange={(e)=>setAge(e.target.value)}/>
                    </div>
                  </div>
                  <div className="find-lost-row-last">
                    <span>Missing Address</span>
                    <div>
                      <img className="input-logo" src={addressImg} alt="address-img" />
                      <textarea name="address" cols="30" rows="10" placeholder="Enter Address that you lost the person "
                      value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="find-lost-center">
                <div>
                  <img className="splatter" src={splatter} alt="splatter" />
                </div>
                <div>
                  <img className="main-image" src={mainImage} alt="main-img" />
                </div>
                <div>
                  <img className="logo" src={logo} alt="logo" />
                  <div className="find-lost-bottom">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                </div>
              </div>
              <div className="find-lost-right">
                <div className="find-lost-right-img">
                  {
                    images.map((image,index)=>(
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index}`}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ))
                  }
                  {
                    images.length < 5 &&(
                      <label htmlFor="upload-image" style={{ cursor: 'pointer' }}>
                        <img src={addImage} alt='add-img'/>
                      </label>
                    )
                  }
                  <input id="upload-image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} multiple/>
                </div>
                <div>
                  <div className="find-lost-row">
                    <span>Contact mail</span>
                    <div>
                      <img className="input-logo" src={emailImg} alt="email-img" />
                      <input type="email" placeholder="Enter contact mail" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="find-lost-row">
                    <span>Contact number</span>
                    <div>
                      <img className="input-logo" src={phone} alt="phone-img"/>
                      <input type="text" placeholder="Enter contact number" name="phoneNumber" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} pattern="^01[0125][0-9]{8}"/>
                    </div>
                  </div>
                  <button className="find-lost-submit" onClick={handleSubmit}>Confirm information</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>      
      )
    }
    </div>
    
  );
}

export default FindLost;
