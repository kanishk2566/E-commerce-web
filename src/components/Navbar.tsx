import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center fixed top-0 w-full z-999 justify-between py-4 bg-blue-600 text-white px-8 shadow-md'>

        <div className='text-2xl font-bold'>
          ShopEasy
        </div>

        <div className='flex gap-6'>
          <button className='hover:underline cursor-pointer'>
            Home
          </button>
          <button className='hover:underline cursor-pointer'>
            Cart
          </button>
        </div>

    </nav>
  )
}

export default Navbar