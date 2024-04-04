export class AppmaxAPIError extends Error {
	constructor(code: string, message: string) {
		super(message);

		this.name = AppmaxAPIError.name;
		this.message = this.getMessage(code);

		Error.captureStackTrace(this, AppmaxAPIError);
	}

	private getMessage(rawCode: string) {
		const code = rawCode
			.replaceAll("_", " ")
			.toLowerCase()
			.replace(/(^|\s)\S/g, (L) => L.toUpperCase());
		const message = this.message ? `: ${this.message}` : "";

		return `${code}${message}`;
	}
}

export class AppmaxAPIValidationError extends AppmaxAPIError {
	constructor(code: string, message: string) {
		super(code, message);

		this.name = AppmaxAPIValidationError.name;
	}
}
