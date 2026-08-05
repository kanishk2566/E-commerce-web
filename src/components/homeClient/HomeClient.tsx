"use client"
import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import ProductGrid from '../products/ProductGrid'
import { Product } from '@/types/product'
import SearchBar from '../navbar/Searchbar'

interface HomeClientProps {
  products: Product[];
}

const HomeClient = ({products}: HomeClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  function onSearch(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchQuery(searchInput);
    setIsSearchFocus(false);
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();

  let displayProducts: Product[];

  if (normalizedQuery === "") {
    displayProducts = products;
  } else {
    const titleMatches = products.filter((product) =>
      product.title.toLowerCase().includes(normalizedQuery)
    );

    const descriptionMatches = products.filter(
      (product) =>
        product.description.toLowerCase().includes(normalizedQuery) &&
        !titleMatches.some((titleProduct) => titleProduct.id === product.id)
    );

    displayProducts = [...titleMatches, ...descriptionMatches];
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar setIsSearchFocus={setIsSearchFocus} isSearchFocus={isSearchFocus}>
        <div>
          <SearchBar value={searchInput} onSearch={onSearch} handleSearchChange={handleSearchChange} isSearchFocus={isSearchFocus} setIsSearchFocus={setIsSearchFocus} />
        </div>
      </Navbar>
      <main className="mx-auto w-full lg:p-8 p-3 mt-10 lg:mt-15 mb-20">
        {displayProducts.length > 0 ? (
          <>
            <p className="text-xl mb-5 border-l-5 border-[#401b1b] pl-4 font-bold">
              All Products
            </p>

            <ProductGrid products={displayProducts} />
          </>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            No Product found
          </div>
        )}
      </main>
    </div>
  )
}

export default HomeClient