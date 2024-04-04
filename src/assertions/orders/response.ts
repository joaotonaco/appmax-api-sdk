import { z } from "zod";
import type { CreateOrderResponse } from "../../types/orders";
import { createCustomerResponseSchema } from "../customers";
import { handleAPIObjectAssertion } from "../handlers";

export const createOrderResponseSchema = z
	.object({
		id: z.number(),
		customer_id: z.number(),
		status: z.string(),
		freight_value: z.number().nullable(),
		created_at: z.coerce.date(),
		discount: z.number().nullable(),
		origin: z.string(),
		total: z.number().nullable(),
		customer: createCustomerResponseSchema,
		company_name: z.string().nullable(),
		company_cnpj: z.string().nullable(),
		company_email: z.string().nullable(),
		full_payment_amount: z.string(),
		additional_hash: z.string(),
	})
	.transform((input) => ({
		id: input.id,
		customerId: input.customer_id,
		status: input.status,
		freightValue: input.freight_value || undefined,
		createdAt: input.created_at,
		discount: input.discount || undefined,
		origin: input.origin,
		total: input.total || undefined,
		customer: input.customer,
		company: {
			name: input.company_name || undefined,
			cnpj: input.company_cnpj || undefined,
			email: input.company_email || undefined,
		},
		fullPaymentAmount: input.full_payment_amount,
		additionalHash: input.additional_hash,
	}));

export function assertOrderResponse(value: unknown): CreateOrderResponse {
	return handleAPIObjectAssertion({
		schema: createOrderResponseSchema,
		code: "ORDER",
		route: "/order",
		value,
	});
}
