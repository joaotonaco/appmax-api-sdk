import { z } from "zod";

export const tokenizeSchema = z.object({
	name: z.string().min(2).optional(),
	number: z.string().length(16),
	cvv: z.string().min(2).max(4),
	month: z.number().int().min(1).max(12),
	year: z.number().int(),
});

export * from "./payload";
export * from "./response";
