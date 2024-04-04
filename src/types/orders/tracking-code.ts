import type { z } from "zod";
import type {
	trackingCodePayloadSchema,
	trackingCodeSchema,
} from "../../assertions/orders/tracking-code";

export type TrackingCodeType = z.infer<typeof trackingCodeSchema>;
export type TrackingCodePayload = z.infer<typeof trackingCodePayloadSchema>;
