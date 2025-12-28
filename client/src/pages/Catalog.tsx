import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search, ShoppingCart, X } from "lucide-react";
import { type Product } from "@shared/schema";

type SortMode = "popularity" | "new" | "bestseller" | "priceAsc" | "priceDesc";
type ChipFilter = "all" | "new" | "popular" | "bestseller" | "limited";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("popularity");
  const [activeChip, setActiveChip] = useState<ChipFilter>("all");
  const [maxPrice, setMaxPrice] = useState(2499);
  const [cartCount, setCartCount] = useState(() => {
    const stored = localStorage.getItem("np_cart_count");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const showToast = (title: string, desc: string) => {
    setToast({ title, desc });
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product: Product) => {
    const newCount = cartCount + 1;
    setCartCount(newCount);
    localStorage.setItem("np_cart_count", String(newCount));
    showToast("Sepete Eklendi", product.title);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Chip filter
    if (activeChip !== "all") {
      result = result.filter(p => p.badge?.toLowerCase() === activeChip);
    }

    // Price filter
    result = result.filter(p => Number(p.price) <= maxPrice);

    // Sort
    switch (sortMode) {
      case "priceAsc":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "priceDesc":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "new":
        result.sort((a, b) => b.id - a.id);
        break;
      case "bestseller":
      case "popularity":
      default:
        break;
    }

    return result;
  }, [products, searchQuery, activeChip, maxPrice, sortMode]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveChip("all");
    setMaxPrice(2499);
    setSortMode("popularity");
  };

  const chips: { key: ChipFilter; label: string }[] = [
    { key: "all", label: "Hepsi" },
    { key: "new", label: "Yeni" },
    { key: "popular", label: "Populer" },
    { key: "bestseller", label: "Cok Satan" },
    { key: "limited", label: "Sinirli" },
  ];

  const getBadgeClass = (badge: string | null) => {
    if (badge === "Yeni") return "badge-ok";
    if (badge === "Sinirli Stok") return "badge-warn";
    return "";
  };

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(1100px 600px at 18% 18%, rgba(255,255,255,.08), transparent 60%), radial-gradient(900px 500px at 80% 30%, rgba(255,255,255,.06), transparent 55%), linear-gradient(180deg, #0b0c10 0%, #0f1118 100%)' }}>
      {/* Topbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-[10px]" style={{ background: 'rgba(0,0,0,.25)' }}>
        <div className="max-w-[1140px] mx-auto px-[18px] flex items-center justify-between min-h-[68px] gap-[14px] py-[10px] flex-wrap">
          <Link href="/" className="flex items-center gap-[10px] font-black tracking-[.9px] uppercase select-none" data-testid="link-home">
            <span className="w-9 h-9 rounded-[12px] border border-white/16 relative overflow-hidden flex-shrink-0" style={{ background: 'radial-gradient(18px 18px at 30% 25%, rgba(255,255,255,.35), transparent 55%), linear-gradient(135deg, rgba(255,255,255,.18), rgba(255,255,255,.05))', boxShadow: '0 10px 30px rgba(0,0,0,.35)' }}>
              <span className="absolute inset-[-40%] animate-shine" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)', transform: 'rotate(25deg)' }} />
            </span>
            <span>NaturPrime</span>
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/18 bg-black/25 text-white/85 font-black">Urunler</span>
          </Link>

          <nav className="flex items-center gap-2 text-white/70 font-extrabold">
            <Link href="/" className="px-3 py-2.5 rounded-[12px] border border-transparent text-xs uppercase tracking-[.35px] hover:text-white hover:border-white/10 hover:bg-white/[.04]" data-testid="nav-home">Ana Sayfa</Link>
            <Link href="/catalog" className="px-3 py-2.5 rounded-[12px] border border-white/10 bg-white/[.04] text-xs uppercase tracking-[.35px] text-white" data-testid="nav-catalog">Urunler</Link>
          </nav>

          <div className="flex items-center gap-[10px] ml-auto w-full max-w-[640px]">
            <div className="flex items-center gap-[10px] bg-white/[.04] border border-white/10 rounded-[14px] px-3 py-2.5 flex-1 min-w-[220px]">
              <Search className="w-[18px] h-[18px] opacity-85 flex-shrink-0" />
              <input
                type="text"
                placeholder="Urun ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/45"
                data-testid="input-search"
              />
            </div>

            <button 
              className="border border-white/22 px-3.5 py-2.5 rounded-[14px] font-black flex items-center gap-[10px] whitespace-nowrap transition-all hover:-translate-y-px"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.06))' }}
              data-testid="button-cart"
            >
              <ShoppingCart className="w-4 h-4" />
              Sepet
              <span className="text-xs px-2 py-0.5 rounded-full border border-white/18 bg-black/25 text-white/85 font-black">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Page Head */}
        <section className="py-[22px] pb-[10px]">
          <div className="max-w-[1140px] mx-auto px-[18px]">
            <div className="text-white/60 font-black uppercase tracking-[.4px] text-[11px]">NaturPrime / Urunler</div>
            <div className="flex items-end justify-between gap-[14px] flex-wrap mt-2">
              <div>
                <h1 className="text-[26px] font-black tracking-[.3px] uppercase m-0">Katalog</h1>
                <p className="text-white/70 font-bold text-[13px] max-w-[60ch] m-0 mt-1">Filtrele, sirala, hizli ekle. Net arayuz — hizli karar.</p>
              </div>
              <div className="text-white/72 font-black uppercase tracking-[.35px] text-[11px]">
                {activeChip !== "all" || maxPrice < 2499 || searchQuery ? 
                  `${activeChip !== "all" ? `Etiket: ${activeChip}` : ""} ${maxPrice < 2499 ? `Max: ${maxPrice} TL` : ""} ${searchQuery ? `Arama: "${searchQuery}"` : ""}`.trim() 
                  : "Filtre: Yok"
                }
              </div>
            </div>
          </div>
        </section>

        {/* Layout */}
        <section>
          <div className="max-w-[1140px] mx-auto px-[18px] grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-[14px] py-3 pb-[26px] items-start">
            {/* Filters Panel */}
            <aside className="border border-white/10 rounded-[24px] overflow-hidden" style={{ background: 'rgba(0,0,0,.18)', boxShadow: '0 16px 45px rgba(0,0,0,.35)' }}>
              <div className="p-4 border-b border-white/10 flex justify-between items-center gap-[10px]">
                <strong className="tracking-[.3px] uppercase text-xs">Filtreler</strong>
                <button 
                  onClick={resetFilters}
                  className="border border-white/16 bg-white/[.06] px-3 py-2 rounded-[14px] font-black text-sm hover:-translate-y-px transition-all"
                  data-testid="button-reset-filters"
                >
                  Sifirla
                </button>
              </div>

              <div className="p-4">
                {/* Sort */}
                <div className="mb-[14px]">
                  <label className="block text-white/75 font-black uppercase tracking-[.35px] text-[11px] mb-2">Siralama</label>
                  <select 
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value as SortMode)}
                    className="w-full border border-white/12 bg-white/[.05] text-white rounded-[14px] p-3 outline-none focus:shadow-[0_0_0_4px_rgba(255,255,255,.08)] focus:border-white/20"
                    data-testid="select-sort"
                  >
                    <option value="popularity">Populerlik</option>
                    <option value="new">Yeni Urunler</option>
                    <option value="bestseller">En Cok Satanlar</option>
                    <option value="priceAsc">Fiyat (Artan)</option>
                    <option value="priceDesc">Fiyat (Azalan)</option>
                  </select>
                </div>

                {/* Chips */}
                <div className="mb-[14px]">
                  <label className="block text-white/75 font-black uppercase tracking-[.35px] text-[11px] mb-2">Hizli Filtre</label>
                  <div className="flex gap-2 flex-wrap">
                    {chips.map((chip) => (
                      <button
                        key={chip.key}
                        onClick={() => setActiveChip(chip.key)}
                        className={`px-2.5 py-2 rounded-full border font-black uppercase tracking-[.35px] text-[11px] cursor-pointer select-none transition-all ${
                          activeChip === chip.key 
                            ? "border-white/22 bg-white/10 text-white/90" 
                            : "border-white/14 bg-white/[.05] text-white/86"
                        }`}
                        data-testid={`chip-${chip.key}`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-[14px]">
                  <label className="block text-white/75 font-black uppercase tracking-[.35px] text-[11px] mb-2">Maksimum Fiyat</label>
                  <input 
                    type="range" 
                    min="999" 
                    max="2499" 
                    step="50" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                    data-testid="range-price"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-white/72 font-black uppercase tracking-[.35px] text-[11px]">Min: 999 TL</span>
                    <span className="text-white/72 font-black uppercase tracking-[.35px] text-[11px]">Max: {maxPrice.toLocaleString('tr-TR')} TL</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products */}
            <section>
              <div className="flex justify-between items-center gap-[10px] mb-3 flex-wrap">
                <div className="text-white/75 font-black uppercase tracking-[.35px] text-[11px]" data-testid="text-product-count">
                  {filteredProducts.length} urun
                </div>
                <div className="flex gap-[10px]">
                  <button 
                    onClick={() => setSortMode("priceAsc")}
                    className="border border-white/16 bg-white/[.06] px-3 py-2 rounded-[14px] font-black text-sm hover:-translate-y-px transition-all"
                    data-testid="button-sort-price"
                  >
                    Fiyata Gore
                  </button>
                  <button 
                    onClick={() => setSortMode("new")}
                    className="border border-white/16 bg-white/[.06] px-3 py-2 rounded-[14px] font-black text-sm hover:-translate-y-px transition-all"
                    data-testid="button-sort-new"
                  >
                    Yeniler
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-white/10 rounded-[16px] bg-white/[.03] min-h-[320px] animate-pulse" />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="border border-dashed border-white/18 rounded-[24px] p-[18px] text-white/72 bg-black/18 font-extrabold leading-relaxed">
                  Aramanizla eslesen urun bulunamadi. Filtreleri sifirlayip tekrar deneyin.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[14px]">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="border border-white/10 rounded-[16px] bg-white/[.03] overflow-hidden flex flex-col min-h-[320px] transition-all hover:-translate-y-0.5 hover:border-white/16"
                      style={{ boxShadow: '0 10px 28px rgba(0,0,0,.26)' }}
                      data-testid={`product-card-${product.id}`}
                    >
                      {/* Image */}
                      <div 
                        className="h-[160px] border-b border-white/10 relative"
                        style={{ background: 'radial-gradient(160px 100px at 30% 30%, rgba(255,255,255,.12), transparent 60%), linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))' }}
                      >
                        {product.badge && (
                          <span className={`absolute top-[10px] left-[10px] text-[11px] px-2.5 py-1.5 rounded-full border font-black tracking-[.4px] uppercase whitespace-nowrap ${
                            product.badge === "Yeni" ? "border-[rgba(86,211,100,.30)] bg-[rgba(86,211,100,.08)] text-[rgba(210,255,222,.95)]" :
                            product.badge === "Sinirli Stok" ? "border-[rgba(245,197,66,.30)] bg-[rgba(245,197,66,.08)] text-[rgba(255,240,200,.95)]" :
                            "border-white/16 bg-black/25 text-white/88"
                          }`}>
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="p-[14px]">
                        <h3 className="font-black tracking-[.2px] m-0 mb-1.5" data-testid={`product-title-${product.id}`}>{product.title}</h3>
                        <p className="text-white/70 text-[13px] leading-[1.45] m-0 mb-2.5 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center text-white/72 font-black uppercase tracking-[.35px] text-[11px] border-t border-dashed border-white/10 pt-2.5 gap-[10px] flex-wrap">
                          <span>Kargo: 24-48s</span>
                          <span>Stok: Var</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-auto flex justify-between items-center gap-[10px] p-[14px] border-t border-white/10 bg-black/18 flex-wrap">
                        <span className="font-black tracking-[.2px]" data-testid={`product-price-${product.id}`}>
                          {Number(product.price).toLocaleString('tr-TR')} TL
                        </span>
                        <div className="flex gap-2 flex-wrap">
                          <button 
                            className="border border-white/18 bg-transparent px-3 py-2.5 rounded-[12px] font-black text-sm hover:-translate-y-px transition-all hover:bg-white/[.05]"
                            data-testid={`button-view-${product.id}`}
                          >
                            Urunu Incele
                          </button>
                          <button 
                            onClick={() => addToCart(product)}
                            className="border border-white/18 bg-white/[.07] px-3 py-2.5 rounded-[12px] font-black text-sm hover:-translate-y-px transition-all"
                            data-testid={`button-add-cart-${product.id}`}
                          >
                            Sepete Ekle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-[26px] pb-9 border-t border-white/10 mt-[18px] text-white/70">
        <div className="max-w-[1140px] mx-auto px-[18px] grid grid-cols-1 md:grid-cols-[1.2fr_.8fr] gap-[14px] items-start">
          <div>
            <div className="flex items-center gap-[10px]">
              <span className="w-[30px] h-[30px] rounded-[10px] border border-white/16" style={{ background: 'radial-gradient(18px 18px at 30% 25%, rgba(255,255,255,.35), transparent 55%), linear-gradient(135deg, rgba(255,255,255,.18), rgba(255,255,255,.05))' }} />
              <strong className="text-white/92">NaturPrime</strong>
            </div>
            <p className="mt-2.5 leading-[1.65] max-w-[72ch]">
              Iletisim: <strong>naturprime0@gmail.com</strong> | Instagram: <strong>@naturprime</strong>
            </p>
          </div>
          <div className="flex gap-[10px] flex-wrap md:justify-end font-black uppercase tracking-[.35px] text-xs">
            <Link href="/" className="px-3 py-2.5 rounded-full border border-white/10 bg-black/18 hover:bg-white/[.05] hover:text-white" data-testid="footer-home">Ana Sayfa</Link>
            <Link href="/catalog" className="px-3 py-2.5 rounded-full border border-white/10 bg-black/18 hover:bg-white/[.05] hover:text-white" data-testid="footer-catalog">Urunler</Link>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast && (
        <div 
          className="fixed left-1/2 bottom-[18px] -translate-x-1/2 bg-black/75 border border-white/12 rounded-[14px] px-3.5 py-3 text-white/92 backdrop-blur-[10px] flex items-center justify-between gap-3 font-black max-w-[min(620px,calc(100%-24px))] animate-in slide-in-from-bottom-2"
          style={{ boxShadow: '0 18px 50px rgba(0,0,0,.45)' }}
        >
          <div>
            <div>{toast.title}</div>
            <small className="text-white/75 font-black">{toast.desc}</small>
          </div>
          <div className="flex gap-[10px] items-center border-l border-white/10 pl-3">
            <span className="text-xs px-2 py-0.5 rounded-full border border-white/18 bg-black/25 text-white/85 font-black">Sepet</span>
            <strong>{cartCount}</strong>
            <button 
              onClick={() => setToast(null)}
              className="border border-white/16 bg-white/[.06] p-2 rounded-[14px] font-black hover:-translate-y-px transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
