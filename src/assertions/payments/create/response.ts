import { z } from "zod";
import { handleAPIObjectAssertion } from "../../handlers";

export const createPaymentResponseSchema = z.object({
	transaction_id: z.string(),
});

export function assertCreatePaymentResponse(value: unknown) {
	return handleAPIObjectAssertion({
		schema: createPaymentResponseSchema,
		code: "PAYMENT",
		route: "/payment",
		value,
	});
}
