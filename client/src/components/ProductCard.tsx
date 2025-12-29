import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const stored = localStorage.getItem("np_cart_items");
    const items = stored ? JSON.parse(stored) : [];
    
    const existingIndex = items.findIndex((item: any) => item.id === product.id);
    if (existingIndex >= 0) {
      items[existingIndex].quantity += 1;
    } else {
      items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    localStorage.setItem("np_cart_items", JSON.stringify(items));
    const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    localStorage.setItem("np_cart_count", String(count));
    
    toast({
      title: "Sepete Eklendi",
      description: product.title,
    });
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <Link href={`/product/${product.id}`}>
    <div 
      className="bg-white/[0.03] border border-white/10 rounded-[16px] overflow-hidden flex flex-col min-h-[280px] cursor-pointer hover:border-white/20 transition-colors"
      style={{ boxShadow: '0 10px 28px rgba(0,0,0,0.26)' }}
      data-testid={`product-card-${product.id}`}
    >
      {/* Product Image */}
      <div className="h-[160px] relative border-b border-white/10 overflow-hidden bg-black/30">
        {product.image && !product.image.startsWith('gradient') ? (
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 50%, transparent 85%)',
            }}
          />
        ) : (
          <div 
            className="w-full h-full"
            style={{
              background: 'radial-gradient(140px 90px at 30% 30%, rgba(255,255,255,0.12), transparent 60%), linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
            }}
          />
        )}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 text-[11px] px-2.5 py-1.5 rounded-full border border-white/16 bg-black/25 text-white/86 font-extrabold tracking-wide uppercase">
            {product.badge}
          </span>
        )}
      </div>
      
      {/* Body */}
      <div className="p-3.5 flex-1">
        <h3 className="font-extrabold tracking-wide text-sm mb-1.5" data-testid={`product-title-${product.id}`}>
          {product.title}
        </h3>
        <p className="text-xs text-white/65 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between gap-2.5 p-3.5 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-2">
          {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
            <span className="text-white/40 text-sm line-through" data-testid={`product-original-price-${product.id}`}>
              {Number(product.originalPrice).toLocaleString('tr-TR')} TL
            </span>
          )}
          <span className="font-extrabold text-[#c9a962] text-base" data-testid={`product-price-${product.id}`}>
            {Number(product.price).toLocaleString('tr-TR')} TL
          </span>
        </div>
        <Button 
          size="sm"
          className="border border-white/18 bg-white/7 text-foreground hover:bg-white/12 rounded-xl px-3 h-9 text-xs font-extrabold"
          data-testid={`button-add-to-cart-${product.id}`}
          onClick={handleAddToCart}
        >
          Sepete Ekle
        </Button>
      </div>
    </div>
    </Link>
  );
}
