export type APIRequestInit = Omit<RequestInit, "body"> & { body?: object };

export type APIPayload<T, U = unknown, S = false> = {
	text: string;
	status: number;
} & (
	| {
			success: true;
			data: T;
	  }
	| (S extends true
			? never
			: {
					success: false;
					data: U;
				})
);

export type APIValidationError = Record<string, [string]>;
