import { defineCollection, z } from 'astro:content';

const sections = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		order: z.number(),
		menu: z.string().optional(),
		tags: z.array(z.string()).optional(),
		est_read: z.number().optional(),
		hero_image: z.string().optional(),
	}),
});

const tools = defineCollection({
	type: 'data',
	schema: z.object({
		id: z.string(),
		name: z.string(),
		summary: z.string().optional(),
		type: z.string().optional(),
		steps: z.array(z.object({
			phase: z.string().optional(),
			duration: z.number().optional(),
			text: z.string().optional(),
			count: z.number().optional(),
			action: z.string().optional(),
		})).optional(),
		instructions: z.union([z.string(), z.array(z.string())]).optional(),
		repeat: z.number().optional(),
	})
});

const checklists = defineCollection({
	type: 'data',
	schema: z.object({
		id: z.string(),
		title: z.string(),
		items: z.array(z.string()).optional(),
		sections: z.array(z.object({
			title: z.string(),
			items: z.array(z.string())
		})).optional()
	})
});

export const collections = {
	sections,
	tools,
	checklists
};
