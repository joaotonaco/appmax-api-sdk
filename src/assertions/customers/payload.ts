import { createCustomerSchema } from ".";

export const createCustomerPayloadSchema = createCustomerSchema.transform(
	(input) => ({
		firstname: input.firstName,
		lastname: input.lastName,
		email: input.email,
		telephone: input.telephone,
		postcode: input.address?.postcode,
		address_street: input.address?.street,
		address_street_number: input.address?.number,
		address_street_complement: input.address?.complement,
		address_street_district: input.address?.district,
		address_city: input.address?.city,
		address_state: input.address?.state,
		ip: input.ip,
		custom_txt: input.customText,
		products: input.products?.map((product) => ({
			product_sku: product.sku,
			product_qty: product.quantity,
		})),
		tracking: {
			utm_source: input.utmTracking?.source,
			utm_campaign: input.utmTracking?.campaign,
			utm_medium: input.utmTracking?.medium,
			utm_content: input.utmTracking?.content,
			utm_term: input.utmTracking?.term,
		},
	}),
);
