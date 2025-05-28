import React from 'react'

function Login() {
    return (
        <div className='text-center'>
            <form className='text-center'>
                <div>
                    <h1 className='text-center text-3xl'>Login</h1>
                    <div className='flex flex-cols-1 items-center'>
                        <input type="email" name="email" placeholder="Email Address" />
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <div>
                        <button> Login</button>
                    </div>
                    <div>
                        not registred? <a href="login.html">Sign up</a>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
