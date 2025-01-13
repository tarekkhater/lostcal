import React, { useEffect, useState } from 'react'
import addImage from "../../assets/images/image-gallery 1.png";
import { useDispatch, useSelector } from 'react-redux';
import { updateAdd } from '../../redux/patchSlice';
import { getUserInfo } from '../../redux/authSlice';
import { getAdds } from '../../redux/addSlice';
const UpdateAddPopup = ({name,address,email,phoneNumber,img,id}) => {
    const token=useSelector((state)=>state.user.token);
    const [updatedName,setUpdatedName]=useState(name)
    const [updatedAddress,setUpdatedAddress]=useState(address)
    const [updatedEmail,setUpdatedEmail]=useState(email)
    const [updatedPhoneNumber,setUpdatedPhoneNumber]=useState(phoneNumber);
    const [updatedImg,setUpdatedImg]=useState(img);
    const dispatch=useDispatch();
    
    useEffect(()=>{
        if(img){
            convertImgToFile(img);
        }
    },[img])
    
    const convertImgToFile = async () => {
        try {
            const response = await fetch(img);
            const blob = await response.blob();
            setUpdatedImg(blob);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
    const handleRemoveImg=()=>{
        setUpdatedImg(null);
        
    };
    const handleImgChange=(e)=>{
        const file = e.target.files[0];
        setUpdatedImg(file);
    }
    const handleSubmit=async()=>{
        if( !updatedName|| !updatedAddress || !updatedEmail || !updatedPhoneNumber || !updatedPhoneNumber ){
            showErrorAlert("Please fill out all the fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", updatedName);
        formData.append("address", updatedAddress);
        formData.append("email", updatedEmail);
        formData.append("phoneNumber", updatedPhoneNumber);
        formData.append("img", updatedImg);

        // dispatch(updateAdd({ formData, token, id }));

        try {
            await dispatch(updateAdd({ formData, id, token })).unwrap();
            dispatch(getAdds(token));
        } catch (error) {
            console.error('Error updating lost person:', error);
        }
            
    }
  return (
    <div className='update-popup'>
        <form>
            <div className='left-side'>
                <h1>Update The Person's Data Who You Find </h1>
                <div className='img-container'>
                {
                    updatedImg?(
                        <div className='image-wrapper'>
                            <img
                                src={typeof updatedImg === "string" ? updatedImg : URL.createObjectURL(updatedImg)}
                                alt="Uploaded"
                                style={{ width: '200px', height: '200px' }}
                            />
                            <button type='button' className='remove-button' onClick={handleRemoveImg} >X</button>
                        </div>
                    ):(
                        <label htmlFor="upload-image" className='add-image-label'>
                            <img src={addImage} alt='add-img' />
                        </label>
                    )
                }
                    <input type="file" accept="image/*" id="upload-image" style={{ display: 'none' }} onChange={handleImgChange} />
                </div>
            </div>
            <div>
                <label>Name</label><br/>
                <div className='label-container'>
                    <input type='text' value={updatedName} onChange={(e)=>setUpdatedName(e.target.value)} ></input>
                </div>
                <label>Address</label><br/>
                <div className='label-container'>
                    <input type='text' value={updatedAddress} onChange={(e)=>setUpdatedAddress(e.target.value)} ></input>
                </div>
                <label>Email</label><br/>
                <div className='label-container'>
                    <input type='email' value={updatedEmail} onChange={(e)=>setUpdatedEmail(e.target.value)} ></input>
                </div>
                <label>phoneNumber</label><br/>
                <div className='label-container'>
                    <input type='text' value={updatedPhoneNumber} onChange={(e)=>setUpdatedPhoneNumber(e.target.value)}></input>
                </div>
            </div>
        </form>
        <button onClick={handleSubmit}>Update</button>
    </div>
  )
}

export default UpdateAddPopup