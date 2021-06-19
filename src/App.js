import './App.css';
import React, { Component } from 'react'
import Clarifai, {FACE_DETECT_MODEL} from 'clarifai';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from "react-tsparticles";
import ParticlesConfig from "./particlesjs-config.json"
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
//import Credits from './components/Credits/Credits'

const app = new Clarifai.App({
    apiKey: "49a9260111a945d48126bac0a1d2cd3c",
});

class App extends Component {
constructor(props) {
    super(props);
    this.state = {
        imageUrl : '',
        faceBox : {}
    }
  }
    calculateFaceLocation = ({outputs}) => {
        console.log(outputs)
        const clarifaiFace = outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('input-image')
        const width = Number(image.width)
        const height = Number(image.height)


        return {
            leftCol: clarifaiFace.left_col * width,
            rightCol: width - (clarifaiFace.right_col * width),
            topRow: clarifaiFace.top_row * height,
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = async (box) => {
        await this.setState({box : box})
        console.log(this.state.box)
    }

    onSubmitted = async (event) => {
        event.preventDefault()
        const form = event.target
        const searchField_value = form.querySelector('#search-field').value

        await this.setState({imageUrl : searchField_value}) // we use await as setState is asynchronous

        const { imageUrl } = this.state
        const { FACE_DETECT_MODEL } = Clarifai

        app.models
          .predict(FACE_DETECT_MODEL, imageUrl)
          .then(this.calculateFaceLocation)     // the response is passed as a parameter
          .then(this.displayFaceBox)            // the calculated face location is passed as a parameter
          .catch(console.log)                   // the error is passed as a paremeter

    }
    render(){
          const {imageUrl, box } = this.state
      return (
        <div className="App">
          <Particles id="tsparticles" options={ParticlesConfig} />
            <Navigation />  
            <Logo />
            <Rank />
            <ImageLinkForm submitted={this.onSubmitted}/>
            <FaceRecognition box={ box } imageUrl = { imageUrl } />
        </div>
          
      );
    }

}

export default App;
