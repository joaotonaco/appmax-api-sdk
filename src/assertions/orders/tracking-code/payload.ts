import { trackingCodeSchema } from ".";

export const trackingCodePayloadSchema = trackingCodeSchema.transform(
	(input) => ({
		order_id: input.orderId,
		delivery_tracking_code: input.trackingCode,
	}),
);
