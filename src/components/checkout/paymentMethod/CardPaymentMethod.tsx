import { CardPayment } from '@/types/payment'
import { CardDetailsErrors, validateCardDetails } from '@/validators/PaymentValidator'
import React, { SetStateAction, useState } from 'react'
import { toast } from 'react-toastify';

interface CardPaymentMethodProps {
  setPaymentVerified: React.Dispatch<SetStateAction<boolean>>,
}

const CardPaymentMethod = ({setPaymentVerified}: CardPaymentMethodProps) => {
  const [cardDetails, setCardDetails] = useState<CardPayment> ({
      cardNumber: "",
      expiry: "",
      CVV: "",
      name: "",
    });
    const [errors, setErrors] = useState<CardDetailsErrors> ({
      cardNumber: "",
      expiry: "",
      CVV: "",
      name: ""
    });
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setCardDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
  
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }

    function handleExpiry(e: React.ChangeEvent<HTMLInputElement>) {
      let value = e.target.value.replace(/\D/g, "");
      
      if (value.length > 2) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
      
      setCardDetails((prev) => ({
        ...prev,
        expiry: value,
      }));
    }
    
    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
      e.preventDefault();
  
      const result = validateCardDetails(cardDetails);
      setErrors(result.errors);
  
      if(!result.isValid) return;
      toast.success("Card details verified");
      setPaymentVerified(true);

    }

  return (
    <div className='flex flex-col gap-1 py-1'>
      <div className='text-xl font-bold w-full border-l-5 px-3 col-span-6'>
        Card Details
      </div>

      <form 
      onSubmit={handleSubmit}
      className='my-2 flex flex-col gap-2'>
        <div className='flex justify-center items-center gap-3'>
          <label>Card Number</label>
          <input
          name='cardNumber'
          onChange={handleChange}
          value={cardDetails.cardNumber}
          placeholder='**** **** **** ****'
          className='border rounded border-[#9cabb4] px-2'
          type='text' />
          <div className='text-sm text-red-500'>
            {errors.cardNumber}
          </div>
        </div>

        <div className='flex justify-center items-center gap-3 w-fit'>
          <div className='flex justify-center items-center gap-3'>
          <label>Expiry Date</label>
          <input
          name='expiry'
          onChange={handleExpiry}
          value={cardDetails.expiry}
          placeholder='MM/YY'
          className='border rounded border-[#9cabb4] w-1/3 px-2'
          type='text' />
          <div className='text-sm text-red-500'>
            {errors.expiry}
          </div>
        </div>

        <div className='flex justify-center items-center gap-3 w-fit'>
          <label>CVV</label>
          <input
          name='CVV'
          onChange={handleChange}
          value={cardDetails.CVV}
          placeholder='***'
          className='border rounded border-[#9cabb4] w-1/4 px-2'
          type='text' />
          <div className='text-sm text-red-500'>
            {errors.CVV}
          </div>
        </div>
        </div>

        <div className='flex justify-center items-center gap-3'>
          <label>Name (As per the card)</label>
          <input
          name='name'
          onChange={handleChange}
          value={cardDetails.name}
          placeholder='Name...'
          className='border rounded border-[#9cabb4] w-8/12 px-2'
          type='text' />
          <div className='text-sm text-red-500'>
            {errors.name}
          </div>
        </div>

        <div className='flex justify-center'>
          <button 
          className='bg-[#72383d] w-fit py-1 px-3 text-[#f2f2eb] rounded'
          type='submit'>
            Verify
          </button>
        </div>
      </form>

    </div>
  )
}

export default CardPaymentMethod