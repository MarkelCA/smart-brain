// React
import { useState } from 'react'

//Components
import Navigation from '../../components/Navigation/Navigation'
import Logo from '../../components/Logo/Logo'
import Rank from '../../components/Rank/Rank'
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition'

// Api
import Clarifai, {FACE_DETECT_MODEL} from 'clarifai';
import app from '../../api/api'

const Home = () => {
    const [ imageUrl, setImageUrl ] = useState('')
    const [ boxes, setBoxes ] = useState([])

    const displayFaceBox = async (boxes) => {
        setBoxes(boxes)
    }

    const submitted = async (event) => {
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
        <>
            <Navigation />  
            <Logo />
            <Rank />
            <ImageLinkForm submitted={submitted}/>
            <FaceRecognition boxes={ boxes } imageUrl = { imageUrl } />
        </>
    )
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
export default Home
