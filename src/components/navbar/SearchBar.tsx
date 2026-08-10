"use client"
import React, { SetStateAction } from 'react'
import { motion } from 'motion/react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string,
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSearch: (e: React.SyntheticEvent<HTMLFormElement>) => void,
  isSearchFocus: boolean,
  setIsSearchFocus: React.Dispatch<SetStateAction<boolean>>,
}

const SearchBar = ({value, handleSearchChange, onSearch, isSearchFocus, setIsSearchFocus}: SearchBarProps) => {
  
  return (
    <motion.form
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4 }}
    onSubmit={onSearch}
    className={`flex justify-center items-center w-80 md:min-w-150 h-7 ring-[#9cabb4] bg-[#f2f2eb] rounded ${isSearchFocus ? "ring-2" : "ring-0"}`}>

      <input
      className={`outline-0 px-2 w-full`}
      onFocus={() => setIsSearchFocus(true)}
      onBlur={() => setIsSearchFocus(false)}
      value={value}
      placeholder='Search Products...'
      onChange={handleSearchChange} />

      <button type='submit' className='cursor-pointer bg-[#ab644b] text-white h-full rounded-r px-4 text-sm'>
        <FaSearch />
      </button>
      
    </motion.form>
  )
}

export default SearchBar