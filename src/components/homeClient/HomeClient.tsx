"use client"
import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import ProductGrid from '../products/ProductGrid'
import { Product } from '@/types/product'
import SearchBar from '../navbar/SearchBar'

interface HomeClientProps {
  products: Product[];
}

const HomeClient = ({products}: HomeClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  const lowercaseProducts = searchQuery.trim().toLowerCase();

  const filteredProductsTitles = products.filter((product) => product.title.toLowerCase().includes(lowercaseProducts));

  const filteredProductsDescription = products.filter((product) => product.description.toLowerCase().includes(lowercaseProducts));

  const filteredProducts = [...filteredProductsTitles, ...filteredProductsDescription];

  return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar>
          <div>
          <SearchBar value={searchQuery} handleSearchChange={handleSearchChange} />
          </div>
      </Navbar>
      <main className="mx-auto w-full lg:p-8 p-3 mt-7 lg:mt-15 mb-20">
        {filteredProducts.length ? (
          <div>
            <p className="text-xl mb-5 border-l-5 border-[#401b1b] pl-4 font-bold">
              All Products 
            </p>
            <ProductGrid products={filteredProductsTitles} />
          </div>
        ) : (
          <div className='h-full w-full flex justify-center items-center'>
            No Product found
          </div>
        )}
      </main>
    </div>
  )
}

export default HomeClient