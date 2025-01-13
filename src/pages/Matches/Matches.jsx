import "../Adds&Losts/Adds.css"
import React, { useEffect } from 'react'
import NewHeader from '../../Components/NewHeader/NewHeader'
import { useDispatch, useSelector } from 'react-redux'
import { allMatches } from '../../redux/matchesSlice';
import MatchesCard from '../../Components/Cards/MatchesCard';
import { selectMatchesData } from '../../redux/selectors/selectors';

const Matches = () => {
  const token = useSelector((state)=>state.user.token);
  // const matchesData=useSelector((state)=>state.matches.data);
  const matchesData=useSelector(selectMatchesData);
  const dispatch=useDispatch();
  useEffect(() => {
      dispatch(allMatches(token));
  }, [dispatch, token,matchesData?.length]);
  return (
    <div className={`matches ${matchesData?.length <=0 && 'fullHeight' }`}>
        <NewHeader active="user"/>
        <div className='heading'>
            <h1>If the images match anyone, you will find them here </h1>
        </div>
        {
          matchesData?.length > 0  ? matchesData.map((match,i)=>(
            <MatchesCard key={i} name={match.name} age={match.age ? match.age : null} address={match.address} images={match.img} phoneNumber={match.phoneNumber} email={match.email}/>
          ))
          :(
            <div className="empty">
                <h1>Sorry,the images of your lost didn't match yet  </h1>
            </div>  
          )
        }
    </div>
  )
}

export default Matches