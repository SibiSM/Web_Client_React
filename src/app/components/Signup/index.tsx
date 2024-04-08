
'use client';

// import "./index.css";
import "./generalForm.css"
import { useState, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import AuthContext, { AuthContextType } from '@/context/AuthContext';

const Signup = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const router = useRouter();
  const [formData2, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData2;

  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData2, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        'https://server-mauve-pi.vercel.app/register',
        data,
        config
      );

      console.log('Registration successful');

       router.push('/login');
    } catch (e: any) {
      console.log('error ', e.message);
      setError(e.response.data.error || 'something went wrong');
    }
  };
  return (
    <div >

     

      <p>Create Your Account</p>
{error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={(e) => onSubmit(e)}
       className="py-4 mt-4 border-t flex flex-col gap-5 items-center"
      >
        <div>
          <input
            type='text'
            placeholder='Enter username'
            name='username'
            required
            value={username}
            onChange={(e) => onChange(e)}
            className="input-field w-65"
          />
        </div>
        <div>
          <input
            type='email'
            placeholder='Enter Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            className="input-field w-65"
          />
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
       
         <div>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            className="input-field w-65"
          />
        </div>

        <input type='submit' value='Register'  className="bg-green-700 p-3 text-white font-bold"/>
       
      </form>
      <div className="flex flex-col items-center">
        <h3>Already have an account?</h3>
      
      <p className="signin-link">
        <Link href='/login'>
        <span className="text-blue-500 underline cursor-pointer">Sign In</span>
          </Link>
      </p>
      </div >
      </div >
  );
};

export default Signup;
