import { createPaymentSchema, paymentSchema } from ".";

const payloadTypes = {
	boleto: "Boleto",
	pix: "pix",
	"credit-card": "CreditCard",
} as const;

export const paymentPayloadSchema = paymentSchema.transform((input) => {
	const type = payloadTypes[input.type];
	let payment = {};

	if ("documentNumber" in input) {
		payment = { ...payment, document_number: input.documentNumber };
	}

	if (input.type === "credit-card") {
		payment = {
			...payment,
			soft_descriptor: input.softDescriptor,
			installments: input.installments,
		};

		if ("card" in input) {
			payment = { ...payment, ...input.card };
		}

		if ("token" in input) {
			payment = { ...payment, token: input.token };
		}

		if ("upsellHash" in input) {
			payment = { ...payment, upsell_hash: input.upsellHash };
		}
	}

	if (input.type === "pix") {
		payment = { ...payment, expiration_date: input.expirationDate };
	}

	return { [type]: payment };
});

export const createPaymentPayloadSchema = createPaymentSchema.transform(
	(input) => {
		return {
			cart: { order_id: input.orderId },
			customer: { customer_id: input.customerId },
			payment: paymentPayloadSchema.parse(input.payment),
		};
	},
);
