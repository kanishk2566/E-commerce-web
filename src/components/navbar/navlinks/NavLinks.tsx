import { useCart } from '@/context/CartContext'
import Link from 'next/link';
import NavAuthLinks from './NavAuthLinks';
import { TiShoppingCart } from "react-icons/ti";
import { IoMdHome } from "react-icons/io";
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const { totalItem } = useCart();
  const pathname = usePathname();
  
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center h-full'>
        <div className='flex justify-center items-center'>
          <Link href={"/"} className={`relative flex justify-center items-center px-2 cursor-pointer py-1.75 hover:border-b-2 border-blue-500 hover:pb-1.5 hover:bg-gray-200 hover:rounded-md transition-all  ${pathname === "/" ? "border-b-2 pb-1.5" : ""}`}>

            <div className='py-1 flex justify-center items-center gap-0.5'>
              Home <IoMdHome />
            </div>

          </Link>
          <Link href={"/cart"} className={`relative flex justify-center items-center px-2 cursor-pointer py-1.75 hover:border-b-2 border-blue-500 hover:pb-1.5 hover:bg-gray-200 hover:rounded-md transition-all ${pathname === "/cart" ? "border-b-2 pb-1.5" : ""}`}>

            <div className='py-1 relative flex justify-center items-center'>
              Cart <TiShoppingCart />

              {totalItem > 0 && (
                <span className='absolute rounded-full bg-red-500 text-[12px] md:text-[11px] px-1.5 text-white md:px-1.5 transition-all ease-in-out -top-2 -right-2.5 md:-top-1 md:-right-2.5'>
                  {totalItem}
                </span>
              )}
            </div>
            
          </Link>
        </div>
        <NavAuthLinks />
        
      </div>
    </div>

  )
}

export default NavLinks