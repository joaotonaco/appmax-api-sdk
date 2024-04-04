import type { AppmaxAPI } from "..";
import {
	assertCreateCustomerResponse,
	createCustomerPayloadSchema,
} from "../assertions/customers/create";
import type { CreateCustomerType } from "../types/customers/create";

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
