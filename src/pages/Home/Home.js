// React
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

//Components
import Navigation from '../../components/Navigation/Navigation'
import Logo from '../../components/Logo/Logo'
import Rank from '../../components/Rank/Rank'
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition'

// Utils
import { put } from '../../utils/Utils'

const Home = ({ user, setUser, loggedIn }) => {
    const [ imageUrl, setImageUrl ] = useState('')
    const [ boxes, setBoxes ] = useState([])
    const [entries, setEntries ] = useState(user.entries)
    const [rank, setRank] = useState(0)
    const navigate = useNavigate();
    const [ imageVisible, setImageVisible ] = useState(false)

    useEffect(() => {
        const imgElem = document.querySelector('#input-image')
        if(imageVisible)
            imgElem.classList.remove('not-visible')
        else
            imgElem.classList.add('not-visible')
    }, [imageVisible])

    useEffect(() => {
        // We create a anonymous function to fetch the data
        (async() => {
            const rank = await fetch('http://localhost:3000/getRank/' + entries).then(response => response.json())
            setRank(rank)
        })()
    }, [entries])
    
    useEffect(() => {
        if(!loggedIn) navigate('/', {replace : true})
    }, [loggedIn, navigate])

    const displayFaceBox = async (boxes) => {
        setBoxes(boxes)
    }


    const submitted = async (event) => {
        event.preventDefault()
        const form = event.target
        const searchField_value = form.querySelector('#search-field').value

        setImageUrl(searchField_value)

        // We retrieve the regions and then we set the box on the image
        put('http://localhost:3000/image', {email : user.email, input : searchField_value }).then(async(userResult) => {
            const faceBoxes = userResult.regions.map(calculateFaceLocations)
            await displayFaceBox(faceBoxes)

            setUser(userResult.user)
            setEntries(userResult.user.entries)
            setImageVisible(true)
        }).catch(console.log)

    }
    return (
        <>
            <Navigation />  
            <Logo />
            <Rank rank={entries} name={user.name} position={rank}/>
            <ImageLinkForm submitted={submitted}/>
            <FaceRecognition boxes={ boxes } imageUrl = { imageUrl } />
        </>
    )   
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
