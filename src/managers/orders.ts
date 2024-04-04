import type { AppmaxAPI } from "..";
import {
	assertOrderResponse,
	createOrderPayloadSchema,
} from "../assertions/orders/create";
import type { CreateOrderType } from "../types/orders/create";

export class OrdersManager {
	constructor(private readonly client: AppmaxAPI) {}

	async create(order: CreateOrderType) {
		const payload = createOrderPayloadSchema.parse(order);
		const response = await this.client.api.fetch<CreateOrderType>("order", {
			method: "POST",
			body: payload,
		});

		return assertOrderResponse(response.data);
	}
}
