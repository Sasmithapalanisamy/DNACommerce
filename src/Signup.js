import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {FaUser,FaLock,FaEnvelope} from 'react-icons/fa';
const Signup = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const HandleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!namePattern.test(name)) {
      setErrorMessage('Invalid name');
      return;
    }
    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email');
      return;
    }
    if (password.length < 6 || password.length > 10) {
      setErrorMessage('Password should be 6 to 10 characters');
      return;
    }
    const newUser = { name, email, password };
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      setErrorMessage('Email is already registered');
      return;
    }

    // Add the new user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setErrorMessage('');
    console.log('Sign Up successful!');
    navigate('/login');
  };

  return (
    <div style={{backgroundColor:'black',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className='bg-gray-900 px-14 py-7  text-white space-y-4 rounded transition-transform duration-300 transform hover:scale-105'>
        <h1 className='text-3xl font-bold'>SignUp</h1>
        
        <form onSubmit={HandleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded px-3">
                <FaUser className="text-gray-500 mr-2" />
                <input
                type="text"
                name="name"
                placeholder="UserName"
                required
                className="w-full p-2 outline-none bg-gray-900"
                />
            </div>

            
            <div className="flex items-center border border-gray-300 rounded px-3">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="w-full p-2 outline-none bg-gray-900"
                />
            </div>

            <div className="flex items-center border border-gray-300 rounded px-3">
                <FaLock className="text-gray-500 mr-2" />
                <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full p-2 outline-none bg-gray-900"
                />
            </div>
             {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            <button type="submit" className="bg-blue-600 w-full rounded p-2 text-white hover:bg-blue-500 hover:shadow-lg hover:rounded-md transition">SignUp</button>
        </form>
      
        <p >
            If you already have Account <Link to="/Login" className="text-blue-600 font-bold hover:text-white hover:shadow-2xl transition">LogIn</Link> | <Link to="/" className="text-blue-600 font-bold hover:text-white">Home</Link>
        </p>

        </div>
    </div>
  )
}

export default Signup;