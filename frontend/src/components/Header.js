import React, { useContext, useState } from "react";
import {AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const {loggedIn,logout} = useContext(AuthContext);

  const navigate = useNavigate()
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo + App Name */}
        <div className="flex items-center gap-3">
          <img src={logo}
            alt="Food Store Logo"
            className="w-20 h-20"
          />
          <h1 className="text-2xl font-bold tracking-wide">FOOD STORE®</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden text-xl lg:flex gap-8 items-center">
          <NavLink to={'/'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"}>Home</NavLink>
          <NavLink to={'/about-us'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"}>About</NavLink>
          <NavLink to={'/recipe'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"}>Recipe</NavLink>
          <NavLink to={'/blog'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"}>Blog</NavLink>
          <NavLink to={'/contact-us'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"}>Contact Us</NavLink>

          {loggedIn?<>
            <button className="bg-red-600 text-black px-4 py-1 rounded mr-2 hover:bg-red-400"onClick={()=>{logout(); setOpen(false);}} >
              Logout
            </button>
          </>:<>
            <button className="bg-yellow-400 text-black px-4 py-1 rounded mr-2 hover:bg-yellow-600"onClick={()=>{navigate('/login'); setOpen(false);}} >
              Login
            </button>
            <button className="border border-yellow-400 px-4 py-1 rounded hover:bg-slate-700" onClick={()=>{navigate('/register'); setOpen(false);}}>
              Register
            </button>
          </>}
        </nav>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="text-2xl lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="lg:hidden text-lg bg-gray-800 px-4 pb-4 flex flex-col gap-4">
          <NavLink to={'/'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"} onClick={()=>setOpen(false)}>Home</NavLink>
          <NavLink to={'/about-us'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"} onClick={()=>setOpen(false)}>About</NavLink>
          <NavLink to={'recipe'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"} onClick={()=>setOpen(false)}>Recipe</NavLink>
          <NavLink to={'/blog'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"} onClick={()=>setOpen(false)}>Blog</NavLink>
          <NavLink to={'/contact-us'} className={({isActive})=>isActive?"text-yellow-400":"hover:text-yellow-400"} onClick={()=>setOpen(false)}>Contact Us</NavLink>

          {loggedIn?<>
            <button className="bg-red-600 text-black px-4 py-2 rounded hover:bg-red-400" onClick={()=>{logout(); setOpen(false);}}>
              Logout
            </button>
          </>:<>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-600" onClick={()=>{navigate('/login'); setOpen(false);}}>
              Login
            </button>
            <button className="border border-yellow-400 px-4 py-2 rounded hover:bg-slate-700" onClick={()=>{navigate('/register'); setOpen(false);}}>
              Register
            </button>
            </>}
        </div>
      )}
    </header>
  );
};

export default Header;
