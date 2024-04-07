import {useState, useEffect, useRef} from 'react';
import {useNavigate, } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import {setCredentials} from '../../features/auth/authSlice';
import {toast} from 'react-toastify';
import "./UserSection.css";
import { Helmet } from "react-helmet";
import Header from '../Header/Header';
import backend from "../../constants/backend";
import { useLoginMutation } from '../../features/auth/authApiSlice';
import usePersist from '../../hooks/usePersist';

function UserSection() {
    const { apiUrl } = backend;
    const userRef = useRef<HTMLInputElement>();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Loading State
    const [login, {isLoading}] = useLoginMutation();

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    },[])
    
    useEffect(()=>{
        setError('');
    }, [email, password])
    
    const errClass = error ? "errmsg" : "offscreen";
    
    // if(isLoading){
    //     return <div>Loading...</div>
    // }

    // Inputs change handle:
    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value);}
    const handlePwdChange = (e:React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value);}
    const handleToggle = () => setPersist(prev => !prev);

    // OnSubmit handle:
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform login logic here using formData
        try{
            const {accessToken} = await login({email, password}).unwrap();
            await dispatch(setCredentials({accessToken}));
            setEmail('');
            setPassword('');
            navigate('/portal');
        } catch (err){
            if(!err.status){
                toast.error('No Server Response. Please try again later.');
            } else if(err.status === 400){
                toast.error('Missing Username or Password. Please try again.');
            }else if(err.status === 401){
                toast.error('Unauthorized: Invalid Credentials. Please try again.');
            } else {
                setError(err.data?.message);
            }
            errRef.current.focus();
        }
    }
    return (
        <div className="login-background">
            <Header/>
            <Helmet>
                <title>User Portal</title>
            </Helmet>
            <div id="login-container">
                <div id="login-content">
                    <div id="login">
                        <h1>User Portal</h1>
                        <p>Please use the login details from the administrator to enter the user portal.</p>
                        <form onSubmit={handleSubmit}>
                            <label>Email: <br></br>
                            <input className="input-group-text"
                                type="email"
                                name="email"
                                ref={userRef}
                                value={email} 
                                onChange={handleEmailChange}
                                autoComplete='off'
                                required
                                />
                            </label>
                            <br></br>
                            <label>Password: <br></br>
                                <input className="input-group-text"
                                type="password"
                                name="password" 
                                value={password}
                                onChange={handlePwdChange}
                                required/>
                            </label>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Login</button>
                            
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="persist">
                                <input 
                                    type="checkbox"
                                    className="form-check-input"
                                    id="persist"
                                    onChange={handleToggle}
                                    checked={persist}
                                    />
                                    Trust This Device?
                                </label>
                            </div>
                        </form>
                            {/* <a href="/user/forgot_password" className="btn btn-link">Forgot password?</a> */}
                            <p ref={errRef} className={errClass} aria-live="assertive">{error}</p>
                    </div> 
                    <div className="login-img">
                    </div>
                </div>
                
                <br />

            </div>
            <span id = "hidden"></span>
            <span id = "main-navbar"></span>
            <span id = "header-sidebar-toggle"></span>
            <span id = "logo"></span>
        </div>
    )
}

export default UserSection;