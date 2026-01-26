"use client";

import ProductCard from "@/components/merch/product-card";
import { ExpandIcon } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface MerchSectionProps {
  title: string;
  products: Product[];
  onSizeChartClick: () => void;
  titleGradient: string;
}

export default function MerchSection({
  title,
  products,
  onSizeChartClick,
  titleGradient,
}: MerchSectionProps) {
  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative w-full">
        <h2
          className={`text-2xl llsmd:text-3xl md:text-4xl font-bold font-berlins uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${titleGradient} break-inside-avoid whitespace-nowrap`}
        >
          {title}
        </h2>
        <button
          onClick={onSizeChartClick}
          className="
            group flex items-center gap-2 px-4 py-2 rounded-full 
            bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 
            transition-all duration-300
            md:absolute md:right-0
          "
        >
          <ExpandIcon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
          <span className="text-sm font-medium text-gray-300 group-hover:text-white font-sans">
            Size Chart
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
