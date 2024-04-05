import { z } from "zod";
import { handleAPIObjectAssertion } from "../../handlers";

export const tokenizeResponseSchema = z.object({
	token: z.string(),
});

export function assertTokenizeResponse(value: unknown) {
	return handleAPIObjectAssertion({
		schema: tokenizeResponseSchema,
		code: "TOKENIZE",
		route: "/tokenize/card",
		value,
	});
}
