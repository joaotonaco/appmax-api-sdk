import { assertCreatePaymentResponse } from "@/assertions/payments/create";
import { assertTokenizeResponse } from "@/assertions/payments/tokenize";
import { createPaymentPayloadSchema } from "@/schemas/payments/create";
import { tokenizePayloadSchema } from "@/schemas/payments/tokenize";
import type { AppmaxAPI, CreatePaymentType, TokenizeType } from "..";

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
