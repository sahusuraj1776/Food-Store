import aboutImage from "../assets/about-food.png"; // change to your image
import plateIcon from '../assets/plate-icon.png'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="w-full bg-white min-h-[calc(100vh-11vh)]">

      {/* THIN YELLOW HEADER LINE */}
      <div className="w-full h-[12px] bg-yellow-400"></div>

      {/* CENTER ICON + TEXT */}
      <div className="flex flex-col items-center px-6 py-14 text-center">
        <img
          src={plateIcon}
          alt="plate-icon"
          className="h-16 mb-3"
        />
        <p className="text-gray-600 max-w-2xl text-sm md:text-lg leading-relaxed">
          It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout.
          The point of using Lorem
        </p>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 pb-20">

        {/* LEFT BLACK CARD */}
        <div className="bg-black text-white p-6 md:p-10 flex flex-col gap-4 order-2 md:order-1">
          <h2 className="text-4xl font-semibold">Best Food</h2>

          <p className="text-xl font-semibold text-gray-50 leading-relaxed">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden‑Sydney College in Virginia, looked up one of the more
            obscureContrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </p>

          <Link to="/blog" className="text-2xl text-white hover:text-yellow-400 transition">
            Read More →
          </Link>
        </div>

        {/* RIGHT IMAGE WITH YELLOW BACKDROP */}
        <div className="relative w-full flex self-center justify-center items-center order-1 md:order-2">

          {/* YELLOW BACKGROUND BLOCK */}
          <div className="
            absolute
            inset-0
            bg-yellow-400
            rounded
            -top-6
            max-w-[80%]
            md:-left-6
            md:max-w-[100%]
            lg:max-w-[85%]
          "></div>

          {/* IMAGE */}
          <img
            src={aboutImage}
            alt="about-food"
            className="
              w-full
              max-w-md
              rounded
              shadow-lg
              z-10
            "
          />
        </div>

      </div>
    </div>
  )
}

export default About

