import { Product } from "@/types/product";

export function sortProducts(products: Product[], sortBy: string) {
  const productList = [...products];

  switch (sortBy) {
    case 'A-Z':
      return productList.sort((product1, product2) => product1.title.localeCompare(product2.title));
    case 'Z-A':
      return productList.sort((product1, product2) => product2.title.localeCompare(product1.title));
    case 'Price (Low to High)':
      return productList.sort((product1, product2) => product1.price - product2.price);
    case 'Price (High to Low)':
      return productList.sort((product1, product2) => product2.price - product1.price);
    case 'Rating (Low to High)':
      return productList.sort((product1, product2) => product1.rating.rate - product2.rating.rate);
    case 'Rating (High to Low)':
      return productList.sort((product1, product2) => product2.rating.rate - product1.rating.rate);
    default:
      return productList;
  }
}

export function filterProducts(products: Product[], minPrice?: number, maxPrice?: number, category?: string, rating?: number) {
  const productList = [...products];

  const categoryWise = productList.filter((item) => 
    category !== "All" ?
    item.category === category 
    : item
  );

  const priceWise = productList.filter((item) => 
    minPrice && maxPrice ? 
    item.price > minPrice && item.price < maxPrice
    : item
  );

  const ratingWise = productList.filter((item) => 
    rating ?
    item.rating.rate > rating 
    : item
  );

  const filteredProducts = [categoryWise, priceWise, ratingWise];

  const commonItems = priceWise.filter(item => filteredProducts.every(array => array.includes(item)));
  
  return commonItems;
  
}
