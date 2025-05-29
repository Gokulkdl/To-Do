import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/api/signup', formData);
      toast.error(res.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <ToastContainer />
  <div className="w-full max-w-md">
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
    >
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">Sign Up</h1>

      <div className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
 {/* confirm password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
        >
          Sign Up
        </button>
      </div>
    </form>

    <div className="mt-6 text-center text-sm text-gray-400">
      Already registered?
      <Link to="/" className="text-blue-400 hover:underline ml-1">Login</Link>
    </div>
  </div>
</div>
  );
};

export default Signup;
