import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Register = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const data = await fetch('http://localhost:8080/api/user/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name,email,password}),
        credentials:'include'
      });
      const resJson = await data.json();
      if(!data.ok){
        if(resJson.message instanceof Array)
          toast.error(resJson.message[0])
        toast.error(resJson.message)
        return
      }
      console.log(resJson)
      toast.success("User Registered Successfully")
      navigate('/login',{replace:true})
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-11vh)] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register Account
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-600">Name</label>
            <input 
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="John Doe"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="johndoe@gmail.com"
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
            {loading?'Registering....':'Register'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Already have Account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
