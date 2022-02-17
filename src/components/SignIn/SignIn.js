import './SignIn.css'
import Utils from '../../utils/Utils'
import React, {useState} from 'react'

const SignIn = ({onSubmit, onRegister, loadUser, onRouteChange}) =>  {

    const [ signInEmail, changeEmail ] = useState('')
    const [ signInPassword, changePassword ] = useState('')

    const [ validLogin, submit ] = useState(true)


    const onSubmitSignIn = async (e) => {
        e.preventDefault()

        const user = await Utils.post('http://localhost:3000/signin', {'Content-Type' : 'application/json'}, {
            email   : signInEmail,
            password: signInPassword
        })

        submit(user == null)

        if(user) {
             delete user.password
             loadUser(user)
             onRouteChange('home')
         } 

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
                            { !validLogin ? (<p className='passwordsDontMatch'>Wrong email or password ❌</p>) : ''}
                        </div>

                        <div className="text-grey-dark mt-6 bg-white px-2 py-5 rounded-lg shadow-md text-black w-full">
                            You don't have an account? 
                            <a className="text-lg no-underline border-b text-blue-700 transition duration-200 hover:border-blue-700 text-blue ml-2" href="../login/" onClick={onRegister}>
                                Register
                            </a>.
                        </div>
                    </div>
                </form>
    )

}

export default SignIn
