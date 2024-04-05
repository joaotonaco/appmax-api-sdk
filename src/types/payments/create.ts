import type { z } from "zod";
import type {
	createPaymentPayloadSchema,
	createPaymentResponseSchema,
	createPaymentSchema,
} from "../../assertions/payments/create";

export type CreatePaymentType = z.infer<typeof createPaymentSchema>;
export type CreatePaymentPayload = z.infer<typeof createPaymentPayloadSchema>;
export type CreatePaymentResponse = z.infer<typeof createPaymentResponseSchema>;
