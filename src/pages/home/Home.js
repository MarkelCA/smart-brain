import Navigation from '../../components/Navigation/Navigation'
import Logo from '../../components/Logo/Logo'
import Rank from '../../components/Rank/Rank'
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition'

const Home = ({submitted, imageUrl, boxes }) => {
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

export default Home
