import './App.css';
import React, { Component } from 'react'
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

class App extends Component {
constructor(props) {
    super(props);
    this.state = {
        imageUrl : '',
        boxes: [],
        route: 'signin'
    }
  }

    calculateFaces = ({outputs: out}) => {
        const regions = out[0].data.regions
        const faceBoxes = regions.map(this.calculateFaceLocations)

        return faceBoxes
    }

    // We destructure the region to get the bounding_box and we rename as box
    calculateFaceLocations = ({region_info : {bounding_box : face}}) => {

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

    displayFaceBox = async (boxes) => {
        await this.setState({boxes : boxes})
        //console.log(this.state.box)
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
          .then(this.calculateFaces)            // the response is passed as a parameter
          .then(this.displayFaceBox)            // the calculated face location is passed as a parameter
          .catch(console.log)                   // the error is passed as a paremeter

    }
    signIn = (e) => {
        e.preventDefault()
        this.setState({route: 'home'})
    }
    signOut = (e) => {
        e.preventDefault()
        this.setState({route: 'signin'})
    }
    register = (e) => {
        e.preventDefault()
        this.setState({route: 'register'})
    }

    render(){
        const underDevelopment = <p id='under-development' className='development'>🔧 Site currently under development 🔧</p>
        const {imageUrl, boxes } = this.state
        const signInCode = <React.Fragment>
                                {underDevelopment}
                                <SignIn onSubmit={this.signIn} onRegister={this.register} />
                            </React.Fragment>

        const signUpCode = <React.Fragment>
                                {underDevelopment}
                                <SignUp onSubmit={this.signIn} onLogin={this.signOut}/>
                            </React.Fragment>

        const homeCode = <React.Fragment>
                            <Navigation onSignOut={this.signOut}/>  
                                {underDevelopment}
                            <Logo />
                            <Rank />
                            <ImageLinkForm submitted={this.onSubmitted}/>
                            <FaceRecognition boxes={ boxes } imageUrl = { imageUrl } />
                        </React.Fragment>
        const { route } = this.state
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

}

export default App;
