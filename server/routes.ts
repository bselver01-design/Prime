import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import bcrypt from "bcryptjs";

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

  // Custom Auth - Register
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, phone, firstName } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email ve sifre gerekli' });
      }

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Bu email zaten kayitli' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        phone,
        firstName,
      });

      (req.session as any).userId = user.id;
      res.status(201).json({ id: user.id, email: user.email, firstName: user.firstName });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Kayit sirasinda hata olustu' });
    }
  });

  // Custom Auth - Login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email ve sifre gerekli' });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: 'Email veya sifre hatali' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Email veya sifre hatali' });
      }

      (req.session as any).userId = user.id;
      res.json({ id: user.id, email: user.email, firstName: user.firstName });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Giris sirasinda hata olustu' });
    }
  });

  // Custom Auth - Get Current User
  app.get('/api/auth/me', async (req, res) => {
    try {
      const userId = (req.session as any)?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Giris yapilmamis' });
      }

      const user = await storage.getUserById(userId);
      if (!user) {
        return res.status(401).json({ message: 'Kullanici bulunamadi' });
      }

      res.json({ id: user.id, email: user.email, firstName: user.firstName });
    } catch (error) {
      res.status(500).json({ message: 'Hata olustu' });
    }
  });

  // Custom Auth - Logout
  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Cikis yapilamadi' });
      }
      res.json({ message: 'Cikis yapildi' });
    });
  });

  return httpServer;
}
