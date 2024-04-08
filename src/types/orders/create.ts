import type {
	createOrderPayloadSchema,
	createOrderResponseSchema,
	createOrderSchema,
} from "@/schemas/orders/create";
import type { z } from "zod";

export type CreateOrderType = z.infer<typeof createOrderSchema>;
export type CreateOrderPayload = z.infer<typeof createOrderPayloadSchema>;
export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;
