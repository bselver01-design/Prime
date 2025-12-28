import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-4">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39d353]" />
            <span className="font-extrabold tracking-wide">NaturPrime</span>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link 
              href="/hakkimizda" 
              className="text-xs font-extrabold uppercase tracking-wide text-white/75 px-3 py-2.5 rounded-full border border-white/10 bg-black/20 hover:bg-white/5 transition-colors"
              data-testid="link-about"
            >
              Hakkimizda
            </Link>
            <Link 
              href="/iletisim" 
              className="text-xs font-extrabold uppercase tracking-wide text-white/75 px-3 py-2.5 rounded-full border border-white/10 bg-black/20 hover:bg-white/5 transition-colors"
              data-testid="link-contact"
            >
              Iletisim
            </Link>
            <Link 
              href="/gizlilik" 
              className="text-xs font-extrabold uppercase tracking-wide text-white/75 px-3 py-2.5 rounded-full border border-white/10 bg-black/20 hover:bg-white/5 transition-colors"
              data-testid="link-privacy"
            >
              Gizlilik
            </Link>
            <Link 
              href="/iade" 
              className="text-xs font-extrabold uppercase tracking-wide text-white/75 px-3 py-2.5 rounded-full border border-white/10 bg-black/20 hover:bg-white/5 transition-colors"
              data-testid="link-returns"
            >
              Iade
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-6 text-xs text-white/40">
          2024 NaturPrime. Tum haklari saklidir.
        </div>
      </div>
    </footer>
  );
}
