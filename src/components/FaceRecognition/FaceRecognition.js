import './FaceRecognition.css'
const FaceRecognition = ({boxes, imageUrl, visible}) => {

    let key = 1
        return (
            <div id='face-box' className='flex justify-center sm:w-full md:w-1/2 h-auto m-auto my-4'>
                
                 <img id='input-image' src={imageUrl} alt="inserted"  className='w-full' />
               
                {

                    boxes.map(function(box) {
                        const { leftCol, rightCol, topRow, bottomRow} = box || {}
                        return <div id="box" key={key++} className='bounding-box' style={{top: topRow, right: rightCol, left: leftCol, bottom: bottomRow }}></div>
                    })
                }
            </div>
        )

}

export default FaceRecognition

