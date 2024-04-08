import type {
	createCustomerPayloadSchema,
	createCustomerResponseSchema,
	createCustomerSchema,
} from "@/schemas/customers/create";
import type { z } from "zod";

export type CreateCustomerType = z.infer<typeof createCustomerSchema>;
export type CreateCustomerPayload = z.infer<typeof createCustomerPayloadSchema>;
export type CreateCustomerResponse = z.infer<
	typeof createCustomerResponseSchema
>;
