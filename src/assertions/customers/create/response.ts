import { z } from "zod";
import type { CreateCustomerResponse } from "../../../types/customers/create";
import { handleAPIObjectAssertion } from "../../handlers";

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
		ip: z.string(),
		custom_txt: z.string().optional(),
		created_at: z.coerce.date(),
		updated_at: z.coerce.date(),
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

export function assertCreateCustomerResponse(
	value: unknown,
): CreateCustomerResponse {
	return handleAPIObjectAssertion({
		schema: createCustomerResponseSchema,
		code: "CUSTOMER",
		route: "/customer",
		value,
	});
}
