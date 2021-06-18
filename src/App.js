import './App.css';
import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from "react-tsparticles";
import ParticlesConfig from "./particlesjs-config.json"
//import FaceRecognition from './FaceRecognition'
//import Credits from './components/Credits/Credits'

class App extends Component {
constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  }

  particlesLoaded(container) {
    console.log(container);
  }
    render(){
      return (
        <div className="App">
          <Particles className='particles'
                id="tsparticles"
                //url="http://foo.bar/particles.json"
                init={this.particlesInit}
                loaded={this.particlesLoaded} 
                  options={ParticlesConfig}
            />
            <Navigation />  
            <Logo />
            <Rank />
            <ImageLinkForm />
        </div>
          
      );
    }

}

export default App;
