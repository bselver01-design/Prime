import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0b0c10] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xl font-bold tracking-tight text-white">NaturPrime</span>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Erkek performans ürünlerinde güvenilir, doğal ve etkili çözümler sunuyoruz.
              Gizlilik ve kalite bizim önceliğimizdir.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Kurumsal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">İletişim</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Kargo ve Teslimat</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">İade Politikası</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Yasal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/kvkk" className="hover:text-primary transition-colors">KVKK</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/50">
          <p>© 2024 NaturPrime. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <span>Güvenli Ödeme</span>
            <span>256-bit SSL</span>
            <span>Gizli Kargo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
