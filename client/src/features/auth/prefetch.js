import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import {useSendLogoutMutation, useGetDataQuery, useCheckTokenMutation, authApiSlice} from './authApiSlice';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import {store} from '../../store';
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
    
    useEffect(() => {
        if(!token || checkError){
            toast.error("Unauthorized. Please login. Redirecting to login page...")
            logout()
            navigate('/user');
        }
        const vehicles = store.dispatch(authApiSlice.endpoints.getData.initiate('/vehicles'));
        console.log("subbing");
        
        return () => {// TODO ENOUGH TIME: Create vehicleAPI to subscribe/unscribe to the vehicle data  
            console.log("unsubbing");
        }

    
    },[dispatch,navigate,token])


    return (
        <Outlet />
    )
}
export default Prefetch;