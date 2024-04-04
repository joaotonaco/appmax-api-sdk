export type APIRequestInit = Omit<RequestInit, "body"> & { body?: object };

export type APIPayload<T, U = unknown> = {
	text: string;
	status: number;
} & (
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			data: U;
	  }
);

export type APIValidationError = Record<string, [string]>;
