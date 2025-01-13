import React, { Fragment, useState } from 'react'
import "./LostCard.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteAdds, getAdds } from '../../redux/addSlice';
import { deleteLost, getLost } from '../../redux/lostSlice';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import UpdateAddPopup from '../../Components/UpdatePopups/UpdateAddPopup';
import UpdateMyLostPopup from '../../Components/UpdatePopups/UpdateMyLostPopup';
const LostCard = ({lost,add,search,name,age,address,phoneNumber,images,email,img,id}) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const myLostPatchLoading=useSelector((state)=>state.patch.loading);

  const token=useSelector((state)=>state.user.token);
  const addLoading=useSelector((state)=>state.add.loading);
  const lostLoading=useSelector((state)=>state.lost.loading);
  const dispatch=useDispatch();
  const deleteTheAdd=async()=>{
    try {
      await dispatch(deleteAdds({ id, token })).unwrap();
      dispatch(getAdds(token));
    } catch (error) {
      console.error('Error deleting add:', error);
    }
    id="";
  }
  const deleteTheLost=async()=>{
    try {
      await dispatch(deleteLost({ id, token })).unwrap();
      dispatch(getLost(token));
    } catch (error) {
      console.error('Error deleting lost:', error);
    }
  }
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
    <div  className='lost-card'>
        <div className='card-container'>
            <div className='slider'>
              {
                lost || search ?
                  (images? images.map((img,i)=>(
                    <div key={i} className ={i === currentIndex ? 'images slide active' : 'images slide'}>
                      <img src={img} alt={`child${i}`}/>
                    </div>
                  )):null)
                :(
                <div className='images'>
                  <img src={img} alt={`add/${img}`}/>
                </div>
                )
                
              }
              {
                lost || search ?(
                  <Fragment>
                    <button className="prev" onClick={prevSlide} >
                      &#10094;
                    </button>
                    <button className="next" onClick={nextSlide}>
                      &#10095;
                    </button>
                  </Fragment>
                ):null
              }
            </div>
            <div className='card-info'>
                <p>Name : <span style={{wordWrap:"break-word"}}>{name}</span></p>
                {age && <p>age : <span>{age}</span></p>}
                <p>address : <span>{address}</span></p>
                {email ? <p>contact mail : <span>{email}</span></p>:null}
                <p>contact number: <span>{phoneNumber}</span></p>
                {
                  (add) ?(
                    <div>
                      <span style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <i className="fa-solid fa-pen" onClick={onOpenModal}></i>
                      </span>
                      <button onClick={deleteTheAdd}>found</button>
                      <Modal classNames={{modal:'customModal',
                        overlayAnimationIn: 'customEnterOverlayAnimation',
                        overlayAnimationOut: 'customLeaveOverlayAnimation',
                        modalAnimationIn: 'customEnterModalAnimation',
                        modalAnimationOut: 'customLeaveModalAnimation',}} open={open} onClose={onCloseModal} center>
                        <UpdateAddPopup name={name} address={address} phoneNumber={phoneNumber} img={img} email={email} id={id} />
                      </Modal>
                    </div>
                  ):(lost)?(
                    <div>
                      <span style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <i className="fa-solid fa-pen" onClick={onOpenModal}></i>
                      </span>
                      <button onClick={deleteTheLost}>found</button>
                      <Modal classNames={{modal:'customModal',
                        overlayAnimationIn: 'customEnterOverlayAnimation',
                        overlayAnimationOut: 'customLeaveOverlayAnimation',
                        modalAnimationIn: 'customEnterModalAnimation',
                        modalAnimationOut: 'customLeaveModalAnimation',}} open={open} onClose={onCloseModal} center>
                        <UpdateMyLostPopup name={name} age={age} address={address} phoneNumber={phoneNumber} images={images} email={email} id={id} />
                      </Modal>
                    </div>
                    
                  ):
                  (
                    <div>
                      <button style={{backgroundColor:"#D9D9D9",color:"#000"}}>found</button>
                    </div>
                  )
                }
            </div>
            
        </div>
    </div>
  )
}

export default LostCard