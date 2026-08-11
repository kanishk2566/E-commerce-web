"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import ProductGrid from '../products/ProductGrid'
import { Product } from '@/types/product'
import SearchBar from '../navbar/Searchbar'
import { filterProducts, sortProducts } from '@/services/search'
import SortByDropdown from './SortByDropdown'
import FilterProducts from './filterProduct/FilterProducts'

interface HomeClientProps {
  products: Product[];
}

const HomeClient = ({products}: HomeClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [sortBy, setSortBy] = useState("sort by");
  const [sortDropdown, setSortDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("All");
  const [rating, setRating] = useState(0);
  const [filterModal, setFilterModal] = useState(false);
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
  if (filterModal) {
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [filterModal]);

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

  const finalProductList = sortProducts(displayProducts, sortBy);

  const productsss = filterProducts(finalProductList, minPrice, maxPrice, category, rating);

  function toggleFilterModal() {
    setFilterModal(!filterModal);
  }

  function resetFilter() {
    setMaxPrice(1000);
    setMinPrice(0);
    setCategory("All");
    setRating(0);
  }

  return (
    <div className={`flex flex-col min-h-screen w-full`}>
      <Navbar setIsSearchFocus={setIsSearchFocus} isSearchFocus={isSearchFocus}>
        <div className='flex justify-center items-center flex-1 w-full gap-3'>
          <SearchBar value={searchInput} onSearch={onSearch} handleSearchChange={handleSearchChange} isSearchFocus={isSearchFocus} setIsSearchFocus={setIsSearchFocus} />
          
        </div>
      </Navbar>
      <main className={`mx-auto w-full lg:p-8 p-3 mt-10 lg:mt-10 mb-20 relative`}>
        {displayProducts.length > 0 ? (
          <>
            <SortByDropdown setSortBy={setSortBy} sortBy={sortBy} setSortDropdown={setSortDropdown} sortDropdown={sortDropdown} toggleFilterModal={toggleFilterModal} />

            <div className="text-xl border-[#401b1b] pl-4 font-bold w-full h-10" />

            <ProductGrid products={productsss} />

            {filterModal && <FilterProducts minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} products={products} category={category} setCategory={setCategory} rating={rating} setRating={setRating}  toggleFilterModal={toggleFilterModal} resetFilter={resetFilter}/>}

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