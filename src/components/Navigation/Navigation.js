import { useNavigate } from "react-router-dom";
const Navigation = () => {
    const navigate = useNavigate();
    return (
        <nav id='navigation' className='bg-white flex justify-end p-5 border-b-2 border-pink-500'>
            <span className='cursor-pointer underline text-lg text-blue-900 hover:text-red-600 transition duration-200' onClick={(e) => navigate('/', {replace : true}) }>Sign out</span>
        </nav>

    )
}

export default Navigation
