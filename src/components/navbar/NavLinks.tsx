import { useCart } from '@/context/CartContext'
import Link from 'next/link';
import NavAuthLinks from './NavAuthLinks';

type IsCartProps = {
  IsCart: boolean,
  IsHome: boolean,
  IsRegister: boolean,
  IsLogin: boolean,
}

const NavLinks = ({IsCart, IsHome, IsRegister, IsLogin}: IsCartProps) => {
  const { cart } = useCart();

  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center h-full'>
        <div className='flex justify-center items-center'>
          <Link href={"/"} className={`hover:border-b-2 border-blue-500 hover:pb-1.5 py-2 px-3 h-full ${IsHome ? "border-b-2 pb-1.5" : ""}`}>
            <div className='py-1'>Home</div>
          </Link>
          <Link href={"/cart"} className={`hover:border-b-2 border-blue-500 hover:pb-1.5 py-2 px-3 h-full ${IsCart ? "border-b-2 pb-1.5" : ""}`}>

            <div className='py-1 relative'>
              Cart

              {totalItem > 0 && (
                <span className='absolute rounded-full bg-red-500 text-[12px] md:text-[11px] px-1.5 text-white md:px-1.5 transition-transform -top-2 -right-2.5 md:-top-1 md:-right-2.5'>
                  {totalItem}
                </span>
              )}
            </div>
            
          </Link>
        </div>
        <NavAuthLinks IsLogin={IsLogin} IsRegister={IsRegister} />
        
      </div>
    </div>

  )
}

export default NavLinks