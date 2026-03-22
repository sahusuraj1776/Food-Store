import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toast } from 'react-toastify'

const Recipe = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState('')
  const [recipes, setRecipe] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const PAGE_SIZE = 8;


  const fetchData = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const recipeRes = await fetch(`http://localhost:8080/api/food?page=${pageNumber}&size=${PAGE_SIZE}&category=${category}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      })
      const recipe = await recipeRes.json()
      if (!recipeRes.ok) {
        toast.error(recipe.message)
        return
      }
      setRecipe(recipe.foods)
      setTotalPage(Math.ceil(recipe.totalFoodItems / PAGE_SIZE))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNumber, category]);

  const currentPage = (page) => {
    setPageNumber(page);
  }

  const nextPage = () => {
    setPageNumber(presPage => {
      console.log(presPage)
      if (presPage === totalPage - 1) {
        return totalPage;
      }
      return (presPage + 1) % totalPage
    })
  }

  const prevPage = () => {
    setPageNumber(presPage => {
      console.log(presPage)
      if (presPage === 1) {
        return totalPage;
      }
      return (totalPage + presPage - 1) % totalPage
    })
  }

  return (
    <div className="bg-black text-white w-full min-h-[calc(100vh-11vh)] py-10 pb-20">

      {/* Title + Category */}
      <div className="bg-yellow-400 py-4 px-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
          Our Recipes
        </h2>

        <select
          value={category}
          onChange={(e) => { setPageNumber(1); setCategory(e.target.value); }}
          className="mt-3 md:mt-0 bg-white text-black px-4 py-2 rounded shadow 
                 w-full md:w-auto"
        >
          <option value="">All Categories</option>
          <option value="European">European</option>
          <option value="Asian">Asian</option>
          <option value="American">American</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>

      {/* GRID DISPLAY */}
      <div className="max-w-7xl mx-auto mt-10 px-6">

        <div
          className="
        grid 
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-y-12
        gap-x-6
        justify-items-center
      "
        >
          {recipes.map((item, index) => (
            <div
              key={index}
              className="
    group flex flex-col items-center 
    transform transition duration-300 
    hover:scale-105 hover:-translate-y-2
  "
            >
              {/* Circular Image */}
              <div
                className="
      w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden 
      border-4 border-white shadow-lg 
      transition duration-300 
      group-hover:shadow-2xl group-hover:border-yellow-400
    "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full transition duration-300 group-hover:scale-110"
                />
              </div>

              {/* FIXED HEIGHT TITLE */}
              <p className="mt-3 text-center text-lg font-semibold h-14 flex items-center justify-center">
                {item.name}
              </p>

              {/* Price */}
              <p className="text-yellow-400 text-sm">$ {item.price}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {(totalPage > 1) && (<div className="flex justify-center items-center mt-10 gap-3">

          {/* Prev Button */}
          <button
            onClick={() => prevPage()}
            className="bg-white text-black p-2 rounded shadow hover:bg-gray-200"
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Page Numbers (hidden on mobile) */}
          <div className="hidden md:flex gap-2">
            {[...Array(totalPage).keys()].map((page) => (
              <button
                key={page}
                onClick={() => currentPage(page + 1)}
                className={`
              p-2 w-8 text-center rounded shadow
              ${pageNumber === page + 1
                    ? "bg-yellow-400 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                  }
            `}
              >
                {page + 1}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => nextPage()}
            className="bg-white text-black p-2 rounded shadow hover:bg-gray-200"
          >
            <FiChevronRight size={20} />
          </button>
        </div>)}

      </div>
    </div>
  );
}

export default Recipe