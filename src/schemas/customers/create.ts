import { z } from "zod";

export const createCustomerSchema = z.object({
	firstName: z.coerce.string().max(100),
	lastName: z.coerce.string().max(100),
	email: z.string().email().max(255),
	telephone: z.coerce.string().max(11),
	ip: z.coerce.string(),
	address: z
		.object({
			postcode: z.coerce.string().length(8),
			street: z.coerce.string().max(255),
			number: z.coerce.string().max(56),
			complement: z.coerce.string().max(255).optional(),
			district: z.coerce.string().max(255),
			city: z.coerce.string().max(255),
			state: z.coerce.string().length(2),
		})
		.optional(),
	customText: z.coerce.string().max(255).optional(),
	products: z
		.array(
			z.object({
				sku: z.coerce.string().max(100),
				quantity: z.coerce.number().int(),
			}),
		)
		.optional(),
	utmTracking: z
		.object({
			source: z.string().max(255),
			campaign: z.string().max(255),
			medium: z.string().max(255),
			content: z.string().max(255),
			term: z.string().max(255),
		})
		.partial()
		.optional(),
});

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

export const createCustomerResponseSchema = z
	.object({
		id: z.number(),
		firstname: z.string(),
		lastname: z.string(),
		email: z.string(),
		telephone: z.string(),
		hash: z.string(),
		postcode: z.string().nullable(),
		address_street: z.string().nullable(),
		address_street_number: z.string().nullable(),
		address_street_complement: z.string().optional().nullable(),
		address_street_district: z.string().nullable(),
		address_city: z.string().nullable(),
		address_state: z.string().nullable(),
		document_number: z.string().nullable(),
		site_id: z.number(),
		ip: z.string().optional(),
		custom_txt: z.string().optional().nullable(),
		created_at: z.coerce.date(),
		updated_at: z.coerce.date().optional().nullable(),
		uf: z.string().nullable(),
	})
	.transform((input) => ({
		id: input.id,
		hash: input.hash,
		firstName: input.firstname,
		lastName: input.lastname,
		email: input.email,
		telephone: input.telephone,
		address: input.postcode
			? {
					postcode: input.postcode,
					street: input.address_street as string,
					number: input.address_street_number as string,
					complement: input.address_street_complement || undefined,
					district: input.address_street_district as string,
					city: input.address_city as string,
					state: input.address_state as string,
					uf: input.uf as string,
				}
			: undefined,
		documentNumber: input.document_number || undefined,
		siteId: input.site_id,
		ip: input.ip,
		customText: input.custom_txt,
		createdAt: input.created_at,
		updatedAt: input.updated_at,
	}));
