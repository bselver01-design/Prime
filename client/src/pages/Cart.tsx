import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingCart } from "lucide-react";

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
        const newQty = Math.max(1, Math.min(99, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0);
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

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("np_cart_items");
    localStorage.setItem("np_cart_count", "0");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateCartCount = (cartItems: CartItem[]) => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("np_cart_count", String(count));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const discount = 0;
  const shipping = 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const formatMoney = (n: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
  };

  return (
    <div className="min-h-screen" style={{
      background: `
        radial-gradient(1100px 600px at 18% 18%, rgba(255,255,255,.08), transparent 60%),
        radial-gradient(900px 500px at 80% 30%, rgba(255,255,255,.06), transparent 55%),
        linear-gradient(180deg, #0b0c10 0%, #0f1118 100%)
      `
    }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur-xl">
        <div className="max-w-[1140px] mx-auto px-[18px] py-3 flex items-center justify-between gap-4 flex-wrap">
          <Link href="/" className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-xl border border-white/16"
              style={{
                background: 'radial-gradient(18px 18px at 30% 25%, rgba(255,255,255,.35), transparent 55%), linear-gradient(135deg, rgba(255,255,255,.18), rgba(255,255,255,.05))',
                boxShadow: '0 10px 30px rgba(0,0,0,.35)'
              }}
            />
            <span className="font-black tracking-wide uppercase">NaturPrime</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-[#c9a962]/35 bg-[#c9a962]/10 text-white/90 font-black">
              Sepet
            </span>
          </Link>

          <div className="flex gap-2.5 flex-wrap">
            <Link href="/">
              <Button 
                variant="outline" 
                className="border-white/16 bg-white/6 text-white font-black rounded-[14px] gap-2"
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4" />
                Urunlere Don
              </Button>
            </Link>
            <Button 
              className="border border-[#c9a962]/38 font-black rounded-[14px]"
              style={{ background: 'linear-gradient(180deg, rgba(200,168,106,.26), rgba(255,255,255,.05))' }}
              data-testid="button-checkout-header"
              onClick={() => window.open('https://wa.me/905063373267', '_blank')}
            >
              Odemeye Gec
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1140px] mx-auto px-[18px]">
        {/* Page Head */}
        <section className="py-4">
          <div className="text-white/60 font-black uppercase tracking-wide text-[11px]">NaturPrime / Sepet</div>
          <h1 className="text-2xl font-black uppercase tracking-wide mt-2">Sepet</h1>
          <p className="text-white/70 font-bold text-sm mt-2">Urun adedi ve toplam tutar burada.</p>
        </section>

        {/* Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-3.5 pb-7 items-start">
          {/* Items Card */}
          <div 
            className="border border-white/10 rounded-3xl overflow-hidden"
            style={{
              background: `
                radial-gradient(520px 260px at 35% 20%, rgba(200,168,106,.10), transparent 55%),
                linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.12)),
                rgba(0,0,0,.18)
              `,
              boxShadow: '0 16px 45px rgba(0,0,0,.35)'
            }}
          >
            <div className="px-4 py-4 border-b border-white/10 flex justify-between items-center gap-2.5">
              <strong className="uppercase tracking-wide text-xs font-black text-white/86">Urunler</strong>
              <span className="text-xs px-2 py-0.5 rounded-full border border-[#c9a962]/35 bg-[#c9a962]/10 text-white/90 font-black">
                {itemCount}
              </span>
            </div>
            <div className="p-4">
              {items.length === 0 ? (
                <div className="py-6 text-white/70 font-bold leading-relaxed">
                  <ShoppingCart className="w-12 h-12 mx-auto text-white/20 mb-4" />
                  <p className="text-center">Sepet bos.<br />Kataloga gidip urun ekleyebilirsin.</p>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="grid grid-cols-[70px_1fr_auto] gap-3 py-3.5 border-b border-white/8 items-center"
                      data-testid={`cart-item-${item.id}`}
                    >
                      {/* Thumb */}
                      <div 
                        className="w-[70px] h-[70px] rounded-2xl border border-white/10 overflow-hidden"
                        style={{
                          background: `
                            radial-gradient(120px 80px at 35% 25%, rgba(200,168,106,.22), transparent 60%),
                            linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))
                          `
                        }}
                      >
                        {item.image && !item.image.startsWith('gradient') && (
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div>
                        <p className="font-black tracking-wide uppercase text-sm m-0">{item.title}</p>
                        <p className="text-[#c9a962] font-black tracking-tight mt-1.5 m-0">
                          {formatMoney(Number(item.price))}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col gap-2.5 items-end">
                        <div className="flex items-center justify-between w-[120px] border border-white/12 bg-white/5 rounded-[14px] overflow-hidden">
                          <button 
                            className="w-[38px] h-10 bg-transparent border-none text-white/85 font-black cursor-pointer"
                            onClick={() => updateQuantity(item.id, -1)}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            −
                          </button>
                          <span className="min-w-[22px] text-center font-black">{item.quantity}</span>
                          <button 
                            className="w-[38px] h-10 bg-transparent border-none text-white/85 font-black cursor-pointer"
                            onClick={() => updateQuantity(item.id, 1)}
                            data-testid={`button-increase-${item.id}`}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="border border-white/14 bg-transparent text-white/85 px-2.5 py-2 rounded-xl font-black cursor-pointer hover:bg-white/5 text-sm"
                          onClick={() => removeItem(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary Card */}
          <aside 
            className="border border-white/10 rounded-3xl overflow-hidden"
            style={{
              background: `
                radial-gradient(520px 260px at 35% 20%, rgba(200,168,106,.10), transparent 55%),
                linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.12)),
                rgba(0,0,0,.18)
              `,
              boxShadow: '0 16px 45px rgba(0,0,0,.35)'
            }}
          >
            <div className="px-4 py-4 border-b border-white/10 flex justify-between items-center gap-2.5">
              <strong className="uppercase tracking-wide text-xs font-black text-white/86">Ozet</strong>
              <button 
                className="border border-white/16 bg-white/6 text-white px-3 py-2 rounded-xl font-black text-xs cursor-pointer hover:bg-white/8"
                onClick={clearCart}
                data-testid="button-clear-cart"
              >
                Temizle
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between gap-2.5 py-2.5 text-white/78 font-bold">
                <span>Ara Toplam</span>
                <b className="text-white/92">{formatMoney(subtotal)}</b>
              </div>
              <div className="flex justify-between gap-2.5 py-2.5 text-white/78 font-bold">
                <span>Indirim</span>
                <b className="text-white/92">{formatMoney(discount)}</b>
              </div>
              <div className="flex justify-between gap-2.5 py-2.5 text-white/78 font-bold">
                <span>Kargo</span>
                <b className="text-white/92">{formatMoney(shipping)}</b>
              </div>
              <div className="flex justify-between gap-2.5 py-3.5 mt-2 border-t border-white/10">
                <span className="text-lg text-white/92 font-black tracking-tight">Toplam</span>
                <b className="text-lg text-white/92 font-black tracking-tight">{formatMoney(total)}</b>
              </div>

              <div className="grid gap-2.5 mt-2.5">
                <Link href="/">
                  <Button 
                    variant="outline" 
                    className="w-full border-white/16 bg-white/6 text-white font-black rounded-[14px]"
                  >
                    Alisverise Devam
                  </Button>
                </Link>
                <Link href="/checkout" className="w-full">
                  <Button 
                    className="w-full bg-white/92 text-[#0b0c10] border-white/92 font-black h-11"
                    data-testid="button-checkout"
                  >
                    Odemeye Gec
                  </Button>
                </Link>
              </div>

              <p className="mt-2.5 text-white/45 text-xs leading-relaxed">
                *Kredi karti ile guvenli odeme yapabilirsiniz.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
