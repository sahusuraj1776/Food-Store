import React, { useEffect, useState } from "react";
import plateIcon from '../assets/plate-icon.png'
import { toast } from "react-toastify";


const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([])

  async function fetchBlogs() {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/food?page=${Math.ceil((Math.random().toFixed(5)) * 7)}&size=${Math.ceil((Math.random().toFixed(5)) * 10)}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }
    });
    const resJson = await response.json()
    if (!response.ok) {
      if (resJson.message instanceof Array)
        toast.error(resJson[0])
      toast.error(resJson.message)
      return
    }
    console.log(resJson)
    setBlogPosts(resJson.foods)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <div className="w-full bg-white min-h-[calc(100vh-11vh)] px-6 py-2">

      {/* CENTERED ICON + TITLE TEXT */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={plateIcon} // replace with your icon
          alt="Blog Icon"
          className="h-10 mb-2"
        />
        <p className="text-gray-600 text-base text-center">
          when looking at its layout. The point of using Lorem
        </p>
      </div>

      {/* BLOG GRID */}
      {blogPosts.length!==0?<div
        className="
          max-w-7xl mx-auto 
          grid 
          grid-cols-1 
          sm:grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-3 
          gap-8
        "
      >
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="
    group border border-gray-300 rounded overflow-hidden bg-white
    transition transform duration-300 
    hover:scale-105 hover:shadow-xl
  "
          >
            {/* IMAGE WRAPPER WITH RELATIVE POSITION */}
            <div className="relative w-full overflow-hidden">

              {/* DATE TAG ON TOP LEFT */}
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-3 py-1 rounded group-hover:bg-white group-hover:text-black">
                {post.updatedAt.split('T')[0]}
              </span>

              {/* BLOG IMAGE */}
              <img
                src={post.image}
                alt={post.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="px-4 py-4">
              <h3 className="text-xl font-semibold mb-2">{post.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>:
            <p className="text-2xl font-semibold text-center">No Blogs posted yet.</p>

          }

    </div>
  );
};

export default Blog;