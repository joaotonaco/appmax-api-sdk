import { z } from "zod";

export const paymentSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("credit-card"),
		card: z.object({
			number: z.string().length(16),
			cvv: z.string().min(2).max(4),
			month: z.number().int().min(1).max(12),
			year: z.number().int(),
			name: z.string().min(2).optional(),
		}),
		documentNumber: z.string().length(11),
		installments: z.number().int(),
		softDescriptor: z.string().max(13).optional(),
	}),
	z.object({
		type: z.literal("boleto"),
		documentNumber: z.string().length(11),
	}),
	z.object({
		type: z.literal("pix"),
		documentNumber: z.string().length(11),
		expirationDate: z.coerce.date().transform((date) => date.toISOString()),
	}),
	z.object({
		type: z.literal("credit-card"),
		token: z.string(),
		documentNumber: z.string().length(11),
		installments: z.number().int(),
		softDescriptor: z.string().max(13).optional(),
	}),
	z.object({
		type: z.literal("credit-card"),
		upsellHash: z.string(),
		installments: z.number().int(),
		softDescriptor: z.string().max(13).optional(),
	}),
]);

export const createPaymentSchema = z.object({
	orderId: z.number().int(),
	customerId: z.number().int(),
	payment: paymentSchema,
});

export * from "./payload";
export * from "./response";
