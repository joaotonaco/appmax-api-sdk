import { z } from "zod";

export const createCustomerSchema = z.object({
	firstName: z.coerce.string().max(100),
	lastName: z.coerce.string().max(100),
	email: z.string().email().max(255),
	telephone: z.coerce.string().max(11),
	ip: z.coerce.string(),
	address: z
		.object({
			postcode: z.coerce.string().length(8),
			street: z.coerce.string().max(255),
			number: z.coerce.string().max(56),
			complement: z.coerce.string().max(255).optional(),
			district: z.coerce.string().max(255),
			city: z.coerce.string().max(255),
			state: z.coerce.string().length(2),
		})
		.optional(),
	customText: z.coerce.string().max(255).optional(),
	products: z
		.array(
			z.object({
				sku: z.coerce.string().max(100),
				quantity: z.coerce.number().int(),
			}),
		)
		.optional(),
	utmTracking: z
		.object({
			source: z.string().max(255),
			campaign: z.string().max(255),
			medium: z.string().max(255),
			content: z.string().max(255),
			term: z.string().max(255),
		})
		.partial()
		.optional(),
});

export * from "./payload";
export * from "./response";
