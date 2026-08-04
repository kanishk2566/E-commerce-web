import HomeClient from "@/components/homeClient/HomeClient";
import { getAllProducts } from "@/services/products";

export default async function Home() {
  const products = await getAllProducts();
  return <HomeClient products={products} />;
}
