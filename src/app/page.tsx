import HomeClient from "@/components/homeClient/HomeClient";
import HomeLoading from "@/components/laodingSkeletons/HomeLoading";
import { getAllProducts } from "@/services/products";
import { Suspense } from "react";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <>
    <Suspense fallback={<HomeLoading/>}>
      <HomeClient products={products} />
    </Suspense>
    </>
  );
}
