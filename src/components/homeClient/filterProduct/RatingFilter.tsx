import React, { SetStateAction } from 'react'

interface RatingFilterProps {
  rating: number,
  setRating: React.Dispatch<SetStateAction<number>>,
}

const RatingFilter = ({rating, setRating}: RatingFilterProps) => {
  return (
    <div className='flex flex-col gap-2'> 
      <div className='text-xl font-bold'>
        Rating
      </div>

        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='flex gap-2'>
            <input
            type='radio'
            value={index + 1}
            name='rating'
            checked={rating === index + 1}
            onChange={(e) => setRating(Number(e.target.value))}
            />
            <label>&gt;{index + 1}</label>
          </div>
          
        ))}    
    </div>
  )
}

export default RatingFilter