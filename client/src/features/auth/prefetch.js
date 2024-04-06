import {store} from '../../store';
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import {useSendLogoutMutation, useRefreshMutation} from './authApiSlice';
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

const Prefetch = () => {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();
    useEffect(() => {
        if(token) {// TODO IF ENOUGHT TIME: CALL VEHICLE API TO SUB AND STORE DATA
            console.log("subbing");
        } else {
            return ( 
                toast.error("You must be logged in to view the portal. Redirecting to login page."),
                sendLogout(),
                navigate('/user')
            );
        }
        
        return () => {// TODO ENOUGH TIME: Create vehicleAPI to subscribe/unscribe to the vehicle data  
            console.log("unsubbing");
        }
    },[navigate,token])

    return (
        <Outlet />
    )
}
export default Prefetch;