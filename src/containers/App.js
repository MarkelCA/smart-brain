import './App.css';
import React, { Component, useState } from 'react'
import Clarifai, {FACE_DETECT_MODEL} from 'clarifai';
import Navigation from '../components/Navigation/Navigation'
import Logo from '../components/Logo/Logo'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import Rank from '../components/Rank/Rank'
import Particles from "react-tsparticles";
import ParticlesConfig from "../particlesjs-config.json"
import FaceRecognition from '../components/FaceRecognition/FaceRecognition'
import SignUp from '../components/SignUp/SignUp'
import SignIn from '../components/SignIn/SignIn'
//import Credits from './components/Credits/Credits'

const app = new Clarifai.App({
    apiKey: "49a9260111a945d48126bac0a1d2cd3c",
});

const App = () => {
    const [ imageUrl, setImageUrl ] = useState('')
    const [ boxes, setBoxes ] = useState([])
    const [ route, setRoute ] = useState('signin')
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

    const signInCode = <SignIn setUser={setUser} onRouteChange={setRoute} /> 
        const signUpCode = <SignUp onRouteChange={setRoute}/>
        const homeCode = <>
                        <Navigation onRouteChange={setRoute}/>  
                        <Logo />
                        <Rank />
                        <ImageLinkForm submitted={onSubmitted}/>
                        <FaceRecognition boxes={ boxes } imageUrl = { imageUrl } />
                    </>

  return (
    <div className="App">
      <Particles id="tsparticles" options={ParticlesConfig} />
        {
            /*
             * if (signin) signInCode
             * else if (register) SignUpCode
             * else homeCode
             */
            route === 'signin' ?  signInCode : 
                (
                    route === 'register' ? signUpCode  : homeCode
                )
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
