import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Lock, HeadphonesIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ReviewCard } from "@/components/ReviewCard";
import { useProducts } from "@/hooks/use-products";
import { useReviews } from "@/hooks/use-reviews";
import { useFaqs } from "@/hooks/use-faqs";

export default function Home() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: reviews, isLoading: reviewsLoading } = useReviews();
  const { data: faqs, isLoading: faqsLoading } = useFaqs();

  const features = [
    { icon: ShieldCheck, title: "Orijinal Ürün", desc: "100% garantili ve sertifikalı" },
    { icon: Truck, title: "Aynı Gün Kargo", desc: "16:00'a kadar verilen siparişlerde" },
    { icon: Lock, title: "Gizli Gönderim", desc: "İçeriği belli olmayan paketleme" },
    { icon: HeadphonesIcon, title: "7/24 Destek", desc: "Uzman ekipten anında yanıt" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e8ebf2] selection:bg-primary/30">
      <Navbar />

      <main className="pt-24 pb-20 space-y-24 md:space-y-32">
        {/* HERO SECTION */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Hero Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 relative overflow-hidden rounded-[24px] border border-white/10 bg-[#121522] min-h-[500px] flex flex-col justify-center p-8 md:p-16 group"
            >
              {/* Background Gradient Effect */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-[#0b0c10] to-transparent pointer-events-none" />
              
              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  YENİ FORMÜL
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                  Güç. Netlik. <br />
                  <span className="text-primary">Performans.</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
                  Doğanın gücünü bilimsel formüllerle birleştirdik. Kendini en iyi versiyonuna taşıman için tasarlandı.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-xl px-8 h-12 text-base font-semibold">
                    Ürünleri İncele
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl px-8 h-12 text-base">
                    İletişime Geç
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Side Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 rounded-[24px] border border-white/10 bg-[#121522] p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121522]" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">HIZLI TESLİMAT</h3>
                <p className="text-muted-foreground text-sm">Tüm siparişlerde aynı gün kargo avantajı.</p>
              </div>

              <div className="relative z-10 mt-12 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Güvenli Kargo</h4>
                    <p className="text-xs text-muted-foreground mt-1">Paket içeriği tamamen gizlidir.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/10">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Orijinal Ürün</h4>
                    <p className="text-xs text-muted-foreground mt-1">Sertifikalı ve bandrollü ürünler.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES / TRUST BADGES */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#121522]/50 border border-white/5 rounded-2xl p-6 text-center hover:border-white/10 transition-colors"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Öne Çıkan Ürünler</h2>
              <p className="text-muted-foreground">En çok tercih edilen performans ürünleri.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary hover:bg-primary/10">
              Tümünü Gör <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* REVIEWS SECTION */}
        <section className="bg-[#121522]/30 py-24 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Kullanıcı Deneyimleri</h2>
              <p className="text-muted-foreground">
                Müşterilerimizin gerçek yorumları ve deneyimleri.
              </p>
            </div>

            {reviewsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-[200px] bg-white/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews?.slice(0, 3).map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Sıkça Sorulan Sorular</h2>
          
          {faqsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {faqs?.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={`item-${faq.id}`}
                  className="bg-[#121522] border border-white/5 rounded-xl px-4 overflow-hidden"
                >
                  <AccordionTrigger className="text-white hover:text-primary transition-colors py-4 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>

        {/* CTA SECTION */}
        <section className="container mx-auto px-4 pb-12">
          <div className="rounded-[32px] bg-primary text-black p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                Değişimi Bugün Başlat.
              </h2>
              <p className="text-black/70 text-lg mb-8 font-medium">
                Sınırlı süreli indirimlerden yararlanmak ve performansını artırmak için hemen sipariş ver.
              </p>
              <Button size="lg" className="bg-black text-white hover:bg-black/80 rounded-xl px-12 h-14 text-lg border-2 border-transparent">
                Hemen Sipariş Ver
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
