import { assertCreateCustomerResponse } from "@/assertions/customers/create";
import { createCustomerPayloadSchema } from "@/schemas/customers/create";
import type { AppmaxAPI, CreateCustomerType } from "..";

export class CustomersManager {
	constructor(private readonly client: AppmaxAPI) {}

	async create(customer: CreateCustomerType) {
		const payload = createCustomerPayloadSchema.parse(customer);
		const response = await this.client.api.fetch("customer", {
			method: "POST",
			body: payload,
		});

		return assertCreateCustomerResponse(response.data);
	}
}
