import { AppmaxAPIValidationError } from "../structures/error";
import type { LiteralAssertionProps } from "../types/assertions";

export function handleLiteralAssertion({
	schema,
	value,
	expect,
	code,
}: LiteralAssertionProps) {
	try {
		schema.parse(value);
	} catch {
		throw new AppmaxAPIValidationError(
			code ? `INVALID_${code}` : "VALIDATION_ERROR",
			`Expect ${expect}, got ${typeof value}`,
		);
	}
}
