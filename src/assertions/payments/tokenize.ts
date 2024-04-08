import { tokenizeResponseSchema } from "@/schemas/payments/tokenize";
import { handleAPIObjectAssertion } from "../handlers";

export function assertTokenizeResponse(value: unknown) {
	return handleAPIObjectAssertion({
		schema: tokenizeResponseSchema,
		code: "TOKENIZE",
		route: "/tokenize/card",
		value,
	});
}
