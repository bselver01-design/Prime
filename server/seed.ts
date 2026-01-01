import { db } from "./db";
import { products, faqs, reviews } from "@shared/schema";
import { eq } from "drizzle-orm";

const seedProducts = [
  {
    id: 9,
    title: "NP LITE",
    description: "Proviron mesterolone - Piyasadaki en masum steroid. Ostrojeni dusurur, dogal testosteronu arttirir. Kandaki testosteronu serbest hale getirir. Libido, sertlik, guclu erkeksi his ve ozguven saglar. Unutma erkeklik sadece kas degil yatakta da belli olur.",
    price: "1450.00",
    originalPrice: null,
    image: "/attached_assets/IMG_7026_1766964512367.jpeg",
    category: "steroid",
    badge: null,
    tags: ["Başlangıç", "Destekleyici"],
    stock: 100,
  },
  {
    id: 10,
    title: "NP PRIME (Ithal)",
    description: "Saf kas kutlesi ekler. Yag yakim surecini hizlandirir. Kuru ve damarli bir gorunum verir. Kemik dokusunda artis, daha iri bir vucut. Yan etkileri: Yanlis dozda ve duzensiz kullanimda kolesterolu yorar. Karaciğer enzimlerini arttırır. Genetikte varsa sac dokulmesi, akne.",
    price: "2250.00",
    originalPrice: null,
    image: "/attached_assets/Screenshot_2026-01-01-03-11-54-453_com.google.android.googlequ_1767231734738.jpg",
    category: "steroid",
    badge: null,
    tags: ["Ekonomik", "Baslangic"],
    stock: 100,
  },
  {
    id: 11,
    title: "NP PRIME (Premium)",
    description: "Gözle görülür güç artışı. ARTTIRILMIS ANABOLIK ETKI. Saf kas kutlesi ekler. Yag yakim surecini hizlandirir. Kuru ve damarli bir gorunum verir. Kemik dokusunda artis, daha iri bir vucut. Yan etkileri: Yanlis dozda ve duzensiz kullanimda kolesterolu yorar. Karaciğer enzimlerini arttırır. Genetikte varsa sac dokulmesi, akne.",
    price: "2599.00",
    originalPrice: "2899.00",
    image: "/attached_assets/211EFF1D-FFDA-494E-A8F5-91E136497689_1766971272181.png",
    category: "steroid",
    badge: "INDIRIM",
    tags: ["Premium", "Guclu Etki"],
    stock: 100,
  },
  {
    id: 12,
    title: "UP CORE",
    description: "Primo 100: Cok yavas ama gercek saf kas kutlesi ekler. Kalite ilaci olarak bilinir. Karaciger dostu, kolesterolu cok zorlamaz. Kemik yogunlugu ve kutle artisi saglar. Ozetle yavas ama cok kaliteli kas yapar. Yan etkisi yok denecek kadar az.",
    price: "2700.00",
    originalPrice: null,
    image: "/attached_assets/IMG-20251231-WA0003_1767229047683.jpg",
    category: "steroid",
    badge: null,
    tags: ["Kaliteli", "Karaciger Dostu"],
    stock: 100,
  },
];

const seedReviews = [
  // NP LITE reviews (productId: 9)
  { id: 1, productId: 9, name: "Mehmet Y.", tag: "ONAYLI ALICI", rating: 5, content: "2 haftadir kullaniyorum, libido ve ozguven olarak cok fark ettim. Spor performansim da artti." },
  { id: 2, productId: 9, name: "Ahmet K.", tag: "ONAYLI ALICI", rating: 5, content: "Yatakta fark yarattigindan emin olabilirsiniz. Esim de fark etti, cok memnunum." },
  { id: 3, productId: 9, name: "Burak T.", tag: "ONAYLI ALICI", rating: 4, content: "Baslangic icin ideal urun. Yan etki gormedim, enerjim yukseldi." },
  
  // NP PRIME Ithal reviews (productId: 10)
  { id: 4, productId: 10, name: "Emre S.", tag: "ONAYLI ALICI", rating: 5, content: "Fiyat performans urunu. 1 ayda 4 kilo saf kas aldim, damarlanma basladi." },
  { id: 5, productId: 10, name: "Cem A.", tag: "ONAYLI ALICI", rating: 5, content: "Ekonomik ama etkili. Kuru kas gorunumu icin tam istedigim gibi." },
  { id: 6, productId: 10, name: "Murat D.", tag: "ONAYLI ALICI", rating: 4, content: "Ilk kur icin memnunum. Guc artisi ve toparlanma suresi kisaldi." },
  
  // NP PRIME Premium reviews (productId: 11)
  { id: 7, productId: 11, name: "Onur B.", tag: "ONAYLI ALICI", rating: 5, content: "Premium farkini hissettim. Patlayici guc artisi inanilmaz, benchte 20 kilo arttim." },
  { id: 8, productId: 11, name: "Kaan M.", tag: "ONAYLI ALICI", rating: 5, content: "En iyi urun bu. Ithal versiyonu da denedim ama premium bambaske bir seviye." },
  { id: 9, productId: 11, name: "Serkan Y.", tag: "ONAYLI ALICI", rating: 5, content: "6 haftada 7 kilo kas, yag orani dustu. Herkesin denemesi lazim." },
  
  // UP CORE reviews (productId: 12)
  { id: 10, productId: 12, name: "Ali R.", tag: "ONAYLI ALICI", rating: 5, content: "Kalite urunu gercekten. Yavas ama saf kas, su tutmuyor. Karacigere de zarar vermedi." },
  { id: 11, productId: 12, name: "Tolga H.", tag: "ONAYLI ALICI", rating: 5, content: "Enjeksiyon korkutmasin, haftada 1 kez cok rahat. Sonuclar kalici ve temiz." },
  { id: 12, productId: 12, name: "Baris N.", tag: "ONAYLI ALICI", rating: 4, content: "Sabirli olmaniz lazim ama sonuc mukemmel. Kemik yogunlugum artti, daha saglam hissediyorum." },
];

