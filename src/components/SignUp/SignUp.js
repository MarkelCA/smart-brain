import './SignUp.css'
const SignUp = ({onSubmit, onLogin}) =>{
    return (
        <form id='signup-form' className="bg-grey-lighter flex flex-col sm:w-full h-auto m-auto" onSubmit={onSubmit}>
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="px-6 py-8 rounded shadow-xl text-black w-full">
                            <h1 className="text-white mb-8 text-3xl text-center">Sign up</h1>
                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="fullname"
                                placeholder="Full Name" />

                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email" />

                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" />
                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="confirm_password"
                                placeholder="Confirm Password" />

                            <button
                                id='submit-form'
                                type="submit"
                                className="w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>
                            <p className='development'>🔧 Not implemented yet. 🔧</p>
                        </div>

                        <div className="text-grey-dark mt-6 bg-white px-2 py-5 rounded-lg shadow-md text-black w-full">
                            Already have an account? 
                            <a className="text-lg no-underline border-b text-blue-700 transition duration-200 hover:border-blue-700 text-blue ml-2" href="../login/" onClick={onLogin}>
                                Log in
                            </a>.
                        </div>
                    </div>
                </form>
    )

}

export default SignUp
