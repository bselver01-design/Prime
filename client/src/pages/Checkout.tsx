import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

export default function Checkout() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("np_cart_items");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const discount = 0;
  const shipping = 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const formatMoney = (n: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.city || !formData.address) {
      setError("Lutfen tum alanlari doldurun.");
      return;
    }

    const message = `Merhaba, siparis vermek istiyorum:%0A%0A` +
      `Ad Soyad: ${formData.fullName}%0A` +
      `Telefon: ${formData.phone}%0A` +
      `E-posta: ${formData.email}%0A` +
      `Sehir: ${formData.city}%0A` +
      `Adres: ${formData.address}%0A%0A` +
      `Urunler:%0A` +
      items.map(item => `- ${item.title} x${item.quantity} = ${formatMoney(Number(item.price) * item.quantity)}`).join('%0A') +
      `%0A%0AToplam: ${formatMoney(total)}`;

    window.open(`https://wa.me/905063373267?text=${message}`, '_blank');
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
              Odeme
            </span>
          </Link>

          <div className="flex gap-2.5 flex-wrap">
            <Link href="/cart">
              <Button 
                variant="outline" 
                className="border-white/16 bg-white/6 text-white font-black rounded-[14px] gap-2"
                data-testid="button-back-cart"
              >
                <ArrowLeft className="w-4 h-4" />
                Sepete Don
              </Button>
            </Link>
            <Link href="/">
              <Button 
                className="border border-[#c9a962]/38 font-black rounded-[14px]"
                style={{ background: 'linear-gradient(180deg, rgba(200,168,106,.26), rgba(255,255,255,.05))' }}
                data-testid="button-products"
              >
                Urunler
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1140px] mx-auto px-[18px]">
        {/* Page Head */}
        <section className="py-4">
          <div className="text-white/60 font-black uppercase tracking-wide text-[11px]">NaturPrime / Odeme</div>
          <h1 className="text-2xl font-black uppercase tracking-wide mt-2">Siparis Bilgileri</h1>
          <p className="text-white/70 font-bold text-sm mt-2">Adres bilgisi + siparis ozeti.</p>
        </section>

        {/* Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-3.5 pb-7 items-start">
          {/* Form Card */}
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
              <strong className="uppercase tracking-wide text-xs font-black text-white/86">Bilgiler</strong>
              <span className="text-xs px-2 py-0.5 rounded-full border border-[#c9a962]/35 bg-[#c9a962]/10 text-white/90 font-black">
                {itemCount}
              </span>
            </div>
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wide text-white/78 font-black">Ad Soyad</label>
                    <input 
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Orn: Kasim Bilgili"
                      className="px-3.5 py-3 rounded-[14px] border border-white/12 bg-white/5 text-white outline-none focus:border-[#c9a962]/35 focus:shadow-[0_0_0_4px_rgba(200,168,106,.10)]"
                      data-testid="input-fullname"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wide text-white/78 font-black">Telefon</label>
                    <input 
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05xx xxx xx xx"
                      className="px-3.5 py-3 rounded-[14px] border border-white/12 bg-white/5 text-white outline-none focus:border-[#c9a962]/35 focus:shadow-[0_0_0_4px_rgba(200,168,106,.10)]"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wide text-white/78 font-black">E-posta</label>
                    <input 
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@mail.com"
                      className="px-3.5 py-3 rounded-[14px] border border-white/12 bg-white/5 text-white outline-none focus:border-[#c9a962]/35 focus:shadow-[0_0_0_4px_rgba(200,168,106,.10)]"
                      data-testid="input-email"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wide text-white/78 font-black">Il / Ilce</label>
                    <input 
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Orn: Ankara / Cankaya"
                      className="px-3.5 py-3 rounded-[14px] border border-white/12 bg-white/5 text-white outline-none focus:border-[#c9a962]/35 focus:shadow-[0_0_0_4px_rgba(200,168,106,.10)]"
                      data-testid="input-city"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2.5">
                  <label className="text-xs uppercase tracking-wide text-white/78 font-black">Adres</label>
                  <textarea 
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Acik adres..."
                    className="px-3.5 py-3 rounded-[14px] border border-white/12 bg-white/5 text-white outline-none focus:border-[#c9a962]/35 focus:shadow-[0_0_0_4px_rgba(200,168,106,.10)] resize-y min-h-[92px]"
                    data-testid="input-address"
                  />
                </div>

                {error && (
                  <div className="mt-2.5 px-3 py-2.5 rounded-[14px] border border-red-400/25 bg-red-400/8 text-red-200/95 font-bold text-sm">
                    {error}
                  </div>
                )}

                <div className="mt-3.5 flex gap-2.5 flex-wrap">
                  <Button 
                    type="submit"
                    className="bg-white/92 text-[#0b0c10] border-white/92 font-black"
                    data-testid="button-submit-order"
                  >
                    Siparisi Tamamla
                  </Button>
                  <Link href="/cart">
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-white/16 bg-white/6 text-white font-black rounded-[14px]"
                    >
                      Geri
                    </Button>
                  </Link>
                </div>

                <p className="mt-2.5 text-white/55 text-xs leading-relaxed">
                  *Siparis bilgileri WhatsApp uzerinden iletilecektir.
                </p>
              </form>
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
            <div className="px-4 py-4 border-b border-white/10">
              <strong className="uppercase tracking-wide text-xs font-black text-white/86">Siparis Ozeti</strong>
            </div>
            <div className="p-4">
              {/* Items */}
              <div className="space-y-0">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex justify-between gap-2.5 py-2.5 border-b border-white/8 font-bold"
                  >
                    <div>
                      <span className="text-white/90">{item.title}</span>
                      <small className="block text-white/60 font-bold mt-1">Adet: {item.quantity}</small>
                    </div>
                    <span className="text-white/90">{formatMoney(Number(item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between gap-2.5 py-2.5 text-white/78 font-bold mt-2">
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

              {/* Trust Badges */}
              <div className="flex gap-2.5 flex-wrap mt-3">
                <span className="px-3 py-2.5 rounded-full border border-white/10 bg-black/16 text-white/82 font-black uppercase tracking-wide text-[11px]">
                  Guvenli Odeme
                </span>
                <span className="px-3 py-2.5 rounded-full border border-white/10 bg-black/16 text-white/82 font-black uppercase tracking-wide text-[11px]">
                  Hizli Destek
                </span>
              </div>

              <p className="mt-2.5 text-white/45 text-xs leading-relaxed">
                Siparis butonuna basinca WhatsApp uzerinden siparis bilgileri iletilir.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
