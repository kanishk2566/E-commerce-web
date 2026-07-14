import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/services/api";

export default async function Home() {
  const products = await getAllProducts();
  return (   
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl p-8">
          <p className="text-2xl mb-5 border-l-3 pl-4 font-bold">
            Products 
          </p>
            <ProductGrid products={products} />
        </main>
      </>
  );
}
