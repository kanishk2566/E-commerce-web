import React, { SetStateAction } from 'react'

interface PriceFilterProps {
  minPrice: number,
  maxPrice: number,
  setMinPrice: React.Dispatch<SetStateAction<number>>,
  setMaxPrice: React.Dispatch<SetStateAction<number>>,
}

const PriceFilter = ({minPrice, maxPrice, setMaxPrice, setMinPrice}: PriceFilterProps) => {
  return (
    <div className='col-span-2 flex flex-col gap-2'>
          <div className='font-bold text-xl mb-2'>
            Price Range
          </div>

          <div>

            <div className='flex justify-start gap-2'>
              Minimum: <p className='font-semibold'>${minPrice}</p>
            </div>

            <input
            type='range'
            min={0}
            max={maxPrice}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className='w-full accent-[#401b1b] h-1 cursor-pointer' />

          </div>

          <div>

            <div className='flex justify-start gap-2'>
              Maximum: <p className='font-semibold'>${maxPrice}</p>
            </div>
            <input
            type='range'
            min={minPrice}
            max={1000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className='w-full accent-[#401b1b] h-1 cursor-pointer' />

          </div>
        </div>
  )
}

export default PriceFilter