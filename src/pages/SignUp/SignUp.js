// React
import {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
// Styles
import './SignUp.css'
// Utils
import { post } from '../../utils/Utils';

const SignUp = () => {
    // Fields data variables
    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ repeatPassword, setRepeatPassword ] = useState('')
    const [ passwordMatch, setPasswordMatch] = useState(true)

    // Validation state variables
    const [ strongPassword, setStrongPassword ] = useState(false)
    const [ mediumPassword, setMediumPassRegex ] = useState(false)
    const [ weakPassword, setWeakPassword ] = useState(false)
    const [ emptyFields, setEmptyFields ] = useState(false)
    const [ emailInUse, setEmailInUse ] = useState(false)
    const [ emailErr, setEmailErr] = useState(false)

    const navigate = useNavigate();

    // Check if confirmation of password is correct
    useEffect(() => {
        const strongPassRegex = /^.*(?=.{12,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
        const isStrong = password.match(strongPassRegex)
        setStrongPassword(isStrong)

        if(!isStrong) {
            const mediumPassRegex = /^.*(?=.{12,})(?=.*[a-zA-Z])(?=.*\d).*$/
            const isMedium = password.match(mediumPassRegex)
            setMediumPassRegex(isMedium)
            setWeakPassword(!isMedium && password.length > 0)
        }


        const theyMatch = password === repeatPassword
        setPasswordMatch(theyMatch)
        const repeatPasswordField = document.querySelector("input[name=confirm_password]")

        if(!theyMatch)
            repeatPasswordField.classList.add("error-field")
        else {
            repeatPasswordField.classList.remove('error-field')
        }
    },[password, repeatPassword])

    // Check if email it's repeated
    useEffect(() => {
        const emailField = document.querySelector("input[name=email]")
        if(emailInUse)
            emailField.classList.add("error-field")
        else
            emailField.classList.remove("error-field")
    }, [emailErr, emailInUse])

    // Check for null fields
    useEffect(() => {
        if(emptyFields) setEmptyFields(false)
        //setEmptyFields(!email || !name || !repeatPassword || !password)
        const emailRegex = /^\S+@\S+\.\S+$/
        setEmailErr(email.length > 0 ? !email.match(emailRegex) : false)
        setEmailInUse(false)
    }, [email, name, repeatPassword, password, emptyFields])

    const onSubmitSignIn = async (e) => {
        e.preventDefault()

        setEmptyFields(!email || !name || !repeatPassword || !password)

        if(!passwordMatch || emptyFields || emailErr) return

        const user = await post('http://localhost:3000/register' , {
            email : email,
            password : password,
            name : name
        })


        if(user) {
           navigate('/', {replace : true})
       }
        else {
            setEmailInUse(true)
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
                    { mediumPassword ? (<p className='text-red-700 mt-4'>Medium password ⚠️</p>) : ''}
                    { weakPassword ? (<p className='text-red-500 mt-4'>Weak password ⚠️</p>) : ''}
                    { emptyFields ? (<p className='text-red-800 mt-4'>All fields are required</p>) : ''}
                    { emailInUse ? (<p className='text-red-800 mt-4'>This email is already in use ❌</p>) : ''}
                    { emailErr ? (<p className='text-red-800 mt-4'>This email is not valid ❌</p>) : ''}
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
