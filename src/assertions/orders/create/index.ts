import { z } from "zod";

export const createOrderSchema = z
	.object({
		customerId: z.number().int(),
		total: z.number().optional(),
		shipping: z.number().optional(),
		discount: z.number().optional(),
		freightType: z.string().optional(),
		products: z
			.array(
				z.object({
					sku: z.string().max(100),
					name: z.string().max(255),
					quantity: z.number().int(),
					price: z.number().optional(),
					weight: z.number().optional(),
					digital: z.boolean().optional(),
				}),
			)
			.min(1),
	})
	.refine(
		(input) =>
			input.total ||
			input.products.reduce((acc, product) => acc + (product.price || 0), 0),
		{
			message:
				"Product price is required if total is not specified and vice-versa",
			path: ["total"],
		},
	);

export * from "./payload";
export * from "./response";
