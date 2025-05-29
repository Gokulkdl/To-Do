// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/login', formData);

      toast.success(res.data.message);

      console.log(res.data)

      //storing token local storage
    localStorage.setItem("token",res.data.token)
    localStorage.setItem("user",res.data.user.id)


      navigate('/todo'); 
    } catch (err) {
     toast.error(err.response?.data?.message || 'Login failed');

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
        <ToastContainer/>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
        >
          <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">Login</h1>

          <div className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?
          <Link to="/signup" className="text-blue-400 hover:underline ml-1">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
