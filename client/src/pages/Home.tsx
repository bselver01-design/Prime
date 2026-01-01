import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Lock, HeadphonesIcon, ShoppingCart, Menu, X, User, LogOut, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { useFaqs } from "@/hooks/use-faqs";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import heroImage from "@assets/C3D93148-029D-42F8-932C-100E54E54328_1766964094516.png";
import type { Review, Product } from "@shared/schema";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: faqs, isLoading: faqsLoading } = useFaqs();
  const { user, isLoading: authLoading, isAuthenticated, logout } = useAuth();
  const { data: allReviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  // Get product name by ID
  const getProductName = (productId: number) => {
    const product = products?.find(p => p.id === productId);
    return product?.title || "";
  };

  // Filter only 5-star reviews
  const fiveStarReviews = allReviews.filter(r => r.rating === 5);
  
  // Rotating reviews state
  const [reviewStartIndex, setReviewStartIndex] = useState(0);
  
  // Auto-rotate reviews every 5 seconds
  useEffect(() => {
    if (fiveStarReviews.length <= 3) return;
    const interval = setInterval(() => {
      setReviewStartIndex(prev => (prev + 1) % fiveStarReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [fiveStarReviews.length]);

  // Get 3 reviews starting from current index (with wrap-around)
  const displayReviews = fiveStarReviews.length > 0 
    ? Array.from({ length: Math.min(3, fiveStarReviews.length) }, (_, i) => 
        fiveStarReviews[(reviewStartIndex + i) % fiveStarReviews.length]
      )
    : [];

  const features = [
    { icon: ShieldCheck, title: "Orijinal Urun", desc: "100% garantili ve sertifikali" },
    { icon: Truck, title: "Ayni Gun Kargo", desc: "16:00'a kadar verilen siparislerde" },
    { icon: Lock, title: "Yan Etkisi Yok", desc: "Guvenli ve test edilmis formuller" },
    { icon: HeadphonesIcon, title: "7/24 Destek", desc: "Uzman ekipten aninda yanit" },
  ];

  return (
    <div className="min-h-screen selection:bg-primary/30">
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(0,0,0,.35)' }}>
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Left: Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-[14px] border border-white/10 bg-white/5 grid place-items-center text-white/85 hover:bg-white/10 transition-colors"
              data-testid="button-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {/* Center: Logo */}
            <Link href="/" className="absolute left-[46%] -translate-x-1/2 flex items-center gap-2.5 font-extrabold tracking-wide text-[22px]" data-testid="link-home">
              <span>NaturPrime</span>
            </Link>
            
            {/* Right: Profile & Cart */}
            <div className="flex items-center gap-3.5">
              {/* Profile Icon with Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="w-11 h-11 rounded-[14px] border border-white/10 bg-white/5 grid place-items-center text-white/85 hover:bg-white/10 transition-colors"
                    data-testid="button-profile"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {!authLoading && (
                    isAuthenticated ? (
                      <>
                        <DropdownMenuItem className="text-muted-foreground text-sm" disabled>
                          {user?.firstName || user?.email}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => logout()}
                          className="cursor-pointer"
                          data-testid="dropdown-logout"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Cikis Yap
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/giris" className="cursor-pointer" data-testid="dropdown-login">
                            <User className="w-4 h-4 mr-2" />
                            Giris Yap
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/giris" className="cursor-pointer" data-testid="dropdown-signup">
                            <User className="w-4 h-4 mr-2" />
                            Kayit Ol
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/cart">
                <button 
                  className="w-11 h-11 rounded-[14px] border border-white/10 bg-white/5 grid place-items-center text-white/85 hover:bg-white/10 transition-colors"
                  data-testid="button-cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
          
          </div>
      </header>
      
      {/* Slide-in Sidebar Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/60"
          onClick={() => setMobileMenuOpen(false)}
          data-testid="menu-overlay"
        />
      )}
      <div 
        className={`fixed top-0 left-0 h-full w-72 z-[70] bg-black border-r border-white/10 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="flex items-center gap-2.5 font-extrabold tracking-wide text-[20px]">
              <span>NaturPrime</span>
            </span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-[12px] border border-white/10 bg-white/5 grid place-items-center text-white/85 hover:bg-white/10 transition-colors"
              data-testid="button-close-menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors"
              data-testid="mobile-nav-home"
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/catalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors"
              data-testid="mobile-nav-products"
            >
              Urunler
            </Link>
            <button 
              onClick={() => { 
                setMobileMenuOpen(false); 
                document.getElementById("sss")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-3 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors text-left"
              data-testid="mobile-nav-faq"
            >
              S.S.S
            </button>
            <button 
              onClick={() => { 
                setMobileMenuOpen(false); 
                document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-3 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors text-left"
              data-testid="mobile-nav-contact"
            >
              Iletisim
            </button>
            {/* Auth in Sidebar */}
            <div className="mt-4 pt-4 border-t border-white/10">
              {!authLoading && (
                isAuthenticated ? (
                  <button 
                    onClick={() => { setMobileMenuOpen(false); logout(); }}
                    className="w-full px-4 py-3 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors text-left flex items-center gap-2"
                    data-testid="mobile-logout"
                  >
                    <LogOut className="w-4 h-4" /> Cikis Yap
                  </button>
                ) : (
                  <Link 
                    href="/giris"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-[12px] bg-[#c9a962] text-black text-sm font-extrabold uppercase tracking-wide transition-colors text-center"
                    data-testid="mobile-login"
                  >
                    Giris Yap / Kayit Ol
                  </Link>
                )
              )}
            </div>
          </nav>
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-4">
        {/* HERO SECTION */}
        <section className="py-4 md:py-6 -mx-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center relative"
          >
            <div className="relative w-full max-w-[600px] md:max-w-[700px]">
              <img 
                src={heroImage} 
                alt="NaturPrime" 
                className="w-full h-auto"
                loading="eager"
                decoding="async"
                style={{
                  maskImage: 'radial-gradient(ellipse 85% 80% at 50% 45%, black 40%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 45%, black 40%, transparent 75%)',
                }}
              />
            </div>
            <div className="-mt-8 relative z-10">
              <p className="text-[18px] md:text-[24px] font-extrabold tracking-[0.15em] uppercase text-white/85">
                TOPLARININ FINDIK KADAR KALMASINDAN KORKUYOR MUSUN
              </p>
              <p className="text-[14px] md:text-[16px] font-bold tracking-wide text-white/60 mt-2">
                Zarari olmayan Steroidler
              </p>
            </div>
          </motion.div>
        </section>

        {/* FEATURES / TRUST BADGES */}
        <section className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/20 border border-white/10 rounded-[16px] p-5 text-center"
                data-testid={`feature-card-${idx}`}
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-[#c9a962]/10 flex items-center justify-center text-[#c9a962] mb-3">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-white/55">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="py-6">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="text-lg font-extrabold uppercase tracking-wide mb-1">One Cikan Urunler</h2>
              <p className="text-sm text-white/65 font-semibold">En cok tercih edilen performans urunleri.</p>
            </div>
            <Link href="/catalog">
              <Button variant="ghost" className="hidden md:flex text-[#c9a962] hover:text-[#c9a962] hover:bg-[#c9a962]/10 text-sm font-extrabold">
                Tumunu Gor <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[320px] bg-white/5 rounded-[16px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* REVIEWS SECTION - Only show if there are reviews */}
        {displayReviews.length > 0 && (
          <section className="py-6">
            <h2 className="text-lg font-extrabold uppercase tracking-wide mb-5 text-center">Musteri Yorumlari</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayReviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-black/20 border border-white/10 rounded-[16px] p-5"
                  data-testid={`review-card-${review.id}`}
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <span key={i} className="text-[#c9a962] text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-white/75 mb-3 leading-relaxed">"{review.content}"</p>
                  <p className="text-xs text-white/55 font-bold">— {review.name} <span className="text-[#c9a962]">({getProductName(review.productId)})</span></p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        <section id="sss" className="py-6 max-w-3xl mx-auto">
          <h2 className="text-lg font-extrabold uppercase tracking-wide mb-5 text-center">Sikca Sorulan Sorular</h2>
          
          {faqsLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 bg-white/5 rounded-[16px] animate-pulse" />
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {faqs?.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={`item-${faq.id}`}
                  className="bg-black/20 border border-white/10 rounded-[16px] px-4 overflow-hidden"
                  data-testid={`faq-item-${faq.id}`}
                >
                  <AccordionTrigger className="text-foreground hover:text-[#c9a962] transition-colors py-4 text-left font-extrabold text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/65 pb-4 pt-1 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>

        {/* ILETISIM SECTION */}
        <section id="iletisim" className="py-10">
          <h2 className="text-lg font-extrabold uppercase tracking-wide mb-3">Iletisim</h2>
          <p className="text-white/65 text-sm mb-5">Bizimle dogrudan iletisime gecebilirsiniz.</p>
          
          <div className="grid gap-4 max-w-[420px]">
            {/* Telefon */}
            <a 
              href="tel:+905345872637"
              className="border border-white/15 rounded-[16px] p-[18px] bg-white/[.04] hover:bg-white/[.08] transition-colors block"
              data-testid="link-phone"
            >
              <strong className="text-sm">Telefon</strong>
              <div className="mt-2 text-lg font-extrabold tracking-wide">
                0534 587 26 37
              </div>
            </a>
            
            {/* E-posta */}
            <a 
              href="mailto:naturprime0@gmail.com"
              className="border border-white/15 rounded-[16px] p-[18px] bg-white/[.04] hover:bg-white/[.08] transition-colors block"
              data-testid="link-email"
            >
              <strong className="text-sm">E-posta</strong>
              <div className="mt-2 text-base">
                naturprime0@gmail.com
              </div>
            </a>
            
            {/* Instagram */}
            <a 
              href="https://instagram.com/naturprime" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-white/15 rounded-[16px] p-[18px] bg-white/[.04] hover:bg-white/[.08] transition-colors block"
              data-testid="link-instagram"
            >
              <strong className="text-sm">Instagram</strong>
              <div className="mt-2 text-base">
                @naturprime
              </div>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/905345872637" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-green-500/30 rounded-[16px] p-[18px] bg-green-500/10 hover:bg-green-500/15 transition-colors block"
              data-testid="link-whatsapp"
            >
              <strong className="text-sm text-green-400">WhatsApp</strong>
              <div className="mt-2 text-base font-bold">
                Hizli Destek Icin Yazin
              </div>
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 mt-8 py-8 bg-black/20">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5 font-extrabold tracking-wide text-lg">
              <span>NaturPrime</span>
            </div>
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <span>Guvenli Alisveris</span>
              <span>|</span>
              <span>Yan Etkisi Yok</span>
              <span>|</span>
              <span>7/24 Destek</span>
            </div>
            <p className="text-white/40 text-xs">
              2025 NaturPrime. Tum haklari saklidir.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
