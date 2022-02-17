// React
import {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
// Styles
import './SignUp.css'
// Utils
import { post } from '../../utils/Utils';

const SignUp = () => {
    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword ] = useState('')
    const [ passwordMatch, setPasswordMatch] = useState(true)
    const [ strongPassword, setStrongPassword ] = useState(false)
    const [ emptyFields, setEmptyFields ] = useState(false)
    const navigate = useNavigate();

    // Check if confirmation of password is correct
    useEffect(() => {
        const regex = /^.*(?=.{12,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
        setStrongPassword(password.match(regex))
        setPasswordMatch(password === repeatPassword)
    },[password, repeatPassword])

    // Check for null fields
    useEffect(() => {
        setEmptyFields(!email || !name || !repeatPassword || !password)
    }, [email, name, repeatPassword, password])

    const onSubmitSignIn = async (e) => {
        e.preventDefault()

        setEmptyFields(!email || !name || !repeatPassword || !password)

        if(!passwordMatch || emptyFields) return

        const user = await post('http://localhost:3000/register' , {
            email : email,
            password : password,
            name : name
        })

          if(user) {
              navigate('/', {replace : true})
          }
    }

    return (
        <form id='signup-form' className="bg-grey-lighter flex flex-col sm:w-full h-auto m-auto" onSubmit={onSubmitSignIn}>
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="px-6 py-8 rounded shadow-xl text-black w-full">
                    <h1 className="text-white mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name" 
                        onChange={(e) => setName(e.target.value)}/>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)} />

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" 
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />

                    <button
                        id='submit-form'
                        type="submit"
                        className="w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>
                    { !passwordMatch ? (<p className='text-red-800 mt-4'>Passwords must be equal ❌</p>) : ''}
                    { strongPassword ? (<p className='text-green-700 mt-4'>Strong password ✔️</p>) : ''}
                    { emptyFields ? (<p className='text-red-800 mt-4'>All fields are required</p>) : ''}
                </div>
                <div className="text-grey-dark mt-6 bg-white px-2 py-5 rounded-lg shadow-md text-black w-full">
                    Already have an account? 
                    <span className="text-lg no-underline border-b text-blue-700 transition duration-200 hover:border-blue-700 text-blue ml-2">
                        <Link to="/">Log in</Link>
                    </span>.
                </div>
            </div>
        </form>
    )
}

export default SignUp
