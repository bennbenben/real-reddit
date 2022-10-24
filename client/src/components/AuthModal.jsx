import React, { useState } from 'react'
import axios from 'axios';
import Button from './Button';
import Input from './Input';

const AuthModal = () => {
  const [modalType, setModalType] = useState('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = (e) => {
    e.preventDefault();
    // axios.post("");
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-20 flex content-center" style={{backgroundColor:'rgba(0,0,0,.6'}}>
        <div className="border border-reddit_dark-brightest w-3/4 sm:w-1/2 md:1/4 bg-reddit_dark p-5 text-reddit_text self-center mx-auto rounded-xl">
            
            {modalType === 'login' && (
                <h1 className="text-2xl mb-5">Login</h1>
            )}
            
            {modalType === 'register' && (
                <h1 className="text-2xl mb-5">Register</h1>
            )}

            {modalType === 'register' && (
                <label>
                    <span className="text-reddit_text-darker text-sm">E-mail:</span>
                    <Input type="email" className="mb-3 w-full" value={email} onChange={e => setEmail(e.target.value) } />
                </label>
            )}
            
            <label>
                <span className="text-reddit_text-darker text-sm">Username: </span>
                <Input type="text" className="mb-3 w-full" value={username} onChange={e => setUsername(e.target.value) } />
            </label>

            <label>
                <span className="text-reddit_text-darker text-sm">Password: </span>
                <Input type="password" className="mb-3 w-full" value={password} onChange={e => setPassword(e.target.value) } />
            </label>

            {modalType === 'login' && (
                <Button className="w-full py-2 mb-3" style={{borderRadius: ".3rem"}}>
                    Log In
                </Button>
            )}
            
            {modalType === 'register' && (
                <Button className="w-full py-2 mb-3" style={{borderRadius: ".3rem"}} onClick={e => register(e)}>
                    Sign Up
                </Button>
            )}
            

            {modalType === 'login' && (
                <div>
                    New to Reddit? <button className="text-blue-600" onClick={() => setModalType('register')}>Sign up</button>
                </div>
            )}

            {modalType === 'register' && (
                <div>
                    Already have an account? <button className="text-blue-600" onClick={() => setModalType('login')}>Log In</button>
                </div>
            )}

        </div>
    </div>
  )
}

export default AuthModal;