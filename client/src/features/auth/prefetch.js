import {store} from '../../store';
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log("subbing");
        // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
        
        return () => {
            console.log("unsubbing");
            // users = store.dispatch(usersApiSlice.endpoints.getUsers.unsubscribe());
        }
    })

    return (
        <Outlet />
    )
}
export default Prefetch;