"use client"
import React, { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md';

interface SearchBarProps {
  value: string,
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSearch: (e: React.SyntheticEvent<HTMLFormElement>) => void,
}

const SearchBar = ({value, handleSearchChange, onSearch}: SearchBarProps) => {

  const [isSearchFocus, setIsSearchFocus] = useState(false);
  
  return (
    <form 
    onSubmit={onSearch}
    className={`flex justify-center items-center w-100 h-7 ring-1 ring-[#9cabb4] bg-white rounded ${isSearchFocus ? "ring-2" : "ring-0"}`}>

      <input
      className={`outline-0 px-2 w-full`}
      onFocus={() => setIsSearchFocus(true)}
      onBlur={() => setIsSearchFocus(false)}
      value={value}
      placeholder='Search Products...'
      onChange={handleSearchChange}
      />

      <button type='submit' className='cursor-pointer text-2xl'>
        <MdOutlineSearch />
      </button>
      
    </form>
  )
}

export default SearchBar