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
import PageNotFound from '../pages/404/404';
export const mainRoute = "http://localhost:3001"


const App = () => {
    const [user, setUser ] = useState({})
    const [loggedIn, logIn ] = useState(false)

    return (
        <div className="App">
            <Particles id="tsparticles" options={ParticlesConfig} />
            {
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <SignIn logIn={logIn} setUser={setUser} /> } />
                        <Route path="/register" element={ <SignUp /> } />
                        <Route path="/home" element={ <Home user={user} setUser={setUser} loggedIn={loggedIn}/> } />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            }
        </div>
    );

}



export default App;
