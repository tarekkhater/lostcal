import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";


const RequireAuth = ({children}) => {
    const user=useSelector((state)=>state.user.token);
    const location = useLocation();

    if(!user){
        return <Navigate to="/login" state={{path:location.pathname}}/>
    }
  return (
    <div>{children}</div>
  )
}

export default RequireAuth