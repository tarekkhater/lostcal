import React, { useEffect, useState } from 'react';
import "./UpdateMyLostPopup.css";
import addImage from "../../assets/images/image-gallery 1.png";
import { useDispatch, useSelector } from 'react-redux';
import { updateMyLost } from '../../redux/patchSlice';
import { getLost } from '../../redux/lostSlice';
import { showErrorAlert } from '../alert&loader/alerts';

const UpdateMyLostPopup = ({ name, age, address, phoneNumber, images, email, id }) => {
    const token = useSelector((state) => state.user.token);
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedAge, setUpdatedAge] = useState(age);
    const [updatedAddress, setUpdatedAddress] = useState(address);
    const [updatedEmail, setUpdatedEmail] = useState(email);
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(phoneNumber);
    const [updatedImages, setUpdatedImages] = useState(images);
    const [originalImages]=useState(images)
    const dispatch = useDispatch();

    useEffect(() => {
        convertImagesToFiles(originalImages);
    }, [originalImages]);


    const convertImagesToFiles = async (imageUrls) => {
        try {
            const convertedImages = await Promise.all(imageUrls.map(async (imageUrl) => {
                if (imageUrl.includes('cloudinary')) {
                    const response = await fetch(imageUrl);
                    if (!response.ok) {
                        throw new Error('Failed to fetch image');
                    }
                    const blob = await response.blob();
                    return new File([blob], `image_${Date.now()}`, { type: blob.type });
                } else {
                    return imageUrl;
                }
            }));
            setUpdatedImages(convertedImages);
        } catch (error) {
            console.error('Error converting images:', error);
        }
    };


const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [...updatedImages];
    for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
    }
    setUpdatedImages(newImages);
    
};

const handleRemoveImage = (index) => {
    const newImages = [...updatedImages];
    newImages.splice(index, 1);
    setUpdatedImages(newImages);
};

const handleSubmit = async () => {
    if (updatedImages.length < 3 || updatedImages.length > 5) {
        showErrorAlert("Please add images between 3 to 5 images");
        return;
    }
    if (!name || !age || !address || !email || !phoneNumber) {
        showErrorAlert("Please fill out all the fields");
        return;
    }
    setUpdatedImages(originalImages)
    const formData = new FormData();
    formData.append("name", updatedName);
    formData.append("age", updatedAge);
    formData.append("address", updatedAddress);
    formData.append("email", updatedEmail);
    formData.append("phoneNumber", updatedPhoneNumber);
    
    if (updatedImages.length === 0) {
        images.forEach((image) => {
            formData.append(`img`, image);
        });
    } else {
        updatedImages.forEach((image) => {
            formData.append(`img`, image);
        });
    }
    // dispatch(updateMyLost({ formData, id, token }))

    try {
        await dispatch(updateMyLost({ formData, id, token })).unwrap();
        dispatch(getLost(token));
    } catch (error) {
        console.error('Error updating lost person:', error);
    }

};

    return (
        <div className='update-popup'>
            <form>
                <div className='left-side'>
                    <h1>Update Your Lost Person's Data </h1>
                    <div className='img-container'>
                        {updatedImages.map((image, index) => (
                            <div key={index} className='image-wrapper'>
                                <img src={typeof image === "string" ? image : URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
                                <button type='button' className='remove-button' onClick={() => handleRemoveImage(index)}>X</button>
                            </div>
                        ))}
                        {updatedImages.length < 5 && (
                            <label htmlFor="upload-image" className='add-image-label'>
                                <img src={addImage} alt='add-img' />
                            </label>
                        )}
                        <input type="file" accept="image/*" id="upload-image" multiple style={{ display: 'none' }} onChange={handleImageChange} />
                    </div>
                </div>
                <div>
                    <label>Name</label><br />
                    <div className='label-container'>
                        <input type='text' value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                    </div>
                    <label>Age</label><br />
                    <div className='label-container'>
                        <input type='text' value={updatedAge} onChange={(e) => setUpdatedAge(e.target.value)} />
                    </div>
                    <label>Missing address</label><br />
                    <div className='label-container'>
                        <input type='text' value={updatedAddress} onChange={(e) => setUpdatedAddress(e.target.value)} />
                    </div>
                    <label>Email</label><br />
                    <div className='label-container'>
                        <input type='email' value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
                    </div>
                    <label>Phone number</label><br />
                    <div className='label-container'>
                        <input type='text' value={updatedPhoneNumber} onChange={(e) => setUpdatedPhoneNumber(e.target.value)} />
                    </div>
                </div>
            </form>
            <button onClick={handleSubmit}>Update</button>
        </div>
    );
};

export default UpdateMyLostPopup;
