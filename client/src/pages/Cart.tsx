import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingCart, Phone } from "lucide-react";

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("np_cart_items");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setItems(updated);
    localStorage.setItem("np_cart_items", JSON.stringify(updated));
    updateCartCount(updated);
  };

  const removeItem = (id: number) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem("np_cart_items", JSON.stringify(updated));
    updateCartCount(updated);
  };

  const updateCartCount = (cartItems: CartItem[]) => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("np_cart_count", String(count));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-white/80 gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
          </Link>
          <h1 className="font-black text-lg tracking-wide">Sepetim</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 mx-auto text-white/20 mb-4" />
            <h2 className="text-xl font-bold mb-2">Sepetiniz Bos</h2>
            <p className="text-white/60 mb-6">Henuz urun eklemediniz</p>
            <Link href="/">
              <Button className="bg-[#c9a962] text-black font-bold" data-testid="button-shop">
                Alisverise Basla
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-4 border border-white/10 rounded-2xl bg-white/[0.03]"
                  data-testid={`cart-item-${item.id}`}
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/30 shrink-0">
                    {item.image && !item.image.startsWith('gradient') ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm mb-1 truncate">{item.title}</h3>
                    <p className="text-[#c9a962] font-bold">
                      {Number(item.price).toLocaleString('tr-TR')} TL
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="w-8 h-8 rounded-lg border-white/15"
                      onClick={() => updateQuantity(item.id, -1)}
                      data-testid={`button-decrease-${item.id}`}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="w-8 h-8 rounded-lg border-white/15"
                      onClick={() => updateQuantity(item.id, 1)}
                      data-testid={`button-increase-${item.id}`}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Remove */}
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="text-white/40 hover:text-red-400"
                    onClick={() => removeItem(item.id)}
                    data-testid={`button-remove-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/70">Toplam</span>
                <span className="text-2xl font-black text-[#c9a962]">
                  {total.toLocaleString('tr-TR')} TL
                </span>
              </div>
              <a 
                href="tel:05063373267"
                className="block"
              >
                <Button 
                  className="w-full bg-[#c9a962] text-black font-bold h-12 text-base gap-2"
                  data-testid="button-order"
                >
                  <Phone className="w-4 h-4" />
                  Siparis Ver: 0506 337 32 67
                </Button>
              </a>
              <p className="text-center text-white/50 text-xs mt-3">
                Siparisleriniz icin bizi arayin veya WhatsApp'tan ulasin
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
