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
    <div className='flex justify-start items-center text-[#401b1b] min-w-50 flex-1 relative h-fit mb-10 z-999'>
      <div
      className={`text-base flex justify-center items-center h-fit w-50 cursor-pointer pl-3 pr-1 py-0.5 bg-[#f2f2eb] ${sortDropdown ? "border border-b-0 rounded rounded-b-none" : "border rounded"}`}
      onClick={() => {setSortDropdown(!sortDropdown)}}>

        <span className='flex justify-between gap-2 items-center w-full'>
          {sortBy} <LiaSortSolid />
        </span>
      </div>

      <div
      className={`rounded-b absolute top-7 flex flex-col py-1 text-sm shadow-sm outline-none w-50 bg-[#f2f2eb] border border-t-0 ${sortDropdown ? "max-h-fit visible" : "max-h-0 invisible"}`}>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer'
        onClick={() => {setSortBy("sort By"); setSortDropdown(false)}}>
          Default
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer'
        onClick={() => {setSortBy("A-Z"); setSortDropdown(false)}}>
          A-Z
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer'
        onClick={() => {setSortBy("Z-A"); setSortDropdown(false)}}>
          Z-A
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer'
        onClick={() => {setSortBy("Price(low to high)"); setSortDropdown(false)}}>
          Price (low to high)
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer'
        onClick={() => {setSortBy("Price(high to low)"); setSortDropdown(false)}}>
          Price (high to low)
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer'
        onClick={() => {setSortBy("Rating(high to low)"); setSortDropdown(false)}}>
          Rating (high to low)
        </div>

        <div
        className='hover:bg-[#401b1b] hover:text-[#f2f2eb] transition-all py-1 px-2 cursor-pointer'
        onClick={() => {setSortBy("Rating(low to high)"); setSortDropdown(false)}}>
          Rating (low to high)
        </div>

      </div>
    </div>
  )
}

export default SortByDropdown