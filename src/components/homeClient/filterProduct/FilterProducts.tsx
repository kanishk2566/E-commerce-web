import { Product } from '@/types/product'
import { motion } from 'motion/react';
import React, { SetStateAction } from 'react'
import { IoClose } from 'react-icons/io5';
import CategoriesFilter from './CategoriesFilter';
import RatingFilter from './RatingFilter';
import PriceFilter from './PriceFilter';
import { RiResetLeftFill } from 'react-icons/ri';
import { IoMdCheckmark } from 'react-icons/io';

interface FilterProductsProps {
  products: Product[],
  minPrice: number,
  maxPrice: number,
  setMinPrice: React.Dispatch<SetStateAction<number>>,
  setMaxPrice: React.Dispatch<SetStateAction<number>>,
  category: string,
  setCategory: React.Dispatch<SetStateAction<string>>,
  rating: number,
  setRating: React.Dispatch<SetStateAction<number>>,
  toggleFilterModal: () => void,
  resetFilter: () => void,
}

const FilterProducts = ({products, minPrice, maxPrice, setMinPrice, setMaxPrice, category, setCategory, rating, setRating, toggleFilterModal, resetFilter}: FilterProductsProps) => {
  
  return (
    <div className='absolute top-0 left-0 h-screen w-screen bg-black/50 z-101 flex justify-center items-center'>

      <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true }}
      className='bg-[#f2f2eb] relative p-5 w-10/12 lg:w-1/3 grid grid-cols-2 gap-4 rounded shadow-sm'>

        <button
        className='absolute top-2 right-2 cursor-pointer text-xl'
        onClick={toggleFilterModal}>
          <IoClose />
        </button>

        <CategoriesFilter products={products} category={category} setCategory={setCategory} />

        <RatingFilter rating={rating} setRating={setRating} />

        <PriceFilter maxPrice={maxPrice} minPrice={minPrice} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
        
        <div className='w-full flex items-center justify-between col-span-2'>
          <button
          className='bg-[#401b1b] text-[#f2f2eb] w-fit px-3 py-1 rounded hover:bg-[#ab644b] cursor-pointer transition-all font-semibold flex justify-center items-center gap-1'
          onClick={resetFilter}>
            Reset <RiResetLeftFill />
          </button>
          
          <button
          className='bg-[#401b1b] text-[#f2f2eb] w-fit px-3 py-1 rounded hover:bg-[#ab644b] cursor-pointer transition-all font-semibold flex justify-center items-center gap-1'
          onClick={toggleFilterModal}>
            Save <IoMdCheckmark />
          </button>
        </div>

      </motion.div>
    </div>
  )
}

export default FilterProducts