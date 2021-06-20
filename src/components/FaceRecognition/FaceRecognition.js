import React, { Component } from 'react'
import './FaceRecognition.css'
class FaceRecognition extends Component {
    render() {
        const { boxes } = this.props

    const { imageUrl } = this.props
    let key = 1
        console.log(boxes)
        return (
            <div id='face-box' className='flex justify-center w-1/2 h-auto m-auto my-4'>
                
                    <img id='input-image' src={imageUrl}  className='w-full' />
               
                {

                    boxes.map(function(box) {
                        const { leftCol, rightCol, topRow, bottomRow} = box || {}
                        return <div id="box" key={key++} className='bounding-box' style={{top: topRow, right: rightCol, left: leftCol, bottom: bottomRow }}></div>
                    })
                }
            </div>
        )

    }
}

export default FaceRecognition

