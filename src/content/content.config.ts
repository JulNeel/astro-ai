// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const product = defineCollection({
  type: 'content',
  schema: z.object({
    productPost: z.string(),
  }),
});

const site = defineCollection({
  type: 'content',
  schema: z.object({
    baseLine: z.string(),

  }),
});

export const collections = {
  product,
  site,
};
