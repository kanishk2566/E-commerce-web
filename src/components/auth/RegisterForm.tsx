"use client"
import { useAuth } from '@/context/AuthContext'
import { RegisterData } from '@/types/user';
import { RegisterFormErrors, validateRegisterForm } from '@/validators/RegisterValidator';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import Navbar from '../navbar/Navbar';
import FormInterface from '../FormInterface';

const RegisterCard = () => {
  const { register, isLoading } = useAuth();
  const [errors, setErrors] = useState<RegisterFormErrors>({
    name: "",
    password: "",
    email: "",
  });
  const [apiError, setApiError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passFocus, setPassFocus] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    setApiError("");
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }))
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = validateRegisterForm(formData);
      setErrors(result.errors);

      if(!result.isValid) return;

      await register(formData);
      router.push("/");
    }
    catch(apiError) {
      if(apiError instanceof Error) {
        setApiError(apiError.message);
        console.log(apiError.message);
      }
    }
  }

  function togglePasswordVisible() {
    setPasswordType((prev) => prev === "password" ? "text" : "password");
  }

  const backButton = <IoArrowBackOutline />;

  function closingComponent() {
    router.push("/");
  }

  return (
    <div className='w-full h-full min-h-screen flex flex-col justify-start items-center'>

      <Navbar />
      
      <div className='h-full w-full flex justify-center items-center mt-20 mb-10'>
        <FormInterface handleSubmit={handleSubmit} type='register' formData={formData} isLoading={isLoading} handleChange={handleChange} errors={errors} setPassFocus={setPassFocus} apiError={apiError} backButton={backButton} togglePasswordVisible={togglePasswordVisible} passwordType={passwordType} passFocus={passFocus} closingComponent={closingComponent} />
      </div>
    </div>
  )
}

export default RegisterCard