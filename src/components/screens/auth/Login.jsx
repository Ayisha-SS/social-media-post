import React from 'react'

function Login() {
  return (
    <>
        <h1>Login</h1>
        <form action="">
            <div>
                <label>Username</label>
                <input type="text" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    </>
  )
}

export default Login