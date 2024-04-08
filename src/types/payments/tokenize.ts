import type {
	tokenizePayloadSchema,
	tokenizeResponseSchema,
	tokenizeSchema,
} from "@/schemas/payments/tokenize";
import type { z } from "zod";

export type TokenizeType = z.infer<typeof tokenizeSchema>;
export type TokenizePayload = z.infer<typeof tokenizePayloadSchema>;
export type TokenizeResponse = z.infer<typeof tokenizeResponseSchema>;
