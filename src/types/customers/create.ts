import type { z } from "zod";
import type {
	createCustomerPayloadSchema,
	createCustomerResponseSchema,
	createCustomerSchema,
} from "../../assertions/customers/create";

export type CreateCustomerType = z.infer<typeof createCustomerSchema>;
export type CreateCustomerPayload = z.infer<typeof createCustomerPayloadSchema>;
export type CreateCustomerResponse = z.infer<
	typeof createCustomerResponseSchema
>;
