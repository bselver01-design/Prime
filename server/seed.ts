import { db } from "./db";
import { products, faqs } from "@shared/schema";
import { eq } from "drizzle-orm";

const seedProducts = [
  {
    id: 9,
    title: "NP LITE",
    description: "Proviron mesterolone - Piyasadaki en masum steroid. Ostrojeni dusurur, dogal testosteronu arttirir. Kandaki testosteronu serbest hale getirir. Libido, sertlik, guclu erkeksi his ve ozguven saglar. Kullanim: Gunde 1-2 tablet.",
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
    title: "NP PRIME - Oksandrolone (Ithal)",
    description: "Saf kas kutlesi ekler. Yag yakim surecini hizlandirir. Kuru ve damarli bir gorunum verir. Kemik dokusunda artis, daha iri bir vucut. Yan etkileri: Yanlis dozda ve duzensiz kullanimda kolesterolu yorar. Karaciğer enzimlerini arttırır. Genetikte varsa sac dokulmesi, akne.",
    price: "2250.00",
    originalPrice: null,
    image: "/attached_assets/IMG_6991_1766968340529.jpeg",
    category: "steroid",
    badge: null,
    tags: ["Ekonomik", "Baslangic"],
    stock: 100,
  },
  {
    id: 11,
    title: "NP PRIME - Oksandrolone (Premium)",
    description: "Gözle görülür güç artışı. ARTTIRILMIS ANABOLIK ETKI. Saf kas kutlesi ekler. Yag yakim surecini hizlandirir. Kuru ve damarli bir gorunum verir. Kemik dokusunda artis, daha iri bir vucut. Yan etkileri: Yanlis dozda ve duzensiz kullanimda kolesterolu yorar. Karaciğer enzimlerini arttırır. Genetikte varsa sac dokulmesi, akne.",
    price: "2599.00",
    originalPrice: "2899.00",
    image: "/attached_assets/211EFF1D-FFDA-494E-A8F5-91E136497689_1766971272181.png",
    category: "steroid",
    badge: "INDIRIM",
    tags: ["Premium", "Guclu Etki"],
    stock: 100,
  },
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

    for (const product of seedProducts) {
      const existing = await db.select().from(products).where(eq(products.id, product.id));
      if (existing.length > 0) {
        await db.update(products).set(product).where(eq(products.id, product.id));
      } else {
        await db.insert(products).values(product);
      }
    }

    for (const faq of seedFaqs) {
      const existing = await db.select().from(faqs).where(eq(faqs.id, faq.id));
      if (existing.length > 0) {
        await db.update(faqs).set(faq).where(eq(faqs.id, faq.id));
      } else {
        await db.insert(faqs).values(faq);
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
