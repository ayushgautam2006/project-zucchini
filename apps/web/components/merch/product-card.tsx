"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ORDER_LINK } from "@/config/merch";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  className?: string;
}

export default function ProductCard({ name, price, image, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative w-full h-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex flex-col cursor-pointer",
        className
      )}
      onClick={() => window.open(ORDER_LINK, "_blank")}
    >
      <div className="flex-grow w-full relative overflow-hidde flex items-center justify-center p-4 bg-white">
        <div className="relative w-full aspect-[2/1] md:aspect-[16/9] lg:aspect-[2/1]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      <div className="p-4 md:p-6 text-center space-y-2 relative z-10 backdrop-blur-sm bg-black/40 border-t border-white/10">
        <h3 className="text-lg md:text-xl  font-berlins leading-tight text-white">{name}</h3>
        <p className="text-[#4ADE80] text-xl font-berlins">{price}</p>
      </div>
    </div>
  );
}
