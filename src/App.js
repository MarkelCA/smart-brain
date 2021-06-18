import './App.css';
import React, { Component } from 'react'
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from "react-tsparticles";
import ParticlesConfig from "./particlesjs-config.json"
//import FaceRecognition from './FacRecognition'
//import Credits from './components/Credits/Credits'

const app = new Clarifai.App({
    apiKey: "49a9260111a945d48126bac0a1d2cd3c",
});

class App extends Component {
constructor(props) {
    super(props);
    this.state = {
        input : '',
        searchField : ''
    }
  }
     
    onSubmitted = (event) => {
        event.preventDefault()
        const form = event.target
        const searchField_value = form.querySelector('#search-field').value

        console.log('click')
        console.log(Clarifai)
        app.models
          .predict( Clarifai.FACE_DETECT_MODEL,
            // THE JPG
            "https://i.insider.com/5d321d4ea209d3146d650b4a?width=1100&format=jpeg&auto=webp" 
          )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

    }
    render(){
      return (
        <div className="App">
          <Particles id="tsparticles" options={ParticlesConfig} />
            <Navigation />  
            <Logo />
            <Rank />
            <ImageLinkForm submitted={this.onSubmitted}/>
        </div>
          
      );
    }

}

export default App;
