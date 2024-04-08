import type {
	trackingCodePayloadSchema,
	trackingCodeSchema,
} from "@/schemas/orders/tracking-code";
import type { z } from "zod";

export type TrackingCodeType = z.infer<typeof trackingCodeSchema>;
export type TrackingCodePayload = z.infer<typeof trackingCodePayloadSchema>;
