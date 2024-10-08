import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending login data to the backend
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email,
        password,
      });

      // If the login is successful, store the token and navigate
      if (response.data) {
        // Optionally store the token in localStorage or state
        localStorage.setItem('token', response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      // Set error message
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleClick = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-[#E5EAFF]">
      <div className="flex w-[80vw] flex-col gap-10 items-center justify-center">
        <div>
          <img src="" alt="" />
        </div>
        <div className="w-[28vw] h-[70vh] flex items-center pt-10 flex-col space-y-8 bg-white rounded-[15px] shadow-lg">
          <h2 className="text-3xl text-center text-black-900 font-semibold">Login Here</h2>
          {error && <div className="text-red-500">{error}</div>}
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                placeholder="Email Address"
                id="email"
                type="email"
                className="bg-[#E5EAFF] mb-2 font-semibold text-[#C6C3C3] m-auto p-3 w-[20vw] border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                placeholder="Password"
                id="password"
                type="password"
                className="bg-[#E5EAFF] font-semibold text-[#C6C3C3] mt-1 p-3 w-full border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex w-full justify-between p-2">
              <h2 className="text-[#C6C3C3] text-[13px] flex cursor-pointer font-medium">
                <input className="mr-1" type="checkbox"></input>
                Remember me
              </h2>
              <h2 className="text-[#C6C3C3] text-[13px] cursor-pointer font-medium">Forgot Password?</h2>
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 bg-[#7AD46C] font-bold  p-3 w-full rounded-[50px] hover:bg-blue-500 text-black"
              >
                LOGIN
              </button>
              <div className="flex item-center justify-center mt-0">
                <div className="mt-3 bg-[#C6C3C3] w-[120px] h-[2px]"></div>
                <div className="pl-2 pr-2 text-[#C6C3C3] font-bold">Or</div>
                <div className="mt-3 bg-[#C6C3C3] w-[120px] h-[2px]"></div>
              </div>
              <div className="flex item-center justify-center">
                <i className="text-blue-600 cursor-pointer ri-facebook-circle-fill text-[2vw]"></i>
                <i className="text-red-500 cursor-pointer pl-2 pr-2 ri-google-fill text-[2vw]"></i>
                <i className="cursor-pointer ri-twitter-x-line pt-1 text-[1.8vw]"></i>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center min-h-screen w-[20vw] bg-[#7AD46C]">
        <h1 className="text-[2vw] font-semibold text-black">New Here?</h1>
        <h2 className="text-center text-[#7E7E7E]">
          Sign up and discover a great amount of new opportunities!
        </h2>
        <button
          type="button"
          onClick={() => handleClick('/register')}
          className="mt-10 bg-white font-bold p-3 w-[12vw] rounded-[50px] hover:bg-blue-500 text-black"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
