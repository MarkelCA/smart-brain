// React
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

//Components
import Navigation from '../../components/Navigation/Navigation'
import Logo from '../../components/Logo/Logo'
import Rank from '../../components/Rank/Rank'
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition'

// Api
import {FACE_DETECT_MODEL} from 'clarifai';
import app from '../../api/api'
// Utils
import { put } from '../../utils/Utils'

const Home = ({ user, setUser, loggedIn }) => {
    const [ imageUrl, setImageUrl ] = useState('')
    const [ boxes, setBoxes ] = useState([])
    const [entries, setEntries ] = useState(user.entries)
    const [ visible, setVisible ] = useState(false)
    const [rank, setRank] = useState(0)
    const navigate = useNavigate();

    useEffect(async() => {
        console.log(entries)
        const rank = await fetch('http://localhost:3000/getRank/' + entries).then(response => response.json())
        setRank(rank)
        console.log(rank)
    }, [entries])
    
    useEffect(() => {
        if(!loggedIn) navigate('/', {replace : true})
    }, [loggedIn, navigate])

    const displayFaceBox = async (boxes) => {
        setBoxes(boxes)
    }


    const submitted = async (event) => {
        event.preventDefault()
        setVisible(true)
        const form = event.target
        const searchField_value = form.querySelector('#search-field').value

        setImageUrl(searchField_value)

        app.models
          .predict(FACE_DETECT_MODEL, imageUrl)
          .then(calculateFaces)            // the response is passed as a parameter
            .then(async (boxes) => {
                displayFaceBox(boxes)
                // Show only if the submit of the image was successfull 
                const userResult = await put('http://localhost:3000/image', {email : user.email })
                console.log(userResult)
                setUser(userResult)
                let entriesResult = userResult.entries
                setEntries(entriesResult += 1)
            })            // the calculated face location is passed as a parameter
          .catch(console.log)                   // the error is passed as a paremeter


    }
    return (
        <>
            <Navigation />  
            <Logo />
            <Rank rank={entries} name={user.name} position={rank}/>
            <ImageLinkForm submitted={submitted}/>
            <FaceRecognition visible={visible} boxes={ boxes } imageUrl = { imageUrl } />
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
