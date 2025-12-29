import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone, Mail, Instagram, Minus, Plus, Star, Send } from "lucide-react";
import type { Product, Review } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "benefits" | "shipping">("specs");
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: "", desc: "" });
  const [reviewName, setReviewName] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/products", id, "reviews"],
    queryFn: () => fetch(`/api/products/${id}/reviews`).then(r => r.json()),
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: { name: string; content: string; rating: number }) => {
      return apiRequest("POST", `/api/products/${id}/reviews`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products", id, "reviews"] });
      setReviewName("");
      setReviewContent("");
      setReviewRating(5);
      showToastMessage("Yorum eklendi", "Yorumunuz icin tesekkurler!");
    },
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewContent.trim()) return;
    createReviewMutation.mutate({ name: reviewName, content: reviewContent, rating: reviewRating });
  };

  useEffect(() => {
    const count = parseInt(localStorage.getItem("np_cart_count") || "0", 10);
    setCartCount(count);
  }, []);

  const handleQtyChange = (delta: number) => {
    setQty((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  const showToastMessage = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const stored = localStorage.getItem("np_cart_items");
    const items = stored ? JSON.parse(stored) : [];
    
    const existingIndex = items.findIndex((item: any) => item.id === product.id);
    if (existingIndex >= 0) {
      items[existingIndex].quantity += qty;
    } else {
      items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: qty
      });
    }
    
    localStorage.setItem("np_cart_items", JSON.stringify(items));
    const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    localStorage.setItem("np_cart_count", String(count));
    setCartCount(count);
    
    showToastMessage("Sepete eklendi", `${product?.title} • Adet: ${qty}`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    const stored = localStorage.getItem("np_cart_items");
    const items = stored ? JSON.parse(stored) : [];
    
    const existingIndex = items.findIndex((item: any) => item.id === product.id);
    if (existingIndex >= 0) {
      items[existingIndex].quantity += qty;
    } else {
      items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: qty
      });
    }
    
    localStorage.setItem("np_cart_items", JSON.stringify(items));
    const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    localStorage.setItem("np_cart_count", String(count));
    setCartCount(count);
    
    window.location.href = "/cart";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c9a962] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0b0c10] flex flex-col items-center justify-center text-white gap-4">
        <p className="text-lg">Urun bulunamadi</p>
        <Link href="/catalog">
          <Button variant="outline">Urunlere Don</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e8ebf2]" style={{
      background: `
        radial-gradient(1100px 600px at 18% 18%, rgba(255,255,255,.08), transparent 60%),
        radial-gradient(900px 500px at 80% 30%, rgba(255,255,255,.06), transparent 55%),
        linear-gradient(180deg, #0b0c10 0%, #0f1118 100%)
      `
    }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/25">
        <div className="max-w-[1140px] mx-auto px-[18px] flex items-center justify-between min-h-[68px] gap-[14px] flex-wrap py-[10px]">
          <Link href="/" className="flex items-center gap-[10px] font-black tracking-wider uppercase select-none">
            <span className="w-9 h-9 rounded-xl border border-white/15 shadow-lg flex-shrink-0" style={{
              background: `
                radial-gradient(18px 18px at 30% 25%, rgba(255,255,255,.35), transparent 55%),
                linear-gradient(135deg, rgba(255,255,255,.18), rgba(255,255,255,.05))
              `
            }} />
            <span>NaturPrime</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/[.18] bg-black/25 text-white/85 font-black">
              Urun
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-white/70 font-extrabold">
            <Link href="/" className="px-3 py-2.5 rounded-xl border border-transparent uppercase tracking-wide text-xs hover:text-white hover:border-white/10 hover:bg-white/[.04] transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/catalog" className="px-3 py-2.5 rounded-xl border border-transparent uppercase tracking-wide text-xs hover:text-white hover:border-white/10 hover:bg-white/[.04] transition-colors">
              Urunler
            </Link>
            <Link href="/#iletisim" className="px-3 py-2.5 rounded-xl border border-transparent uppercase tracking-wide text-xs hover:text-white hover:border-white/10 hover:bg-white/[.04] transition-colors">
              Iletisim
            </Link>
          </nav>

          <Link href="/cart">
            <Button 
              variant="outline" 
              className="border-white/15 bg-white/[.06] text-white rounded-[14px] font-black gap-2.5"
              data-testid="button-cart-header"
            >
              <ShoppingCart className="w-4 h-4" />
              Sepet
              <span className="text-xs px-2 py-0.5 rounded-full border border-white/[.18] bg-black/25 text-white/85 font-black">
                {cartCount}
              </span>
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Breadcrumb */}
        <section className="py-[18px] pb-2">
          <div className="max-w-[1140px] mx-auto px-[18px]">
            <div className="text-white/60 font-black uppercase tracking-wide text-[11px]">
              <Link href="/catalog" className="opacity-90 hover:opacity-100">Urunler</Link>
              {" / "}
              <span data-testid="text-product-name">{product.title}</span>
            </div>
          </div>
        </section>

        {/* Main Layout */}
        <section>
          <div className="max-w-[1140px] mx-auto px-[18px] grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-[14px] pb-[26px] items-start">
            {/* Left Card */}
            <div className="border border-white/10 bg-black/[.18] rounded-3xl shadow-2xl overflow-hidden">
              {/* Gallery */}
              <div className="p-4">
                <div className="h-[320px] md:h-[420px] rounded-3xl border border-white/10 relative overflow-hidden bg-black/30">
                  {product.image && !product.image.startsWith('gradient') ? (
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                      loading="eager"
                      decoding="async"
                      style={{
                        maskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 50%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 50%, black 50%, transparent 80%)',
                      }}
                    />
                  ) : (
                    <div 
                      className="w-full h-full"
                      style={{
                        background: `radial-gradient(220px 140px at 30% 30%, rgba(255,255,255,.12), transparent 60%), linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))`
                      }}
                    />
                  )}
                  {product.badge && (
                    <span className="absolute top-[14px] left-[14px] px-3 py-2 rounded-full border border-white/15 bg-black/30 text-white/90 font-black tracking-wide uppercase text-[11px]">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className={`h-[74px] rounded-[14px] border border-white/10 bg-white/5 cursor-pointer ${i === 1 ? "outline outline-[3px] outline-white/15" : ""}`}
                      data-testid={`thumb-${i}`}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-[18px] pt-0">
                <h1 className="text-2xl md:text-[26px] uppercase tracking-wide font-black my-2" data-testid="text-product-title">
                  {product.title}
                </h1>
                <p className="font-black text-[22px] tracking-wide mb-2.5" data-testid="text-product-price">
                  {formatPrice(Number(product.price))}
                </p>
                <p className="text-white/70 leading-relaxed text-sm max-w-[70ch] mb-[14px]">
                  {product.description}
                </p>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-[14px]">
                    {product.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-[11px] px-2.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/75 font-bold tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Trust badges */}
                <div className="flex gap-2.5 flex-wrap my-[14px]">
                  <span className="inline-flex items-center gap-2 px-3 py-2.5 rounded-full border border-white/10 bg-black/15 text-white/80 font-black uppercase tracking-wide text-[11px]">
                    <span className="w-[9px] h-[9px] rounded-full bg-[#c9a962] shadow-[0_0_0_4px_rgba(57,211,83,.16)]" />
                    Guvenli Odeme
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-2.5 rounded-full border border-white/10 bg-black/15 text-white/80 font-black uppercase tracking-wide text-[11px]">
                    <span className="w-[9px] h-[9px] rounded-full bg-white/65" />
                    Kolay Iade
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-2.5 rounded-full border border-white/10 bg-black/15 text-white/80 font-black uppercase tracking-wide text-[11px]">
                    <span className="w-[9px] h-[9px] rounded-full bg-white/65" />
                    Hizli Destek
                  </span>
                </div>

                {/* Buy box */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-2.5 items-stretch">
                  <div className="flex items-center justify-between border border-white/10 bg-white/5 rounded-[14px] overflow-hidden">
                    <button 
                      onClick={() => handleQtyChange(-1)}
                      className="w-[42px] h-[46px] bg-transparent border-none text-white/85 font-black cursor-pointer hover:bg-white/5"
                      data-testid="button-qty-dec"
                    >
                      <Minus className="w-4 h-4 mx-auto" />
                    </button>
                    <span className="min-w-6 text-center font-black" data-testid="text-qty">{qty}</span>
                    <button 
                      onClick={() => handleQtyChange(1)}
                      className="w-[42px] h-[46px] bg-transparent border-none text-white/85 font-black cursor-pointer hover:bg-white/5"
                      data-testid="button-qty-inc"
                    >
                      <Plus className="w-4 h-4 mx-auto" />
                    </button>
                  </div>

                  <div className="flex gap-2.5 flex-wrap">
                    <Button 
                      onClick={handleAddToCart}
                      className="flex-1 min-w-[140px] py-[14px] bg-white/90 text-[#0b0c10] border-white/90 font-black hover:bg-white"
                      data-testid="button-add-to-cart"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Sepete Ekle
                    </Button>
                    <Button 
                      onClick={handleBuyNow}
                      className="flex-1 min-w-[140px] py-[14px] border-white/20 bg-gradient-to-b from-white/15 to-white/[.06] text-white font-black"
                      data-testid="button-buy-now"
                    >
                      Satin Al
                    </Button>
                  </div>
                </div>

                <div className="my-4 border-t border-white/10" />

                {/* Tabs */}
                <div className="flex gap-2 flex-wrap mt-1">
                  {(["specs", "benefits", "shipping"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-2.5 rounded-full border font-black uppercase tracking-wide text-[11px] cursor-pointer transition-colors ${
                        activeTab === tab 
                          ? "bg-white/10 border-white/[.18] text-white/90" 
                          : "bg-white/5 border-white/10 text-white/85 hover:bg-white/[.08]"
                      }`}
                      data-testid={`tab-${tab}`}
                    >
                      {tab === "specs" ? "Teknik" : tab === "benefits" ? "Faydalar" : "Kargo/Iade"}
                    </button>
                  ))}
                </div>

                <div className="mt-3 border border-white/10 bg-black/15 rounded-2xl p-[14px] text-white/70 text-sm leading-relaxed">
                  {activeTab === "specs" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
                      <div className="border border-white/10 bg-white/[.04] rounded-[14px] p-3">
                        <b className="block text-white/90 text-xs uppercase tracking-wide mb-1.5">Icerik</b>
                        <span className="text-white/70 font-bold text-[13px]">Anavar</span>
                      </div>
                      <div className="border border-white/10 bg-white/[.04] rounded-[14px] p-3">
                        <b className="block text-white/90 text-xs uppercase tracking-wide mb-1.5">Kullanim</b>
                        <span className="text-white/70 font-bold text-[13px]">Gunde 1-2 kapsul</span>
                      </div>
                      <div className="border border-white/10 bg-white/[.04] rounded-[14px] p-3">
                        <b className="block text-white/90 text-xs uppercase tracking-wide mb-1.5">Net Miktar</b>
                        <span className="text-white/70 font-bold text-[13px]">100 tablet</span>
                      </div>
                    </div>
                  )}
                  {activeTab === "benefits" && (
                    <ul className="list-disc pl-[18px] space-y-1">
                      <li>Yan etkisi olmayan steroid etkisi</li>
                      <li>Hizli kas gelisimi destegi</li>
                      <li>Guc ve dayaniklilik artisi</li>
                    </ul>
                  )}
                  {activeTab === "shipping" && (
                    <div className="space-y-2">
                      <p><b className="text-white/90">Kargo:</b> Turkiye geneli ucretsiz kargo</p>
                      <p><b className="text-white/90">Iade:</b> 14 gun icerisinde kolay iade</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Card */}
            <aside className="border border-white/10 bg-black/[.18] rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-4">
                <h3 className="text-xs uppercase tracking-wide font-black text-white/85 mb-2">Net Bilgi</h3>
                <p className="text-white/70 leading-relaxed text-[13px]">
                  Urun detayinda sadece gerekli olani goster: aciklama, teknik bilgi, fayda ve net satin alma.
                </p>

                {/* Contact Box */}
                <div className="border border-white/10 bg-black/15 rounded-2xl p-[14px] mt-3">
                  <h3 className="text-xs uppercase tracking-wide font-black text-white/85 mb-2">Iletisim</h3>
                  <p className="text-white/70 leading-relaxed text-[13px] mb-2.5">Site ici iletisim.</p>
                  <div className="flex flex-col gap-2 font-black">
                    <div className="inline-flex items-center gap-2.5 px-3 py-2.5 rounded-[14px] border border-white/10 bg-white/[.04] w-fit text-sm">
                      <Phone className="w-4 h-4" />
                      0534 587 26 37
                    </div>
                    <div className="inline-flex items-center gap-2.5 px-3 py-2.5 rounded-[14px] border border-white/10 bg-white/[.04] w-fit text-sm">
                      <Mail className="w-4 h-4" />
                      naturprime0@gmail.com
                    </div>
                    <a 
                      href="https://instagram.com/naturprime" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-3 py-2.5 rounded-[14px] border border-white/10 bg-white/[.04] w-fit text-sm hover:bg-white/[.06] transition-colors"
                      data-testid="link-instagram-detail"
                    >
                      <Instagram className="w-4 h-4" />
                      @naturprime
                    </a>
                  </div>
                </div>

                {/* Reviews Section */}
                <div className="border border-white/10 bg-black/15 rounded-2xl p-[14px] mt-3">
                  <h3 className="text-xs uppercase tracking-wide font-black text-white/85 mb-3">
                    Yorumlar ({reviews.length})
                  </h3>

                  {/* Review Form */}
                  <form onSubmit={handleSubmitReview} className="mb-4">
                    <input
                      type="text"
                      placeholder="Adiniz"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-[14px] border border-white/10 bg-white/[.04] text-white placeholder:text-white/40 text-sm mb-2 outline-none focus:border-white/20"
                      data-testid="input-review-name"
                    />
                    <textarea
                      placeholder="Yorumunuz..."
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-[14px] border border-white/10 bg-white/[.04] text-white placeholder:text-white/40 text-sm mb-2 outline-none focus:border-white/20 resize-none"
                      data-testid="input-review-content"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="p-1"
                            data-testid={`button-star-${star}`}
                          >
                            <Star 
                              className={`w-4 h-4 ${star <= reviewRating ? "fill-[#c9a962] text-[#c9a962]" : "text-white/30"}`} 
                            />
                          </button>
                        ))}
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        disabled={createReviewMutation.isPending}
                        className="bg-[#c9a962] text-black font-black hover:bg-[#c9a962]/90"
                        data-testid="button-submit-review"
                      >
                        <Send className="w-3 h-3 mr-1.5" />
                        Gonder
                      </Button>
                    </div>
                  </form>

                  {/* Reviews List */}
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {reviewsLoading ? (
                      <p className="text-white/50 text-sm">Yukleniyor...</p>
                    ) : reviews.length === 0 ? (
                      <p className="text-white/50 text-sm">Henuz yorum yapilmamis. Ilk yorumu siz yapin!</p>
                    ) : (
                      reviews.map((review) => (
                        <div 
                          key={review.id} 
                          className="border border-white/10 bg-white/[.04] rounded-[14px] p-3"
                          data-testid={`review-${review.id}`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-black text-sm text-white/90">{review.name}</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`w-3 h-3 ${star <= (review.rating || 5) ? "fill-[#c9a962] text-[#c9a962]" : "text-white/30"}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed">{review.content}</p>
                          {review.tag && (
                            <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 font-bold uppercase tracking-wide">
                              {review.tag}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* Toast */}
      <div 
        className={`fixed left-1/2 bottom-[18px] -translate-x-1/2 bg-black/75 border border-white/10 rounded-[14px] px-[14px] py-3 text-white/90 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 font-black max-w-[min(620px,calc(100%-24px))] transition-all duration-200 ${
          showToast ? "opacity-100 -translate-y-1" : "opacity-0 pointer-events-none"
        }`}
        role="status"
      >
        <div>
          <div>{toastMessage.title}</div>
          <small className="text-white/75 font-black">{toastMessage.desc}</small>
        </div>
        <div className="flex gap-2.5 items-center border-l border-white/10 pl-3">
          <span className="text-xs px-2 py-0.5 rounded-full border border-white/[.18] bg-black/25 text-white/85">Sepet</span>
          <strong>{cartCount}</strong>
          <button 
            onClick={() => setShowToast(false)}
            className="px-2.5 py-2 rounded-[14px] border border-white/15 bg-white/[.06] text-white font-black text-sm hover:bg-white/[.08]"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
