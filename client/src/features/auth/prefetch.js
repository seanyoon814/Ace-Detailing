import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import {useSendLogoutMutation, useGetDataQuery, useCheckTokenMutation, } from './authApiSlice';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
// USE BASEQUERYHERE CALLS 
const Prefetch = () => {
    const [logout, {
        isLoading,
        isError,
        isSuccess,
    }] = useSendLogoutMutation();
    const [check, {
        isLoading: checkLoading,
        isError: checkError,
        isSuccess: checkSuccess,
    }] = useCheckTokenMutation();
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    
    useEffect(() => { // PROBLEM RIGHT NOW REFRESH TOKEN ISNT SENDING
        if(!token || checkError){
            toast.error("Unauthorized. Please login. Redirecting to login page...")
            logout()
            navigate('/user');
        }
        
        console.log("subbing");
        
        return () => {// TODO ENOUGH TIME: Create vehicleAPI to subscribe/unscribe to the vehicle data  
            console.log("unsubbing");
            // vehicles.unsubscribe();
        }

    
    },[dispatch,navigate,token])


    return (
        <Outlet />
    )
}
export default Prefetch;