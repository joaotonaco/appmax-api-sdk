import type { z } from "zod";
import type {
	createOrderPayloadSchema,
	createOrderResponseSchema,
	createOrderSchema,
} from "../assertions/orders";

export type CreateOrderType = z.infer<typeof createOrderSchema>;
export type CreateOrderPayload = z.infer<typeof createOrderPayloadSchema>;
export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;
