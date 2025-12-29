import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface OrderItem {
  id: number;
  title: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
  customer: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
  };
}

export default function Success() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("np_last_order");
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  const formatMoney = (n: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("tr-TR");
  };

  const clearOrder = () => {
    localStorage.removeItem("np_last_order");
    setOrder(null);
  };

  const itemCount = order?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen flex items-center" style={{
      background: `
        radial-gradient(1100px 600px at 18% 18%, rgba(255,255,255,.08), transparent 60%),
        radial-gradient(900px 500px at 80% 30%, rgba(255,255,255,.06), transparent 55%),
        linear-gradient(180deg, #0b0c10 0%, #0f1118 100%)
      `
    }}>
      <div className="max-w-[900px] mx-auto px-[18px] py-6 w-full">
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
          {/* Header */}
          <div className="px-[18px] py-[18px] border-b border-white/10 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2.5 px-3 py-2.5 rounded-full border border-green-400/25 bg-green-400/10 font-black uppercase tracking-wide text-[11px] text-white/92">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_0_4px_rgba(86,211,100,.14)]" />
                Siparis Alindi
              </div>
              <h1 className="text-2xl uppercase tracking-wide font-black mt-2.5">Tesekkurler</h1>
              <p className="text-white/70 font-bold mt-2 leading-relaxed">
                Siparisiz basariyla olusturuldu. WhatsApp uzerinden sizinle iletisime gececegiz.
              </p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full border border-[#c9a962]/35 bg-[#c9a962]/10 text-white/90 font-black">
              {order?.id || "NP-—"}
            </span>
          </div>

          {/* Body */}
          <div className="p-[18px]">
            {/* Order Summary Box */}
            <div className="border border-white/10 bg-black/16 rounded-2xl p-3.5 mt-3">
              <div className="flex justify-between gap-2.5 py-2 border-b border-white/8 font-bold text-white/82">
                <span>Tarih</span>
                <b className="text-white/92">{order?.createdAt ? formatDate(order.createdAt) : "—"}</b>
              </div>
              <div className="flex justify-between gap-2.5 py-2 border-b border-white/8 font-bold text-white/82">
                <span>Ara Toplam</span>
                <b className="text-white/92">{formatMoney(order?.totals.subtotal || 0)}</b>
              </div>
              <div className="flex justify-between gap-2.5 py-2 border-b border-white/8 font-bold text-white/82">
                <span>Indirim</span>
                <b className="text-white/92">{formatMoney(order?.totals.discount || 0)}</b>
              </div>
              <div className="flex justify-between gap-2.5 py-2 border-b border-white/8 font-bold text-white/82">
                <span>Kargo</span>
                <b className="text-white/92">{formatMoney(order?.totals.shipping || 0)}</b>
              </div>
              <div className="flex justify-between gap-2.5 py-2 font-bold text-white/82">
                <span>Toplam</span>
                <b className="text-white/92">{formatMoney(order?.totals.total || 0)}</b>
              </div>
            </div>

            {/* Items Box */}
            <div className="border border-white/10 bg-black/16 rounded-2xl p-3.5 mt-3">
              <div className="flex justify-between gap-2.5 items-center flex-wrap">
                <strong className="uppercase tracking-wide text-xs font-black text-white/86">Urunler</strong>
                <span className="text-xs px-2 py-0.5 rounded-full border border-[#c9a962]/35 bg-[#c9a962]/10 text-white/90 font-black">
                  {itemCount}
                </span>
              </div>

              <div className="mt-2.5">
                {!order || order.items.length === 0 ? (
                  <div className="text-white/70 font-bold">Kayitli siparis bulunamadi.</div>
                ) : (
                  order.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex justify-between gap-2.5 py-2.5 border-b border-white/8 font-bold last:border-b-0"
                    >
                      <div>
                        <span className="text-white/90">{item.title}</span>
                        <small className="block text-white/60 font-bold mt-1">Adet: {item.quantity}</small>
                      </div>
                      <span className="text-white/90">{formatMoney(Number(item.price) * item.quantity)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3.5 flex gap-2.5 flex-wrap">
              <Link href="/">
                <Button 
                  className="bg-white/92 text-[#0b0c10] border-white/92 font-black"
                  data-testid="button-back-home"
                >
                  Urunlere Don
                </Button>
              </Link>
              <Link href="/">
                <Button 
                  className="border border-[#c9a962]/38 font-black rounded-[14px]"
                  style={{ background: 'linear-gradient(180deg, rgba(200,168,106,.26), rgba(255,255,255,.05))' }}
                >
                  Ana Sayfa
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="border-white/16 bg-white/6 text-white font-black rounded-[14px]"
                onClick={clearOrder}
                data-testid="button-clear-order"
              >
                Siparis Kaydini Sil
              </Button>
            </div>

            <p className="mt-3 text-white/45 text-xs leading-relaxed">
              *Siparis verisi sadece tarayicida tutulur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
