import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    // Seed Products
    await storage.createProduct({
      title: "Testosterone Booster",
      description: "Güç ve dayanıklılık için özel formül.",
      price: "899.00",
      image: "gradient-1", // Frontend will handle gradient mapping
      category: "supplements",
      badge: "ÇOK SATAN",
      stock: 50
    });
    await storage.createProduct({
      title: "Whey Protein Isolate",
      description: "Hızlı emilim, yüksek saflık.",
      price: "1249.00",
      image: "gradient-2",
      category: "protein",
      stock: 100
    });
    await storage.createProduct({
      title: "Pre-Workout Energy",
      description: "Antrenman öncesi maksimum odak.",
      price: "649.00",
      image: "gradient-3",
      category: "energy",
      badge: "YENİ",
      stock: 75
    });
    await storage.createProduct({
      title: "Multivitamin Complex",
      description: "Günlük vitamin ve mineral desteği.",
      price: "329.00",
      image: "gradient-4",
      category: "vitamins",
      stock: 200
    });

    // Seed Reviews
    await storage.createReview({
      name: "Ahmet Y.",
      content: "Ürünler harika, kargo çok hızlıydı.",
      rating: 5,
      tag: "ONAYLI ALICI"
    });
    await storage.createReview({
      name: "Mehmet K.",
      content: "Etkisini ilk haftadan hissettim.",
      rating: 5,
      tag: "ONAYLI ALICI"
    });
    await storage.createReview({
      name: "Caner T.",
      content: "Paketleme çok özenliydi, teşekkürler.",
      rating: 5,
      tag: "ONAYLI ALICI"
    });

    // Seed FAQs
    await storage.createFaq({
      question: "Kargo kaç günde gelir?",
      answer: "Siparişleriniz 24 saat içinde kargoya verilir ve genellikle 1-3 iş günü içinde teslim edilir.",
      order: 1
    });
    await storage.createFaq({
      question: "İade koşulları neler?",
      answer: "Ürünü açmadığınız takdirde 14 gün içinde koşulsuz iade edebilirsiniz.",
      order: 2
    });
    await storage.createFaq({
      question: "Hangi kargo ile çalışıyorsunuz?",
      answer: "Yurtiçi Kargo ve Aras Kargo ile anlaşmamız bulunmaktadır.",
      order: 3
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  await seedDatabase();

  // Products
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  // Reviews
  app.get(api.reviews.list.path, async (req, res) => {
    const reviews = await storage.getReviews();
    res.json(reviews);
  });

  // FAQs
  app.get(api.faqs.list.path, async (req, res) => {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  });

  return httpServer;
}
