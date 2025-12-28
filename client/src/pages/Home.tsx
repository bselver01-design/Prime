import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Lock, HeadphonesIcon, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ReviewCard } from "@/components/ReviewCard";
import { useProducts } from "@/hooks/use-products";
import { useReviews } from "@/hooks/use-reviews";
import { useFaqs } from "@/hooks/use-faqs";
import { Link } from "wouter";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: reviews, isLoading: reviewsLoading } = useReviews();
  const { data: faqs, isLoading: faqsLoading } = useFaqs();

  const features = [
    { icon: ShieldCheck, title: "Orijinal Urun", desc: "100% garantili ve sertifikali" },
    { icon: Truck, title: "Ayni Gun Kargo", desc: "16:00'a kadar verilen siparislerde" },
    { icon: Lock, title: "Gizli Gonderim", desc: "Icerigi belli olmayan paketleme" },
    { icon: HeadphonesIcon, title: "7/24 Destek", desc: "Uzman ekipten aninda yanit" },
  ];

  return (
    <div className="min-h-screen selection:bg-primary/30">
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(0,0,0,.35)' }}>
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-4">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-wide text-[22px]" data-testid="link-home">
              <span className="green-dot" />
              <span>NaturPrime</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-2">
              <Link href="/" className="px-3 py-2 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors" data-testid="nav-home">
                Ana Sayfa
              </Link>
              <Link href="/catalog" className="px-3 py-2 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors" data-testid="nav-catalog">
                Urunler
              </Link>
              <a href="mailto:naturprime0@gmail.com" className="px-3 py-2 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors" data-testid="nav-contact">
                Iletisim
              </a>
            </nav>
            
            <div className="flex items-center gap-3.5">
              <Link href="/catalog">
                <button 
                  className="w-11 h-11 rounded-[14px] border border-white/10 bg-white/5 grid place-items-center text-white/85 hover:bg-white/10 transition-colors"
                  data-testid="button-cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 rounded-[14px] border border-white/10 bg-white/5 grid place-items-center text-white/85 hover:bg-white/10 transition-colors md:hidden"
                data-testid="button-menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">
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
                  data-testid="mobile-nav-catalog"
                >
                  Urunler
                </Link>
                <a 
                  href="mailto:naturprime0@gmail.com" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-[12px] text-white/70 hover:text-white hover:bg-white/5 text-sm font-extrabold uppercase tracking-wide transition-colors"
                  data-testid="mobile-nav-contact"
                >
                  Iletisim
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4">
        {/* HERO SECTION */}
        <section className="py-7 md:py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[520px] glass-card rounded-[24px] p-6 md:p-8 premium-shadow"
          >
            {/* Badge */}
            <div className="accent-badge mb-6" data-testid="badge-new-formula">
              <span className="w-2 h-2 rounded-full bg-[#39d353]" />
              YENI FORMUL
            </div>

            {/* Headline */}
            <h1 className="text-[44px] md:text-[52px] font-extrabold leading-[1.02] tracking-wide mb-4">
              Guc. Netlik.<br />
              <span className="text-[#39d353]">Performans.</span>
            </h1>

            {/* Subtext */}
            <p className="text-[18px] md:text-[20px] text-white/65 leading-relaxed mb-6">
              Karanlik yol, net hedef.<br />
              <strong className="text-white/90">Yan etkisi olmayan steroidler.</strong>
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3.5 mt-6">
              <Link href="/catalog">
                <Button 
                  size="lg" 
                  className="w-full bg-white/90 text-[#0b0c10] hover:bg-white rounded-[16px] h-14 text-lg font-extrabold justify-center gap-2.5"
                  data-testid="button-browse-products"
                >
                  Urunleri Incele <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="mailto:naturprime0@gmail.com">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-white/10 bg-white/5 text-foreground hover:bg-white/10 rounded-[16px] h-14 text-lg font-extrabold"
                  data-testid="button-contact"
                >
                  Iletisime Gec
                </Button>
              </a>
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
                <div className="mx-auto w-12 h-12 rounded-full bg-[#39d353]/10 flex items-center justify-center text-[#39d353] mb-3">
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
              <Button variant="ghost" className="hidden md:flex text-[#39d353] hover:text-[#39d353] hover:bg-[#39d353]/10 text-sm font-extrabold">
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

        {/* REVIEWS SECTION */}
        <section className="py-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-lg font-extrabold uppercase tracking-wide mb-2">Kullanici Deneyimleri</h2>
            <p className="text-sm text-white/65 font-semibold">
              Musterilerimizin gercek yorumlari ve deneyimleri.
            </p>
          </div>

          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[180px] bg-white/5 rounded-[16px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews?.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-6 max-w-3xl mx-auto">
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
                  <AccordionTrigger className="text-foreground hover:text-[#39d353] transition-colors py-4 text-left font-extrabold text-sm">
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

        {/* CTA SECTION */}
        <section className="py-8 pb-16">
          <div className="rounded-[24px] bg-[#39d353] text-[#0b0c10] p-10 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-wide">
                Degisimi Bugun Baslat.
              </h2>
              <p className="text-black/70 text-base md:text-lg mb-6 font-semibold">
                Sinirli sureli indirimlerden yararlanmak ve performansini artirmak icin hemen siparis ver.
              </p>
              <Link href="/catalog">
                <Button 
                  size="lg" 
                  className="bg-[#0b0c10] text-white hover:bg-black/80 rounded-[16px] px-10 h-14 text-lg font-extrabold"
                  data-testid="button-order-now"
                >
                  Hemen Siparis Ver
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
