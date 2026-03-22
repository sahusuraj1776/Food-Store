import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {toast} from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  const  {setUser, setLoggedIn} = useContext(AuthContext)

  function saveToken(token){
    try {
      const tokenParts = token.split('.')
      const payload = JSON.parse(atob(tokenParts[1]))
      localStorage.setItem('accessToken',token)
      localStorage.setItem('tokenExpiry',payload.exp*1000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/user/login",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password}),
        credentials:'include'
      })
      const jsonRes = await response.json()
      if(!response.ok){
        if(jsonRes.message instanceof Array)
          toast.error(jsonRes.message[0])
        toast.error(jsonRes.message)
        return;
      }
      const token = jsonRes.token;
      saveToken(token);
      setLoggedIn(true);
      toast.success("Logged in successfully...");

      // Taking User From DB
      const userRes = await fetch("http://localhost:8080/api/user/me",{
        method:"GET",
        headers:{...(token?{'Authorization':`Bearer ${token}`}:{})},
        credentials:"include"
      });
      const user = await userRes.json()
      if(!userRes.ok){
        if(user.message instanceof Array)
          toast.error(user.message[0])
        toast.error(user.message)
        return;
      }
      setUser(user);
      localStorage.setItem('user',JSON.stringify(user))
      navigate('/')
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-[calc(100vh-11vh)] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="example@gmail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading?'Logging in...':'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;