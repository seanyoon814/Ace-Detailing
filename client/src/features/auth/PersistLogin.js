import {Outlet, Link} from 'react-router-dom';
import {useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import {useEffect, useRef, useState} from 'react';
import usePersist from '../../hooks/usePersist';
import {useRefreshMutation} from './authApiSlice';
const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if(effectRan.current === true || process.env.NODE_ENV === 'development'){
            const verifyRefreshToken = async () => {
                console.log("Verifying Refresh Token");
                try{
                    await refresh();

                    // Flag to allow credentials to be set
                    setTrueSuccess(true);
                }catch (err){
                    console.log(err);
                }
            }
            if(!token && persist){ verifyRefreshToken();}

        }
        return () => effectRan.current = true;
    },[]);

    if(!persist){ // Dont want to persist login
        return <Outlet />
    } else if(isLoading) { 
        return <div>Loading...</div>
    } else if(isError){ // When refreshToken expires, persist = yes, token = no
        return( 
        <div style={{"color":"white"}}>
            <h1>Unauthorized or login expired</h1>
            <p style={{"color":"white", "fontSize":"30px"}}> { `${error.data.message} - `}
                <Link to="/user" style={{"color":"white", "fontSize":"30px", "textDecoration":"underline"}}> 
                    Click here to redirect to Login Page
                </Link>
            </p>
        </div>)
    } else if(isSuccess && trueSuccess){ // token = yes, persist = yes
        return <Outlet />
    } else if(token && isUninitialized){ // First time login; token = yes, persist = yes 
        return <Outlet />
    }
}
export default PersistLogin;