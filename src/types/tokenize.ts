import type { z } from "zod";
import type {
	tokenizePayloadSchema,
	tokenizeResponseSchema,
	tokenizeSchema,
} from "../assertions/tokenize";

export type TokenizeType = z.infer<typeof tokenizeSchema>;
export type TokenizePayload = z.infer<typeof tokenizePayloadSchema>;
export type TokenizeResponse = z.infer<typeof tokenizeResponseSchema>;
