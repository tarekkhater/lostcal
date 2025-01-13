import "./Adds.css"
import React, { Fragment, useEffect } from 'react'
import NewHeader from '../../Components/NewHeader/NewHeader';
import LostCard from '../../Components/Cards/LostCard'
import { useDispatch, useSelector } from 'react-redux'
import { getLost } from '../../redux/lostSlice'
import { CustomLoader } from "../../Components/alert&loader/CustomLoader"

const Losts = () => {
  const token=useSelector((state)=>state.user.token);
  const lostsData=useSelector((state)=>state.lost.data);
  const myLostPatchLoading=useSelector((state)=>state.patch.loading);
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(getLost(token));
      console.log(lostsData)
  },[token,dispatch,lostsData?.length]);
  return (
    <div className={`losts ${(lostsData?.length <=0 || !lostsData) && 'fullHeight' }`}>
    {
      myLostPatchLoading? (
        <div className="loader-overlay">
          <CustomLoader/>
        </div>
      ):(
        <Fragment>
          <NewHeader active="user"/>
          <div className='heading'>
            <h1>The Lost people Who You Search For Them </h1>
          </div>
          {
            lostsData?.length >0 ? lostsData.map((lostData)=>(
              <LostCard key={lostData.img} lost name={lostData.name} age={lostData.age} address={lostData.address} images={lostData.img} phoneNumber={lostData.phoneNumber} email={lostData.email} id={lostData.id} />
            )):(
              <div className="empty">
                <h1>Sorry, you didn't add any lost people yet </h1>
              </div> 
            )
          }
        </Fragment>
      )
    }
        
    </div>
  )
}

export default Losts