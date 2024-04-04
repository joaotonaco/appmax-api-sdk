import { z } from "zod";
import { handleLiteralAssertion } from "./handlers";

const stringSchema = z.string();

export function assertString(
	value: unknown,
	code?: string,
): asserts value is string {
	handleLiteralAssertion({
		schema: stringSchema,
		expect: "string",
		value,
		code,
	});
}
