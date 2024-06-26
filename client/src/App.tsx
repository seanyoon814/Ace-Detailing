import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './components/Main/Main';
import Portal from "./components/Portal/Portal";
import UserSection from "./components/UserSection/UserSection";
import RegisterSection from './components/RegisterSection/RegisterSection';
import MapSection from './components/MapSection/MapSection';
import DisplayVehicleSection from './components/DisplayVehicleSection/DisplayVehicleSection';
import FAQSection from './components/FAQSection/FAQSection';
import AdminBlog from './components/AdminBlog/AdminBlog'
import Prefetch from './features/auth/prefetch';
import ServicesSection from './components/ServicesSection/ServicesSection';
import ExteriorServices from './components/ExteriorServices/ExteriorServices';
import React from 'react';
import PersistLogin from './features/auth/PersistLogin';
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="/" element={<Main />} />
                    <Route path = "/user" element = {<UserSection />} />
                    <Route path = "/maps" element= {<MapSection/>}></Route>
                    <Route path = "/faq" element= {<FAQSection/>}></Route>
                    <Route path='/blog' element= {<AdminBlog/>}></Route>
                    <Route path='/services' element= {<ExteriorServices/>}></Route>
                    {/* Protected Routes start  */}
                    <Route element ={<PersistLogin/>}>
                    <Route element ={<Prefetch/>}>
                        <Route path = "/portal">
                            <Route index element = {<Portal />} />
                            
                            <Route path = "vehicles"> {/* This redirects to /portal/vehicles */} 
                                <Route index element = {<DisplayVehicleSection />} />
                            </Route>                            
                        </Route> {/* End of /portal */}
                    </Route>{/* End of Protected*/}
                    </Route>
                </Routes> 
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
