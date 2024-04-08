import { z } from "zod";

export const paymentSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal("credit-card"),
		card: z.object({
			number: z.string().length(16),
			cvv: z.string().min(2).max(4),
			month: z.number().int().min(1).max(12),
			year: z.number().int(),
			name: z.string().min(2).optional(),
		}),
		documentNumber: z.string().length(11),
		installments: z.number().int(),
		softDescriptor: z.string().max(13).optional(),
	}),
	z.object({
		type: z.literal("boleto"),
		documentNumber: z.string().length(11),
	}),
	z.object({
		type: z.literal("pix"),
		documentNumber: z.string().length(11),
		expirationDate: z.coerce
			.date()
			.transform((date) => date.toISOString())
			.optional(),
	}),
	z.object({
		type: z.literal("credit-card"),
		token: z.string(),
		documentNumber: z.string().length(11),
		installments: z.number().int(),
		softDescriptor: z.string().max(13).optional(),
	}),
	z.object({
		type: z.literal("credit-card"),
		upsellHash: z.string(),
		installments: z.number().int(),
		softDescriptor: z.string().max(13).optional(),
	}),
]);

export const createPaymentSchema = z.object({
	orderId: z.number().int(),
	customerId: z.number().int(),
	payment: paymentSchema,
});

// ------------------------
//         Payload
// ------------------------

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

// ------------------------
//         Response
// ------------------------

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
