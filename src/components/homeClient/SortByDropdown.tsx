import React, { SetStateAction } from 'react'
import { FaFilter } from 'react-icons/fa';
import { LiaSortSolid } from 'react-icons/lia';

interface SortByDropdownProps {
  sortBy: string,
  setSortBy: React.Dispatch<SetStateAction<string>>,
  sortDropdown: boolean,
  setSortDropdown: React.Dispatch<SetStateAction<boolean>>,
  toggleFilterModal: () => void,
}

const SortByDropdown = ({sortBy, setSortBy, setSortDropdown, sortDropdown, toggleFilterModal}: SortByDropdownProps) => {
  return (
    <div className='absolute min-w-50 flex-1 h-fit mb-10 z-99 flex justify-center items-top gap-3'>
      <div className='flex justify-start items-center text-[#401b1b] '>
        <div
        className={`text-base h-fit w-50 cursor-pointer py-0.5 bg-[#f2f2eb] transition-all border rounded`}
        onClick={() => setSortDropdown(!sortDropdown)}>

          <div className='flex justify-between gap-2 items-center w-full px-2 hover:opacity-80'>
            {sortBy} <LiaSortSolid />
          </div>
      
        <div
        className={`rounded-b flex flex-col outline-none w-full bg-[#f2f2eb] transition-all ease-in-out overflow-hidden duration-500 ${sortDropdown ? "max-h-100" : "max-h-0"}`}>

          <div
          className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
          onClick={() => {setSortBy("sort By"); setSortDropdown(false)}}>
            Default
          </div>

          <div
          className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
          onClick={() => {setSortBy("A-Z"); setSortDropdown(false)}}>
            A-Z
          </div>

          <div
          className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
          onClick={() => {setSortBy("Z-A"); setSortDropdown(false)}}>
            Z-A
          </div>

          <div
          className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
          onClick={() => {setSortBy("Price (Low to High)"); setSortDropdown(false)}}>
            Price (Low to High)
          </div>

          <div
          className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
          onClick={() => {setSortBy("Price (High to Low)"); setSortDropdown(false)}}>
            Price (High to Low)
          </div>

          <div
          className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
          onClick={() => {setSortBy("Rating (High to Low)"); setSortDropdown(false)}}>
            Rating (High to Low)
          </div>

          <div
          className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
          onClick={() => {setSortBy("Rating (Low to High)"); setSortDropdown(false)}}>
            Rating (Low to High)
          </div>
        </div>
        </div>
      </div>

      <div 
      onClick={toggleFilterModal}
      className='text-base h-fit w-fit cursor-pointer py-1.5 bg-[#f2f2eb] transition-all border rounded px-3 hover:opacity-80'>
      <FaFilter />
      </div>
    </div>
  )
}

export default SortByDropdown