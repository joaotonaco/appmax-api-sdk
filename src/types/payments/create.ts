import type {
	createPaymentPayloadSchema,
	createPaymentResponseSchema,
	createPaymentSchema,
	paymentSchema,
} from "@/schemas/payments/create";
import type { z } from "zod";

export type PaymentType = z.infer<typeof paymentSchema>;

export type CreatePaymentType = z.infer<typeof createPaymentSchema>;
export type CreatePaymentPayload = z.infer<typeof createPaymentPayloadSchema>;
export type CreatePaymentResponse = z.infer<typeof createPaymentResponseSchema>;
