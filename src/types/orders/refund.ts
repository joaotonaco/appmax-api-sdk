import type {
	refundOrderPayloadSchema,
	refundOrderSchema,
} from "@/schemas/orders/refund";
import type { z } from "zod";

export type RefundOrderType = z.infer<typeof refundOrderSchema>;
export type RefundOrderPayload = z.infer<typeof refundOrderPayloadSchema>;
