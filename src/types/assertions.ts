import type { ZodSchema } from "zod";

export type BaseAssertionProps<T extends ZodSchema> = {
	schema: T;
	value: unknown;
	code?: string;
};

export type LiteralAssertionProps = BaseAssertionProps<ZodSchema> & {
	expect: string;
};

export type APIObjectAssertionProps<T extends ZodSchema> =
	BaseAssertionProps<T> & {
		code: string;
		route: string;
	};
