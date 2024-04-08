
'use client';
 
import "./generalForm.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext, { AuthContextType } from '@/context/AuthContext';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
 
const Data = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        cpassword: '',
        password: '', // New field for new password
    });

    const [updateSuccess, setUpdateSuccess] = useState(false); // State to track update success
    const [deleteClicked, setDeleteClicked] = useState(false); 

    const { username, email, cpassword,password } = formData;
    const [error, setError] = useState('');
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = localStorage.getItem('_id');
                if (id) {
                    const response = await axios.get(`https://server-mauve-pi.vercel.app/user/users/${id}`);
                    const userData = response.data;
                    setFormData({
                        username: userData.username || '',
                        email: userData.email || '',
                        cpassword: userData.password || '',
                        password: '', // Initialize new password field
                    });
                }
            } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.errors || 'Something went wrong');
            }
        };
 
        fetchData();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const deleteuser = async () => {
        try {
            const id = localStorage.getItem('_id');
            const response = await axios.delete(`https://server-mauve-pi.vercel.app/user/users/${id}`);
            auth.logout();
            // localStorage.removeItem('token');
            // localStorage.removeItem('_id');
            console.log("1");
            setDeleteClicked(true); // Set delete clicked flag
            router.push('/signup');
            console.log("2");
            
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
    
      };

      const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    
        // if (!deleteClicked) {
        //     // If the delete button is not clicked, check if the new password is provided
        //     if (!password) {
        //       setError('New password is required');
        //       return;
        //     }
        //   }
        
          if (deleteClicked) {
            deleteuser(); // Call delete function if delete button is clicked
            return; // Exit onSubmit function
          }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

          const updatedUserData = {
            username,
            email,
            password 
        };

        try {
            const id = localStorage.getItem('_id');
            console.log("3");
            console.log("the new password is");
            console.log(password);
            const response = await axios.post(`https://server-mauve-pi.vercel.app/user/users/${id}`, updatedUserData, config);
            console.log('User updated successfully:', response.data);
           
            setFormData({ ...formData, cpassword: response.data.password, password: '' });
            setUpdateSuccess(true);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
    
    };

    useEffect(() => {
        if (deleteClicked) {
            alert('User deleted successfully!'); // Show alert when user is successfully deleted
        }
    }, [deleteClicked]);

    return (
        <div className="container">
            
            <form onSubmit={onSubmit}
             className="py-4 mt-4 border-t flex flex-col gap-5 items-center">
                <div>
                <label htmlFor="username">User Name :</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        className="input-field w-65"
                    />
                </div>
                <div>
                <label >E-mail :</label>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="input-field w-65"
                    />
                </div>
                <div>
                <label >Current password :</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="cpassword"
                        value={cpassword}
                        onChange={onChange}
                        className="input-field w-65"
                    />
                </div>
                <div>
                <label >New password :</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="input-field w-65"
                    />
                </div>
                {/* Display error message if there's an error */}
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="bg-green-700 p-3 text-white font-bold"> Update </button>
              
                <br></br>
                {updateSuccess && <p className="success-message">User details successfully updated!!</p>}
            </form>
            <button className="bg-green-700 p-3 text-white font-bold" onClick={deleteuser}>Delete</button>
            
        </div>
    );
};
 
export default Data;
 