import type { AppmaxAPI } from "..";
import {
	assertTokenizeResponse,
	tokenizePayloadSchema,
} from "../assertions/tokenize";
import type { TokenizeType } from "../types/tokenize";

export class PaymentsManager {
	constructor(private readonly client: AppmaxAPI) {}

	async tokenizeCard(card: TokenizeType) {
		const payload = tokenizePayloadSchema.parse(card);
		const response = await this.client.api.fetch<TokenizeType>(
			"tokenize/card",
			{
				method: "POST",
				body: payload,
			},
		);

		return assertTokenizeResponse(response.data).token;
	}
}
