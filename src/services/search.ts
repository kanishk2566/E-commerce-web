import { Product } from "@/types/product";

export function sortProducts(products: Product[], sortBy: string) {
  const productList = [...products];

  switch (sortBy) {
      case 'A-Z':
        return productList.sort((product1, product2) => product1.title.localeCompare(product2.title));
      case 'Z-A':
        return productList.sort((product1, product2) => product2.title.localeCompare(product1.title));
      case 'Price(low to high)':
        return productList.sort((product1, product2) => product1.price - product2.price);
      case 'Price(high to low)':
        return productList.sort((product1, product2) => product2.price - product1.price);
      case 'Rating(low to high)':
        return productList.sort((product1, product2) => product1.rating.rate - product2.rating.rate);
      case 'Rating(high to low)':
        return productList.sort((product1, product2) => product2.rating.rate - product1.rating.rate);
      default:
        return productList;
    }
}