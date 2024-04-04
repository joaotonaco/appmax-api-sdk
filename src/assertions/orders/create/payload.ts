import { createOrderSchema } from ".";

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
