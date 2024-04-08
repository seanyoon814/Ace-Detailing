import {useSelector} from 'react-redux';
import {selectCurrentToken} from '../features/auth/authSlice';
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let name = '';
    let admin = false;
    let id = '';
    if(token){
        const {name:tName, admin:tAdmin, id:tID} = jwtDecode(token).UserInfo
        name = tName;
        admin = tAdmin;
        id = tID;
    }
    return {name, admin,id}
}

export default useAuth;