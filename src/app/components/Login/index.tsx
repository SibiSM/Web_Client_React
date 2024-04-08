
'use client';

// import "./index.css";

import "./generalForm.css"
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
 import AuthContext, { AuthContextType } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axiosInstance from "../../../../axiosInstance";

const Login = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });



 // useEffect(() => {
        
   // auth.login()

  //}, [])


  const { username, password } = formData;

  const [usernameError, setUsernameError] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     let formValid = true;
     setError('');
     if (username === '') {
       formValid = false;
       setUsernameError('Please enter Username');
     } else {
       formValid = true;
       setUsernameError('');
     }
 

     if (formValid) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = {
        username: username,
        password: password,
      };

      try {
        const response = await axiosInstance.post(
          'https://server-mauve-pi.vercel.app/login',
          data,
          config
        );
        console.log(response.data.token);
        console.log(response.data.user._id);
        localStorage.setItem('_id', response.data.user._id);
        localStorage.setItem('token', response.data.token);

        auth.login();
        console.log("login successfull");
        router.push('/categories');
      } catch (err: any) {
        console.log(err);
        setError(err.response.data.error || 'something went wrong');
      
    }
  }
  };

  return (
    <div >
     
      
{error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={(e) => onSubmit(e)}
      className="py-4 mt-4 border-t flex flex-col gap-5 items-center"
      >
        <div>
          <input
            type='text'
            placeholder='username Address'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            className="input-field w-65"
          />
          {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        </div>
        
         <div>
        <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            className="input-field w-65"
          />
        </div>
        <input type='submit' value='Login' className="bg-green-700 p-3 text-white font-bold"/>
        
      </form>
      <div className="flex flex-col items-center">
     <h3>Don't have an account?</h3> 
     <p className="register-link">
  <Link href='/signup'>
    <span className="text-blue-500 underline cursor-pointer">Register</span>
  </Link>
</p> </div>

      </div >
  );
};

export default Login;
