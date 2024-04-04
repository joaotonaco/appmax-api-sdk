import { z } from "zod";

const refundOrderBaseSchema = z.object({
	orderId: z.number().int(),
});

export const refundOrderSchema = z.discriminatedUnion("type", [
	refundOrderBaseSchema.extend({ type: z.literal("total") }),
	refundOrderBaseSchema.extend({
		type: z.literal("partial"),
		amount: z.number(),
	}),
]);

export * from "./payload";
