import { getInstallmentsResponseSchema } from "@/schemas/payments/installments";
import { handleAPIObjectAssertion } from "../handlers";

export function assertGetInstallmentsResponse(value: unknown) {
	return handleAPIObjectAssertion({
		schema: getInstallmentsResponseSchema,
		code: "INSTALLMENTS",
		route: "/payment/installments",
		value,
	});
}
