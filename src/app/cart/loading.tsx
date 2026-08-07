export default function Loading() {
  return (
    <div className="flex flex-col gap-4 h-fit">
      {Array.from({ length: 8 }).map((_, index) => (
        <div 
        key={index}
        className='flex rounded mx-5 gap-5'>
          <div className='border border-gray-300 p-2 rounded-l bg-[#D2DCE6] flex justify-center items-center h-40 w-30'/>

          <div 
          className='flex justify-start flex-1 items-center gap-5 ml-1 p-3 bg-[#D2DCE6] border border-gray-300 rounded-r relative'>
  
            <div className='flex flex-col gap-2'>

              <div className='text-xl font-semibold line-clamp-2 h-7 w-full'/>

              <div className='w-fit flex justify-center items-center border border-gray-400 rounded'>

                <div
                className='border-r rounded-l border-gray-400 w-7 text-xl h-7 text-center bg-white cursor-pointer'/>

                <div className='border-gray-400 px-2 bg-white w-7 text-center h-5'/>

                <button
                className='border-l rounded-r border-gray-400 w-7 text-xl text-center bg-white cursor-pointer'/>   

              </div>
              <div className='font-bold text-[#1c0c0c] h-5'/>

            </div>

            <div
            className='flex justify-center items-center gap-1 absolute right-2 bottom-2 md:right-2 text-red-600 hover:opacity-90 cursor-pointer hover:bg-red-300 bg-[#b6c9d4] py-1 px-2 rounded transition-all h-5'/>

          </div>
        </div>
      ))}

      <div className='lg:w-3/10 mx-5 flex flex-col gap-2 h-full'>
          
          <div className='flex gap-10 flex-col'>
            
            <div className={`bg-[#D2DCE6] p-5 rounded-2xl w-full overflow-clip relative`}>
      
              <div className='text-center mb-2 pb-2 text-2xl font-bold bg-gray-200 h-8'>
      
              </div>
      
              <div className='flex flex-col gap-3'> 
      
                <div className='flex justify-between font-bold'>
      
                  <div>
                  </div>
      
                  <div>
                  </div>
      
                </div>
      
              </div>
      
              </div>
      
              <button className='w-full rounded-full py-2 text-lg font-semibold bg-[#72383d] text-center cursor-pointer hover:bg-[#401b1b] text-white transition-all'>
                Place Order
              </button>
      
            </div>
      
          </div>
    </div>
  );
}