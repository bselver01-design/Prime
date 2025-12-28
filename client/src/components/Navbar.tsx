import { Link } from "wouter";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
        Ürünler
      </a>
      <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
        Hakkımızda
      </a>
      <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
        İletişim
      </a>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            NaturPrime
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-white/5 rounded-full px-4 py-1.5 border border-white/10 focus-within:border-primary/50 transition-colors">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Ara..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder:text-muted-foreground/50 w-32 focus:w-48 transition-all duration-300"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0b0c10] border-white/10">
              <div className="flex flex-col gap-6 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
