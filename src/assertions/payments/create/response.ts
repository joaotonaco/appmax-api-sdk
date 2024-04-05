import { z } from "zod";
import { handleAPIObjectAssertion } from "../../handlers";

const createPaymentBaseResponseSchema = z.object({
	pay_reference: z.string(),
});

export const createPaymentResponseSchema = z
	.discriminatedUnion("type", [
		createPaymentBaseResponseSchema.extend({
			type: z.literal("CreditCard"),
			upsell_hash: z.string(),
		}),
		createPaymentBaseResponseSchema.extend({
			type: z.literal("Boleto"),
			pdf: z.string().url(),
			due_date: z.coerce.date(),
			digitable_line: z.string(),
			boleto_payment_code: z.string(),
		}),
		createPaymentBaseResponseSchema.extend({
			type: z.literal("Pix"),
			pix_qrcode: z.string(),
			pix_emv: z.string(),
			pix_creation_date: z.coerce.date(),
			pix_expiration_date: z.coerce.date(),
		}),
	])
	.transform((input) => {
		if (input.type === "CreditCard") {
			return {
				type: "credit-card" as const,
				details: {
					upsellHash: input.upsell_hash,
				},
			};
		}

		if (input.type === "Boleto") {
			return {
				type: "boleto" as const,
				details: {
					pdf: input.pdf,
					dueDate: input.due_date,
					digitableLine: input.digitable_line,
					paymentCode: input.boleto_payment_code,
				},
			};
		}

		return {
			type: "pix" as const,
			details: {
				qrCode: input.pix_qrcode,
				emv: input.pix_emv,
				creationDate: input.pix_creation_date,
				expirationDate: input.pix_expiration_date,
			},
		};
	});

export function assertCreatePaymentResponse(value: unknown) {
	return handleAPIObjectAssertion({
		schema: createPaymentResponseSchema,
		code: "PAYMENT",
		route: "/payment",
		value,
	});
}