const seedFaqs = [
  { id: 21, question: "Hormonlarımı baskılar mı?", answer: "Hormon baskılanması söz konusu değildir. DHT türevi olduğundan dolayı androjen reseptörlerine bağlanır ve beynindeki HPTA bölgesine hiçbir baskı yapmaz. Testosteron, L-Growth gibi dışarıdan giren maddeler vücudun kendi üretimini durdurur, HPTA'ya aşırı baskı yapar ve üretim sinyalini köreltir.", order: 1 },
  { id: 22, question: "PCT'ye ihtiyaç olur mu?", answer: "Hayır, testosteron hormonu almadığınız için ve vücut üretmeyi durdurmadığı için PCT'ye hiçbir gerek yoktur.", order: 2 },
  { id: 23, question: "Karaciğeri zorlar mı?", answer: "Karaciğer enzimlerini arttırabilir. Uzun kullanım, yüksek doz ve düzensiz kullanımda yan etkisi görülür.", order: 3 },
  { id: 24, question: "Diğer steroidlerden farkı ne?", answer: "Diğer steroidlerden farkımız, birer DHT türevi olmamızdan kaynaklıdır. DHT türevleri anabolik etkisi genelde hafif, orta seviyelidir. LH ve FSH sinyallerini engellemez ve vücudun temel hormonlarıyla oynamaz.", order: 4 },
  { id: 25, question: "Büyüme gelişme çağında kullanabilir miyim?", answer: "Tabiki kullanabilirsin, boy uzamana ve kemik gelişimine zarar vermez.", order: 5 },
  { id: 26, question: "Kargo ne zaman gelir?", answer: "Siparisler ayni gun kargoya verilir. Teslimat suresi bulundugunuz ile gore 1-3 is gunu arasindadir.", order: 6 },
  { id: 27, question: "Iade ve degisim politikaniz nedir?", answer: "Urunlerimiz orijinal ve muhurludur. Acilmamis urunlerde 14 gun icinde iade/degisim yapilabilir. Detaylar icin bize ulasin.", order: 7 },
  { id: 28, question: "Ne zaman sonuc alirim?", answer: "Kurulugu, gucu ve damarlanmayi hemen anlarsin ama yag yakimi sandigin kadar hizli olmaz ayda 1-2 kilo eger cok disiplinli bir diyet programindaysan 3 kilo yakarsin", order: 8 },
];

export async function seedDatabase() {
  try {
    console.log("Seeding database...");

    const validProductIds = seedProducts.map(p => p.id);
    const validFaqIds = seedFaqs.map(f => f.id);

    await db.delete(products).where(eq(products.id, products.id));
    await db.delete(faqs).where(eq(faqs.id, faqs.id));
    await db.delete(reviews).where(eq(reviews.id, reviews.id));

    for (const product of seedProducts) {
      await db.insert(products).values(product).onConflictDoUpdate({
        target: products.id,
        set: product
      });
    }

    for (const faq of seedFaqs) {
      await db.insert(faqs).values(faq).onConflictDoUpdate({
        target: faqs.id,
        set: faq
      });
    }

    for (const review of seedReviews) {
      await db.insert(reviews).values(review).onConflictDoUpdate({
        target: reviews.id,
        set: review
      });
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
