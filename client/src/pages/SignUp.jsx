import React from 'react'
import './SignUp.css'

function SignUp() {
  return (
    <>
    <nav>

    </nav>
    <div id='signup-div'>
        <form>
            <h1>SignUp Form</h1>
            <input type="text" id="name" name="name" required placeholder='Username'/>
            <input type="email" id="email" name="email" required placeholder='Email'/>
            <input type="password" id="password" name="password" required placeholder='Password'/>
            <input type="password" id="conf-password" name="password" required placeholder='Conform Password'/>
            <button type="submit">SignUp</button>
        </form>
    </div>
    </>
  )
}

export default SignUp