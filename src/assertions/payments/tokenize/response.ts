import { z } from "zod";
import type { TokenizeResponse } from "../../../types/payments/tokenize";
import { handleAPIObjectAssertion } from "../../handlers";

export const tokenizeResponseSchema = z.object({
	token: z.string(),
});

export function assertTokenizeResponse(value: unknown): TokenizeResponse {
	return handleAPIObjectAssertion({
		schema: tokenizeResponseSchema,
		code: "TOKENIZE",
		route: "/tokenize/card",
		value,
	});
}
