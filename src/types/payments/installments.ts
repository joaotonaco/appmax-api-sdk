import type {
	getInstallmentsPayloadSchema,
	getInstallmentsResponseSchema,
	getInstallmentsSchema,
} from "@/schemas/payments/installments";
import type { z } from "zod";

export type InstallmentsFormat = "number" | "installment-value" | "value";

export type InstallmentsFormatResponse = {
	number: number;
	"installment-value": `${number} x R$ ${string}`;
	value: `R$ ${string}`;
};

export type GetInstallmentsType<T extends InstallmentsFormat> = z.infer<
	typeof getInstallmentsSchema
> & { format: T };
export type GetInstallmentsPayload = z.infer<
	typeof getInstallmentsPayloadSchema
>;
export type GetInstallmentsResponse = z.infer<
	typeof getInstallmentsResponseSchema
>;
