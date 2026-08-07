import Navbar from "@/components/navbar/Navbar";

export default function Loading() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto w-full lg:p-8 p-3 mt-10 lg:mt-15 mb-20 animate-pulse">
        <div className="text-xl mb-5 bg-gray-200 h-7 w-30 font-bold" />
        
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div 
        key={index}
    className='flex flex-col justify-between relative min-h-100 shadow-sm shadow-[#9cabb4] bg-gray-200 transition ring-[#9cabb4] hover:ring-2 hover:shadow-md p-4'>
      <div
      className='w-full object-contain mx-auto bg-gray-300 h-58'/>
      <div className='flex flex-col gap-2 mt-2'>
        <div className='font-semibold text-[20px] line-clamp-2 hover:underline transition-all bg-gray-300 min-h-5' />
        <div className='font-semibold text-[20px] line-clamp-2 hover:underline transition-all bg-gray-300 min-h-5 w-1/2' />
          
        <div className='text-xl font-bold text-[#1c0c0c] h-6 bg-gray-300 mb-2 w-1/5' />
      </div>

      <div className='flex justify-center w-full text-white h-8 bg-gray-300'/>
       
    </div>
      ))}
    </div>
      </div>
    </div>
  );
}