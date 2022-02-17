// React
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Styles
import './App.css';
// Particles
import Particles from "react-tsparticles";
import ParticlesConfig from "../particlesjs-config.json"
// Pages
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'


const App = () => {
    const [user, setUser ] = useState({
        id      : '',
        email   : '',
        name    : '',
        entries : '',
        joined  : ''
    })

    return (
        <div className="App">
            <Particles id="tsparticles" options={ParticlesConfig} />
            {
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <SignIn setUser={setUser} /> } />
                        <Route path="/register" element={ <SignUp /> } />
                        <Route path="/home" element={ <Home/> } />
                    </Routes>
                </BrowserRouter>
            }
        </div>
    );

}



export default App;
