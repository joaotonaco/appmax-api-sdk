import { z } from "zod";

export const trackingCodeSchema = z.object({
	orderId: z.number().int(),
	trackingCode: z.string().max(255),
});

export * from "./payload";
