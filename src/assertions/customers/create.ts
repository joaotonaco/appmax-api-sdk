import { createCustomerResponseSchema } from "@/schemas/customers/create";
import { handleAPIObjectAssertion } from "../handlers";

export function assertCreateCustomerResponse(value: unknown) {
	return handleAPIObjectAssertion({
		schema: createCustomerResponseSchema,
		code: "CUSTOMER",
		route: "/customer",
		value,
	});
}
