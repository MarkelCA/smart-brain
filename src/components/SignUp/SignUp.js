import './SignUp.css'
import Utils from '../../utils/Utils'
import React from 'react'
class SignUp extends React.Component {
    constructor (props) {
        super()
        this.state = {
            email : "",
            password : "",
            repeatPassword : "",
            name : "",
            passwordMatch: true
        }
    }

    onNameChange = (event) => {
        this.setState({ name : event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email : event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({password : event.target.value})
    }

    onRepeatPasswordChange = (event) => {
        this.setState({repeatPassword : event.target.value})
    }
    onLogin = (e) => {
        e.preventDefault()
        this.props.onRouteChange('signin')
    }

    onSubmitSignIn = async (e) => {
        e.preventDefault()
        const { name, email, password, repeatPassword, passwordMatch} = this.state

        await this.setState({passwordMatch : password == repeatPassword}) 

        if(!this.state.passwordMatch) return

        const user = await Utils.post('http://localhost:3000/register', {'Content-Type' : 'application/json'}, {
            email : email,
            password : password,
            name : name
        })

          if(user) {
              this.props.onRouteChange('signin')
          }
    }

    render () {
        const { onSubmit, onLogin } = this.props
        const { passwordMatch } = this.state
        return (
            <form id='signup-form' className="bg-grey-lighter flex flex-col sm:w-full h-auto m-auto" onSubmit={this.onSubmitSignIn}>
                        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                            <div className="px-6 py-8 rounded shadow-xl text-black w-full">
                                <h1 className="text-white mb-8 text-3xl text-center">Sign up</h1>
                                <input 
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="fullname"
                                    placeholder="Full Name" 
                                    onChange={this.onNameChange}/>

                                <input 
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="email"
                                    placeholder="Email" 
                                    onChange={this.onEmailChange} />

                                <input 
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="password"
                                    placeholder="Password" 
                                    onChange={this.onPasswordChange}
                                />
                                <input 
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="confirm_password"
                                    placeholder="Confirm Password" 
                                    onChange={this.onRepeatPasswordChange}
                                />

                                <button
                                    id='submit-form'
                                    type="submit"
                                    className="w-full text-center py-3 rounded bg-blue-600 text-gray-800 hover:text-white focus:text-white hover:bg-green-dark focus:outline-none my-1"
                                >Create Account</button>
                                { !passwordMatch ? (<p className='passwordsDontMatch'>Passwords must be equal ❌</p>) : ''}
                                
                            </div>

                            <div className="text-grey-dark mt-6 bg-white px-2 py-5 rounded-lg shadow-md text-black w-full">
                                Already have an account? 
                                <a className="text-lg no-underline border-b text-blue-700 transition duration-200 hover:border-blue-700 text-blue ml-2" href="../login/" onClick={this.onLogin}>
                                    Log in
                                </a>.
                            </div>
                        </div>
                    </form>
        )
    }

}

export default SignUp
