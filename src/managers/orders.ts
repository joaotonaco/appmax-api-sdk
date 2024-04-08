import { assertCreateOrderResponse } from "@/assertions/orders/create";
import { createOrderPayloadSchema } from "@/schemas/orders/create";
import { refundOrderPayloadSchema } from "@/schemas/orders/refund";
import { trackingCodePayloadSchema } from "@/schemas/orders/tracking-code";
import type { CreateOrderResponse } from "@/types/orders/create";
import type {
	AppmaxAPI,
	CreateOrderType,
	RefundOrderType,
	TrackingCodeType,
} from "..";

export class OrdersManager {
	constructor(private readonly client: AppmaxAPI) {}

	async create(order: CreateOrderType) {
		const payload = createOrderPayloadSchema.parse(order);
		const response = await this.client.api.fetch<CreateOrderResponse>("order", {
			method: "POST",
			body: payload,
		});

		return assertCreateOrderResponse(response.data);
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
