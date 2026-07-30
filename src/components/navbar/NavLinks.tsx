import { useCart } from '@/context/CartContext'
import Link from 'next/link';
import NavAuthLinks from './NavAuthLinks';
import { TiShoppingCart } from "react-icons/ti";
import { IoMdHome } from "react-icons/io";

type IsCartProps = {
  IsCart: boolean,
  IsHome: boolean,
  IsRegister: boolean,
  IsLogin: boolean,
  IsProfile: boolean,
}

const NavLinks = ({IsCart, IsHome, IsRegister, IsLogin, IsProfile}: IsCartProps) => {
  const { totalItem } = useCart();
  
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center h-full'>
        <div className='flex justify-center items-center'>
          <Link href={"/"} className={`relative flex justify-center items-center px-2 cursor-pointer py-1.75 hover:border-b-2 border-blue-500 hover:pb-1.5 hover:bg-gray-200 hover:rounded-md transition-all  ${IsHome ? "border-b-2 pb-1.5" : ""}`}>

            <div className='py-1 flex justify-center items-center gap-0.5'>
              Home <IoMdHome />
            </div>

          </Link>
          <Link href={"/cart"} className={`relative flex justify-center items-center px-2 cursor-pointer py-1.75 hover:border-b-2 border-blue-500 hover:pb-1.5 hover:bg-gray-200 hover:rounded-md transition-all ${IsCart ? "border-b-2 pb-1.5" : ""}`}>

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
        <NavAuthLinks IsLogin={IsLogin} IsRegister={IsRegister} IsProfile={IsProfile} />
        
      </div>
    </div>

  )
}

export default NavLinks