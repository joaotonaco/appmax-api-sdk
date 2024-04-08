import { createPaymentResponseSchema } from "@/schemas/payments/create";
import { handleAPIObjectAssertion } from "../handlers";

export function assertCreatePaymentResponse(value: unknown) {
	return handleAPIObjectAssertion({
		schema: createPaymentResponseSchema,
		code: "PAYMENT",
		route: "/payment",
		value,
	});
}
