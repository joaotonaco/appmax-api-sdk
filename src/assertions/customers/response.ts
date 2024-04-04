import { z } from "zod";
import type { CreateCustomerResponse } from "../../types/customers";
import { handleAPIObjectAssertion } from "../handlers";

export const createCustomerResponseSchema = z
	.object({
		id: z.number(),
		firstname: z.string(),
		lastname: z.string(),
		email: z.string(),
		telephone: z.string(),
		hash: z.string(),
		postcode: z.string(),
		address_street: z.string(),
		address_street_number: z.string(),
		address_street_complement: z.string().optional(),
		address_street_district: z.string(),
		address_city: z.string(),
		address_state: z.string(),
		site_id: z.number(),
		ip: z.string(),
		custom_txt: z.string().optional(),
		created_at: z.coerce.date(),
		updated_at: z.coerce.date(),
		uf: z.string(),
	})
	.transform((input) => ({
		id: input.id,
		hash: input.hash,
		firstName: input.firstname,
		lastName: input.lastname,
		email: input.email,
		telephone: input.telephone,
		address: {
			postcode: input.postcode,
			street: input.address_street,
			number: input.address_street_number,
			complement: input.address_street_complement,
			district: input.address_street_district,
			city: input.address_city,
			state: input.address_state,
			uf: input.uf,
		},
		siteId: input.site_id,
		ip: input.ip,
		customText: input.custom_txt,
		createdAt: input.created_at,
		updatedAt: input.updated_at,
	}));

export function assertCustomerResponse(value: unknown): CreateCustomerResponse {
	return handleAPIObjectAssertion({
		schema: createCustomerResponseSchema,
		code: "CUSTOMER",
		route: "/customer",
		value,
	});
}
