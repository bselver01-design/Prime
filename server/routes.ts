import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Seeding disabled - products managed manually via database

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seeding disabled

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

  app.get('/api/products/:productId/reviews', async (req, res) => {
    const reviews = await storage.getReviewsByProduct(Number(req.params.productId));
    res.json(reviews);
  });

  app.post('/api/products/:productId/reviews', async (req, res) => {
    const review = await storage.createReview({
      ...req.body,
      productId: Number(req.params.productId),
    });
    res.status(201).json(review);
  });

  app.delete('/api/reviews/:id', async (req, res) => {
    await storage.deleteReview(Number(req.params.id));
    res.status(204).send();
  });

  // FAQs
  app.get(api.faqs.list.path, async (req, res) => {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  });

  return httpServer;
}
