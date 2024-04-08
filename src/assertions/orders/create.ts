import { createOrderResponseSchema } from "@/schemas/orders/create";
import { handleAPIObjectAssertion } from "../handlers";

export function assertCreateOrderResponse(value: unknown) {
	return handleAPIObjectAssertion({
		schema: createOrderResponseSchema,
		code: "ORDER",
		route: "/order",
		value,
	});
}
