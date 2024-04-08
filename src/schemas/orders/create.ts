import { z } from "zod";
import { createCustomerResponseSchema } from "../customers/create";

export const createOrderSchema = z
	.object({
		customerId: z.number().int(),
		total: z.number().optional(),
		shipping: z.number().optional(),
		discount: z.number().optional(),
		freightType: z.string().optional(),
		products: z
			.array(
				z.object({
					sku: z.string().max(100),
					name: z.string().max(255),
					quantity: z.number().int(),
					price: z.number().optional(),
					weight: z.number().optional(),
					digital: z.boolean().optional(),
				}),
			)
			.min(1),
	})
	.refine(
		(input) =>
			input.total ||
			input.products.reduce((acc, product) => acc + (product.price || 0), 0),
		{
			message:
				"Product price is required if total is not specified and vice-versa",
			path: ["total"],
		},
	);

export const createOrderPayloadSchema = createOrderSchema.transform(
	(input) => ({
		customer_id: input.customerId,
		total: input.total,
		shipping: input.shipping,
		discount: input.discount,
		freight_type: input.freightType,
		products: input.products.map((product) => ({
			sku: product.sku,
			name: product.name,
			qty: product.quantity,
			price: product.price,
			weight: product.weight,
			digital_product: product.digital,
		})),
	}),
);

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
