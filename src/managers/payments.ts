import { assertCreatePaymentResponse } from "@/assertions/payments/create";
import { assertGetInstallmentsResponse } from "@/assertions/payments/installments";
import { assertTokenizeResponse } from "@/assertions/payments/tokenize";
import { createPaymentPayloadSchema } from "@/schemas/payments/create";
import { getInstallmentsPayloadSchema } from "@/schemas/payments/installments";
import { tokenizePayloadSchema } from "@/schemas/payments/tokenize";
import type {
	GetInstallmentsType,
	InstallmentsFormat,
	InstallmentsFormatResponse,
} from "@/types/payments/installments";
import type { AppmaxAPI, CreatePaymentType, TokenizeType } from "..";

export class PaymentsManager {
	constructor(private readonly client: AppmaxAPI) {}

	async create(payment: CreatePaymentType) {
		const payload = createPaymentPayloadSchema.parse(payment);
		const response = await this.client.api.fetch(
			`payment/${payment.payment.type}`,
			{
				method: "POST",
				body: payload,
			},
		);

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

	async installments<T extends InstallmentsFormat>(
		options: GetInstallmentsType<T>,
	) {
		const payload = getInstallmentsPayloadSchema.parse(options);
		const response = await this.client.api.fetch("payment/installments", {
			method: "POST",
			body: payload,
		});

		return assertGetInstallmentsResponse(response.data) as Record<
			string,
			InstallmentsFormatResponse[T]
		>;
	}
}
