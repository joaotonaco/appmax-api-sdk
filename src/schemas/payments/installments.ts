import { z } from "zod";

export const getInstallmentsSchema = z.object({
	installments: z.number().int().min(1).max(12).optional(),
	total: z.number(),
	/**
	 * - number: `104.51`
	 * - installment-value: `"2 x R$ 52,26"`
	 * - value: `"R$ 104,51"`
	 */
	format: z.enum(["number", "installment-value", "value"]),
});

export const getInstallmentsPayloadSchema = getInstallmentsSchema.transform(
	(input) => ({
		...input,
		format: ["number", "installment-value", "value"].indexOf(input.format) + 1,
	}),
);

export const getInstallmentsResponseSchema = z.record(
	z.string().or(z.number()),
);
