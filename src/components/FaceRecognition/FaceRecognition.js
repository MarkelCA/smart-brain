import './FaceRecognition.css'
const FaceRecognition = ({ imageUrl, box }) => {
    const { leftCol, rightCol, topRow, bottomRow} = box || {}
    return (
        <div id='face-box' className='flex justify-center w-1/2 h-auto m-auto my-4'>
            <img id='input-image' src={imageUrl} alt="image-box" className='w-full' />
            <div id="box" className='bounding-box' style={{top: topRow, right: rightCol, left: leftCol, bottom: bottomRow }}></div>
        </div>
    )
}

export default FaceRecognition

