import { AppmaxAPIError, AppmaxAPIValidationError } from "@/structures/error";
import type {
	APIObjectAssertionProps,
	LiteralAssertionProps,
} from "@/types/assertions";
import type { ZodIssue, ZodSchema, z } from "zod";

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

export function handleAPIObjectAssertion<T extends ZodSchema>({
	schema,
	value,
	code,
	route,
}: APIObjectAssertionProps<T>): z.infer<T> {
	const name = code.toLowerCase().replaceAll("_", " ");

	try {
		return schema.parse(value);
	} catch (err) {
		const cause = err.errors?.map((err: ZodIssue) => ({
			...err,
			path: err.path.join(" > "),
		}));

		throw new AppmaxAPIError(
			`INVALID_API_${code}`,
			`Invalid ${name} object received from API ${route}`,
			{ cause },
		);
	}
}
