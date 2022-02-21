import './404.css'
import { Link } from "react-router-dom";
const PageNotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
        <div className="container-404 rounded-md">
            <h1 className='not-found-title text-3xl border-b-2 border-pink-400 p-4 py-8  text-blue-600'>404 - Page not found</h1>
            <button className=" 
            m-4 text-xl 
            border-b-2 
            border-blue-600
            p-2
            transform
            text-blue-700
            hover:text-pink-700
            hover:scale-110
            hover:border-pink-700
            active:scale-100
            transition
            duration-10
                "><Link to="/">⬅️ Go back to main page</Link></button>
                        
        </div>
        </div>
    )
}

export default PageNotFound
