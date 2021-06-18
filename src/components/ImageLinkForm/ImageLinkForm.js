import './ImageLinkForm.css'

const ImageLinkForm = ({ submitted }) =>  {
        return (
            <div id="image-link-form" className='z-10'>
                <p className="text-lg m-3 text-white border-b-2 border-blue-300"> This Magic Brain will detect faces in your pictures. Give it a try </p>
                <div id="search-div" className="sm:w-full md:w-3/5  m-auto shadow-xl p-4">
                    <form className="w-full flex justify-center" autoComplete="off" onSubmit={submitted}>
                    <input id='search-field' type="text" placeholder="Write here your image link" className='p-2 mr-1 text-gray-600 w-3/4' />

                    <input type='submit' value='Detect' id="search-button" className="
                        p-2
                        m-auto
                        w-1/4
                        bg-blue-300
                        hover:bg-pink-500
                        hover:text-white
                        transform
                        hover:scale-110
                        hover:translate-x-2
                        active:scale-100
                        active:border-0
                        transition
                        duration-10
                    " />

                    </form>
                </div>
            </div>
        )
}

export default ImageLinkForm
