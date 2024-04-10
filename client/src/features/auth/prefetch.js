import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import {useSendLogoutMutation, authApiSlice, useCheckTokenMutation} from './authApiSlice';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {store} from '../../store';
import useAuth from '../../hooks/useAuth';
// USE BASEQUERYHERE CALLS 
const Prefetch = () => {
    const [logout, {
        isLoading,
        isError,
        isSuccess,
    }] = useSendLogoutMutation();
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    
    const {admin, id} = useAuth();
    
    useEffect(() => {
        if(!token){
            toast.error("Unauthorized. Please login. Redirecting to login page...")
            logout()
            navigate('/user');
        }
        if(admin) {
            const vehicles = store.dispatch(authApiSlice.util.prefetch('getData','/vehicles',{force:true}));
        }
         else {
            const vehicles = store.dispatch(authApiSlice.util.prefetch('getData',`/vehicles?userId=${id}`,{force:true}));
        }
    },[token])


    return (
        <Outlet />
    )
}
export default Prefetch;