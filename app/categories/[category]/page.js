import React from "react";
import DropdownMenu from "@/app/components/DropDownMenu";
import { getProductsByCategory } from "@/utils/ServerActions";
import CategoryProductsCard from "@/app/components/CategoryProductsCard";

export const dynamic = "force-dynamic"; // ensures SSR on every request

export async function generateMetadata({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category)
  const products = await getProductsByCategory(decodedCategory);
  return {
    title: `${decodedCategory} | FlashCart` || "Category",
    description: `Shop ${decodedCategory} products at FlashCart. ${products.length} items available!`,
  };
}

const CategoriesPage = async ({ params }) => {
  const { category } = await params;
  const urlDecode = decodeURIComponent(category)

  // ✅ Fetch products server-side
  const products = await getProductsByCategory(urlDecode);

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto flex justify-between items-center p-2 sm:p-4 md:text-lg">
        <div>
          <span className="font-semibold">
            Total Products:{" "}
            <span className="text-red-600">{products.length}</span>
          </span>
        </div>
        <div className="mr-3 sm:mr-6">
          <DropdownMenu currentCategory={urlDecode} />
        </div>
      </div>

      {/* ✅ Map the fetched products */}
      <CategoryProductsCard products={products} />
    </div>
  );
};

export default CategoriesPage;
