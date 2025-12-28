import { z } from 'zod';
import { insertProductSchema, insertReviewSchema, insertFaqSchema, products, reviews, faqs } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products',
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:id',
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  reviews: {
    list: {
      method: 'GET' as const,
      path: '/api/reviews',
      responses: {
        200: z.array(z.custom<typeof reviews.$inferSelect>()),
      },
    },
    byProduct: {
      method: 'GET' as const,
      path: '/api/products/:productId/reviews',
      responses: {
        200: z.array(z.custom<typeof reviews.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/products/:productId/reviews',
      body: insertReviewSchema,
      responses: {
        201: z.custom<typeof reviews.$inferSelect>(),
      },
    },
  },
  faqs: {
    list: {
      method: 'GET' as const,
      path: '/api/faqs',
      responses: {
        200: z.array(z.custom<typeof faqs.$inferSelect>()),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
