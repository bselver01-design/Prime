import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      await apiRequest("POST", endpoint, body);
      
      toast({
        title: isLogin ? "Giris Basarili" : "Kayit Basarili",
        description: isLogin ? "Hosgeldiniz!" : "Hesabiniz olusturuldu!",
      });
      
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message || "Bir hata olustu",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10" style={{ background: 'rgba(0,0,0,.35)' }}>
        <div className="max-w-[500px] mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="w-10 h-10 rounded-[12px] border border-white/10 bg-white/5 grid place-items-center text-white/85 hover:bg-white/10 transition-colors" data-testid="button-back">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">
              {isLogin ? "Giris Yap" : "Kayit Ol"}
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[400px]">
          <div className="p-6 rounded-[16px] border border-white/10 bg-white/5">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 font-extrabold tracking-wide text-[24px]">
                <span className="green-dot" />
                <span>NaturPrime</span>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="firstName">Isim</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Adiniz"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-white/5 border-white/10"
                    data-testid="input-firstName"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white/5 border-white/10"
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Sifre</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sifreniz"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 pr-10"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon (Opsiyonel)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0534 XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/5 border-white/10"
                    data-testid="input-phone"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a962] hover:bg-[#d4b872] text-black font-extrabold"
                data-testid="button-submit"
              >
                {loading ? "Yukleniyor..." : (isLogin ? "Giris Yap" : "Kayit Ol")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/50 text-sm">
                {isLogin ? "Hesabiniz yok mu?" : "Zaten hesabiniz var mi?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#c9a962] hover:underline font-bold"
                  data-testid="button-switch-mode"
                >
                  {isLogin ? "Kayit Ol" : "Giris Yap"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
