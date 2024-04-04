import type { AppmaxAPI } from "..";
import {
	assertOrderResponse,
	createOrderPayloadSchema,
} from "../assertions/orders/create";
import { refundOrderPayloadSchema } from "../assertions/orders/refund";
import { trackingCodePayloadSchema } from "../assertions/orders/tracking-code";
import type {
	CreateOrderResponse,
	CreateOrderType,
} from "../types/orders/create";
import type { RefundOrderType } from "../types/orders/refund";
import type { TrackingCodeType } from "../types/orders/tracking-code";

export class OrdersManager {
	constructor(private readonly client: AppmaxAPI) {}

	async create(order: CreateOrderType) {
		const payload = createOrderPayloadSchema.parse(order);
		const response = await this.client.api.fetch<CreateOrderResponse>("order", {
			method: "POST",
			body: payload,
		});

		return assertOrderResponse(response.data);
	}

	async setTrackingCode(trackingCode: TrackingCodeType) {
		const payload = trackingCodePayloadSchema.parse(trackingCode);
		const response = await this.client.api.fetch(
			"order/delivery-tracking-code",
			{
				method: "POST",
				body: payload,
			},
		);

		return Boolean(response.data);
	}

	async refund(refund: RefundOrderType) {
		const payload = refundOrderPayloadSchema.parse(refund);
		const response = await this.client.api.fetch("refund", {
			method: "POST",
			body: payload,
		});

		return Boolean(response.data);
	}
}
