import { ShoppingCart } from "lucide-react";
import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-[#121522] rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col h-full">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10 bg-primary/20 backdrop-blur-md border border-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {product.badge}
        </div>
      )}

      {/* Image Area */}
      <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#1a1d2d]">
        {/* Abstract Gradient Placeholder if no real image */}
        <div 
          className="absolute inset-0 w-full h-full opacity-80 transition-transform duration-700 group-hover:scale-105"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%), 
                         linear-gradient(135deg, rgba(86, 211, 100, 0.05), rgba(11, 12, 16, 1))`
          }}
        />
        {/* If real image URL exists (and not placeholder text), use it */}
        {product.image && !product.image.includes("gradient") && (
          <img 
            src={product.image} 
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Fiyat</span>
            <span className="text-xl font-bold text-primary">₺{Number(product.price).toLocaleString('tr-TR')}</span>
          </div>
          
          <Button 
            size="sm"
            className="bg-white/5 hover:bg-primary hover:text-black text-white border border-white/10 hover:border-primary transition-all duration-300 rounded-xl px-4"
            onClick={() => console.log('Add to cart:', product.id)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
