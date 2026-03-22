import { useNavigate } from 'react-router-dom';
import burgerImage from '../assets/burgerImage.png'


const Home = () => {

  const naviagte = useNavigate()
  return (
    <div className="w-full bg-[#1e1e1e] text-white min-h-[calc(100vh-11vh)] flex items-center px-6 py-10">

      {/* CONTAINER */}
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* LEFT HERO TEXT */}
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Discover <br />
            Restaurants <br />
            that deliver near <br />
            You
          </h1>

          <p className="text-gray-400 text-lg max-w-md">
            It is a long established fact that a reader will be distracted 
            by the readable content of a page when looking at its layout.
          </p>

          <button className="w-fit bg-transparent border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition" onClick={()=>naviagte('/recipe')}>
            Order Now
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center order-1 md:order-2">
          <img
            src={burgerImage}
            alt="Burger"
            className="w-full max-w-lg object-contain drop-shadow-xl"
          />
        </div>

      </div>
    </div>
  )
}

export default Home;