import type { AppmaxAPI } from "..";
import {
	assertCreatePaymentResponse,
	createPaymentPayloadSchema,
} from "../assertions/payments/create";
import {
	assertTokenizeResponse,
	tokenizePayloadSchema,
} from "../assertions/payments/tokenize";
import type { CreatePaymentType } from "../types/payments/create";
import type { TokenizeType } from "../types/payments/tokenize";

export class PaymentsManager {
	constructor(private readonly client: AppmaxAPI) {}

	async create(payment: CreatePaymentType) {
		const payload = createPaymentPayloadSchema.parse(payment);
		const response = await this.client.api.fetch("payments", {
			method: "POST",
			body: payload,
		});

		return assertCreatePaymentResponse(response.data);
	}

	async tokenize(card: TokenizeType) {
		const payload = tokenizePayloadSchema.parse(card);
		const response = await this.client.api.fetch("tokenize/card", {
			method: "POST",
			body: payload,
		});

		return assertTokenizeResponse(response.data).token;
	}
}
