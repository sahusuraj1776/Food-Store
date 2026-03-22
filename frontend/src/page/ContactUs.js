import { useState } from 'react'
import foodImage from '../assets/foodImage.png'
import { toast } from 'react-toastify'
const ContactUs = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const sendRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
        credentials: 'include'
      });
      const responseJson = await response.json()

      if (!response.ok) {
        if (responseJson.message instanceof Array)
          toast.error(responseJson.message[0])
        toast.error(responseJson.message)
        return;
      }
      toast.success("Your request has been submitted with Id: " + responseJson.id)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }
  return (
    <div className="w-full bg-yellow-500 py-12 min-h-[calc(100vh-11vh)] flex justify-center px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* RIGHT SIDE IMAGE → SHOW FIRST ON MOBILE */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <img
            src={foodImage}
            alt="Request Callback"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* LEFT SIDE FORM → SHOW SECOND ON MOBILE */}
        <div className="flex flex-col justify-center order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-semibold text-black mb-8">
            Request A <span className='text-white'>Call Back</span>
          </h1>

          <form onSubmit={sendRequest} className="flex flex-col gap-4 w-full">

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded bg-white text-black outline-none"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded bg-white text-black outline-none"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 rounded bg-white text-black outline-none"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-3 rounded bg-white text-black outline-none"
            />

            <button
              type="submit"
              className="bg-white text-black px-8 py-2 rounded shadow mt-2 hover:bg-gray-200 transition"
            >
              {loading ? "Sending..." : "Send"}
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default ContactUs