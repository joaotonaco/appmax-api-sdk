import type { AppmaxAPI } from "..";
import {
	assertCustomerResponse,
	createCustomerPayloadSchema,
} from "../assertions/customers";
import type { CreateCustomerType } from "../types/customers";

export class CustomersManager {
	constructor(private readonly client: AppmaxAPI) {}

	async create(customer: CreateCustomerType) {
		const payload = createCustomerPayloadSchema.parse(customer);
		const response = await this.client.api.fetch<CreateCustomerType>(
			"customer",
			{
				method: "POST",
				body: payload,
			},
		);

		return assertCustomerResponse(response.data);
	}
}
