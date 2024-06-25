import React from 'react'
import './LoginPage.css'

function LoginPage() {
  return (
    <>
    <nav>

    </nav>
    <div id='login-div'>
        <form>
        <h1>Login Form</h1>
            <input type="email" id="email" name="email" required placeholder='Email'/>
            <input type="password" id="password" name="password" required placeholder='Password'/>
            <button type="submit">Login</button>
        </form>
    </div>
        
    </>
  )
}

export default LoginPage