import { tokenizeSchema } from ".";

export const tokenizePayloadSchema = tokenizeSchema.transform((input) => ({
	card: input,
}));
