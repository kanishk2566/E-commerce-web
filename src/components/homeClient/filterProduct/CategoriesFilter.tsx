import { Product } from '@/types/product';
import React, { SetStateAction } from 'react'

interface CategoriesFilterProps {
  category: string,
  setCategory: React.Dispatch<SetStateAction<string>>,
  products: Product[],
}

const CategoriesFilter = ({category, setCategory, products}: CategoriesFilterProps) => {
  const items = products.map(item => item.category);
  const categories = [...new Set(items)];
  return (
    <div className='flex flex-col gap-2'>

          <div className='font-bold text-xl'>
            Categories
          </div>

          <div className='flex gap-2'>
            <input
            id='All'
            checked={category === "All"}
            value="All"
            onChange={() => setCategory("All")}
            type='radio'
            />
            <label>All</label>
          </div>

          {categories.map((item, index) => (
            <div key={index} className='flex gap-2'>
              <input 
              id={item}
              name='category'
              checked={category === item}
              value={item}
              onChange={(e) => setCategory(e.target.value)}
              type='radio' />
              <label>{item}</label>
            </div>
          ))}
          
        </div>
  )
}

export default CategoriesFilter