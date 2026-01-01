import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  image: text("image").notNull(),
  category: text("category").notNull(),
  badge: text("badge"), // e.g., "YENİ", "ÇOK SATAN"
  tags: text("tags").array(), // e.g., ["Premium", "Minimal"]
  stock: integer("stock").default(100),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  name: text("name").notNull(),
  tag: text("tag").default("ONAYLI ALICI"),
  rating: integer("rating").default(5),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").default(0),
});

// === SCHEMAS ===

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true });
export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true });

// === EXPLICIT TYPES ===

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = z.infer<typeof insertFaqSchema>;

// Request/Response Types
export type ProductResponse = Product;
export type ReviewResponse = Review;
export type FaqResponse = Faq;

// Auth models
export * from "./models/auth";
