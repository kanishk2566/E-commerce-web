"use client"
import React from 'react'

interface SearchBarProps {
  value: string,
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SearchBar = ({value, handleSearchChange}: SearchBarProps) => {
  
  return (
    <div className='flex justify-center items-center'>

      <input
      className={`bg-white outline-0 w-70 ring-1 ring-[#ab644b] rounded px-2 focus:ring-2`}
      value={value}
      placeholder='Search Products...'
      onChange={handleSearchChange}
      />
      
    </div>
  )
}

export default SearchBar