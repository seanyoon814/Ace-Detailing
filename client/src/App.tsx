import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import UserSection from "./components/UserSection/UserSection";
import RegisterSection from './components/RegisterSection/RegisterSection';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route index element={<Main />} />
                <Route path="/" element={<Main />} />
                <Route path = "/user" element = {<UserSection />} />
                <Route path = "/user/register" element = {<RegisterSection />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
