import { z } from "zod";

export const trackingCodeSchema = z.object({
	orderId: z.number().int(),
	trackingCode: z.string().max(255),
});

export const trackingCodePayloadSchema = trackingCodeSchema.transform(
	(input) => ({
		order_id: input.orderId,
		delivery_tracking_code: input.trackingCode,
	}),
);
