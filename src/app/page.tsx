import Navbar from "@/components/navbar/Navbar";
import ProductGrid from "@/components/products/ProductGrid";
import { getAllProducts } from "@/services/api";

export default async function Home() {
  const products = await getAllProducts();
  return (   
    <div className="flex flex-col justify-between">
      <Navbar inCart={false} inHome={true} inRegister={false} inLogin={false} inProfile={false}/>
      <main className="mx-auto max-w-7xl p-8">
        <p className="text-2xl mb-5 border-l-5 border-blue-500 pl-4 font-bold">
          All Products 
        </p>
          <ProductGrid products={products} />
      </main>
    </div>
  );
}
