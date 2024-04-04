import type { z } from "zod";
import type {
	createOrderPayloadSchema,
	createOrderSchema,
} from "../assertions/orders";
import type { createOrderResponseSchema } from "../assertions/orders/response";

export type CreateOrderType = z.infer<typeof createOrderSchema>;
export type CreateOrderPayload = z.infer<typeof createOrderPayloadSchema>;
export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;
