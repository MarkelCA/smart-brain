// React
import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react'
// Styles
import './SignIn.css'
//Utils
import { post } from '../../utils/Utils';
import bcrypt from 'bcryptjs'

const saltRounds = 10;
const SignIn = ({ setUser, logIn }) =>  {

    const [ signInEmail, changeEmail ] = useState('')
    const [ signInPassword, changePassword ] = useState('')
    const [ validLogin, submit ] = useState(true)
    const navigate = useNavigate();

    const onSubmitSignIn = async (e) => {
        e.preventDefault()

        bcrypt.hash(signInPassword, saltRounds, async (err, hash) => {

            const password = await post('http://localhost:3000/signin', {
                email   : signInEmail,
                password: hash
            })

            console.log(password)

            bcrypt.compare(signInPassword, password, async (err, res) => {
                console.log(res)

                //submit(user)

                //if(user) {
                     //delete user.password
                     //setUser(user)
                     //logIn(true)
                     //navigate('/home', {replace : true})
                 //} 
            });

        });

    }

    return (
        <form id='signin-form' className="bg-grey-lighter flex flex-col sm:w-full h-auto m-auto" onSubmit={onSubmitSignIn}>
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="px-6 py-8 rounded shadow-xl text-black w-full">
                    <h1 className="text-white mb-8 text-3xl text-center">Sign in</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => changeEmail(e.target.value) }/>
                        

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        onChange={ (e) => changePassword(e.target.value) } />

                    <button
                        id='submit-form'
                        type="submit"
                        className="w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white hover:bg-green-dark focus:outline-none my-1"
                        >Log in</button>
                    { !validLogin ? (<p className='text-red-700 mt-4'>Wrong email or password ❌</p>) : ''}
                </div>

                <div className="text-grey-dark mt-6 bg-white px-2 py-5 rounded-lg shadow-md text-black w-full">
                    You don't have an account? 

                    <span className="text-lg no-underline border-b text-blue-700 transition duration-200 hover:border-blue-700 text-blue ml-2"  >
                        <Link to="/register">Register</Link>
                    </span>.
                </div>
            </div>
        </form>
    )

}

export default SignIn
