import type { z } from "zod";
import type {
	refundOrderPayloadSchema,
	refundOrderSchema,
} from "../../assertions/orders/refund";

export type RefundOrderType = z.infer<typeof refundOrderSchema>;
export type RefundOrderPayload = z.infer<typeof refundOrderPayloadSchema>;
