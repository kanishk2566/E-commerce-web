import React, { SetStateAction } from 'react'
import { LiaSortSolid } from 'react-icons/lia';

interface SortByDropdownProps {
  sortBy: string,
  setSortBy: React.Dispatch<SetStateAction<string>>,
  sortDropdown: boolean,
  setSortDropdown: React.Dispatch<SetStateAction<boolean>>,
}

const SortByDropdown = ({sortBy, setSortBy, setSortDropdown, sortDropdown}: SortByDropdownProps) => {
  return (
    <div className='flex justify-start items-center text-[#401b1b] min-w-50 flex-1 h-fit mb-10 z-999 absolute'>
      <div
      className={`text-base h-fit w-50 cursor-pointer py-0.5 bg-[#f2f2eb] transition-all border rounded`}
      onClick={() => {setSortDropdown(!sortDropdown)}}>

        <div className='flex justify-between gap-2 items-center w-full px-2'>
          {sortBy} <LiaSortSolid />
        </div>
     
      <div
      className={`rounded-b flex flex-col outline-none w-full bg-[#f2f2eb] transition-all ease-in-out overflow-hidden ${sortDropdown ? "max-h-100" : "max-h-0"}`}>

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
        onClick={() => {setSortBy("Price (low to high)"); setSortDropdown(false)}}>
          Price (low to high)
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
        onClick={() => {setSortBy("Price (high to low)"); setSortDropdown(false)}}>
          Price (high to low)
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
        onClick={() => {setSortBy("Rating (high to low)"); setSortDropdown(false)}}>
          Rating (high to low)
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer hover:rounded'
        onClick={() => {setSortBy("Rating (low to high)"); setSortDropdown(false)}}>
          Rating (low to high)
        </div>
      </div>
       </div>
    </div>
  )
}

export default SortByDropdown