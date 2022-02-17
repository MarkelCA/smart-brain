const Navigation = ({onRouteChange}) => {
    return (
        <nav id='navigation' className='bg-white flex justify-end p-5 border-b-2 border-pink-500'>
            <a className='cursor-pointer underline text-lg text-blue-900 hover:text-red-600 transition duration-200' onClick={(e) => onRouteChange('signin')}>Sign out</a>

        </nav>

    )
}

export default Navigation
