import { useCart } from '@/context/CartContext'
import Link from 'next/link';
import NavAuthLinks from './NavAuthLinks';
import { TiShoppingCart } from "react-icons/ti";
import { IoMdHome } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const NavLinks = () => {
  const { totalItem } = useCart();
  const pathname = usePathname();
  
  return (
    <div className='flex justify-center items-center w-full lg:w-fit'>

      <div className='flex justify-center items-center h-full'>

        <div className='flex justify-center items-center gap-6 lg:gap-0'>

          <Link href={"/"} className={`relative flex justify-center items-center px-10 md:lg-2 cursor-pointer py-2.5 hover:border-b-2 border-[#f2f2eb] hover:pb-2 hover:bg-[#72383d] hover:rounded-md transition-all  ${pathname === "/" ? "border-b-2 pb-2" : ""}`}>

            <div className='py-1 flex justify-center items-center gap-0.5 text-[#f2f2eb] text-2xl lg:text-xl'>
              <IoMdHome />
            </div>

          </Link>
          <Link href={"/cart"} className={`relative flex justify-center items-center px-10 md:lg-2 cursor-pointer py-2.5 hover:border-b-2 border-[#f2f2eb] hover:pb-2 hover:bg-[#72383d] hover:rounded-md transition-all  ${pathname === "/cart" ? "border-b-2 pb-2" : ""}`}>

            <div className='py-1 relative flex justify-center items-center text-[#f2f2eb] text-2xl lg:text-xl'>
              <TiShoppingCart />

              {totalItem > 0 && (
                <span className='absolute rounded-full bg-[#ab644b] text-[12px] md:text-[11px] px-1.5 text-[#f2f2eb] md:px-1.5 transition-all ease-in-out -top-2 -right-2.5 md:-top-1 md:-right-2.5'>
                  {totalItem}
                </span>
              )}
            </div>
            
          </Link>
          <Link 
          className={`relative flex justify-center items-center px-10 md:lg-2 cursor-pointer py-2.5 hover:border-b-2 border-[#f2f2eb] hover:pb-2 hover:bg-[#72383d] hover:rounded-md transition-all  ${pathname === "/wishlist" ? "border-b-2 pb-2" : ""}`}
          href={"/wishlist"}>
          <div className='py-1 flex justify-center items-center gap-0.5 text-[#f2f2eb] text-2xl lg:text-xl transition-all'>
            {pathname === "/wishlist" ? <FaHeart /> : <FaRegHeart /> }
          </div>
          </Link>
        </div>
        <div className='hidden lg:block'>
          <NavAuthLinks />
        </div>
      </div>
    </div>

  )
}

export default NavLinks