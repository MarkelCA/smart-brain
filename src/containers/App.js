import './App.css';
import React, { Component, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clarifai, {FACE_DETECT_MODEL} from 'clarifai';
import Particles from "react-tsparticles";
import ParticlesConfig from "../particlesjs-config.json"

// Pages
import Home from '../pages/home/Home';
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'

const app = new Clarifai.App({
    apiKey: "49a9260111a945d48126bac0a1d2cd3c",
});

const App = () => {
    const [ imageUrl, setImageUrl ] = useState('')
    const [ boxes, setBoxes ] = useState([])
    const [ user, setUser ] = useState({
        id      : '',
        email   : '',
        name    : '',
        entries : '',
        joined  : ''
    })

    const displayFaceBox = async (boxes) => {
        setBoxes(boxes)
    }

    const onSubmitted = async (event) => {
        event.preventDefault()
        const form = event.target
        const searchField_value = form.querySelector('#search-field').value

        setImageUrl(searchField_value)

        const { FACE_DETECT_MODEL } = Clarifai

        app.models
          .predict(FACE_DETECT_MODEL, imageUrl)
          .then(calculateFaces)            // the response is passed as a parameter
          .then(displayFaceBox)            // the calculated face location is passed as a parameter
          .catch(console.log)                   // the error is passed as a paremeter

    }

  return (
    <div className="App">
      <Particles id="tsparticles" options={ParticlesConfig} />
        {
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<SignIn setUser={setUser} />} />
                  <Route path="/register" element={<SignUp />} />
                  <Route path="/home" element={<Home submitted={onSubmitted} boxes={boxes} imageUrl={imageUrl}/>} />
              </Routes>
          </BrowserRouter>
        }
    </div>
  );

}


const calculateFaces = ({outputs: out}) => {
    const regions = out[0].data.regions
    const faceBoxes = regions.map(calculateFaceLocations)

    return faceBoxes
}
// We destructure the region to get the bounding_box and we rename as box
const calculateFaceLocations = ({region_info : {bounding_box : face}}) => {

    const image = document.getElementById('input-image')
    const width = Number(image.width)
    const height = Number(image.height)


    return {
        leftCol: face.left_col * width,
        rightCol: width - (face.right_col * width),
        topRow: face.top_row * height,
        bottomRow: height - (face.bottom_row * height)
    }
}

export default App;
