import './ImageLinkForm.css'

const ImageLinkForm = () => {
    return (
        <div id="image-link-form" className='z-10'>
            <p className="text-lg m-3 text-white border-b-2 border-blue-300"> This Magic Brain will detect faces in your pictures. Give it a try </p>
            <div id="search-div" className="w-3/5 flex  justify-center m-auto shadow-xl p-4">
                <input type="text" placeholder="Write here your image link" className='p-2 text-gray-600 w-3/4' />
                <button id="search-button" className="
                    p-2
                    m-auto
                    w-1/4
                    bg-blue-300
                    hover:bg-pink-500
                    hover:text-white
                    transform
                    hover:scale-105
                    hover:translate-x-2
                    transition
                    duration-300
                ">Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm
