import { AppmaxAPI } from "..";
import { AppmaxAPIError } from "../structures/error";
import type { APIPayload, APIRequestInit } from "../types/api";

export class APIManager {
	public readonly baseUrl: string;

	constructor(
		private readonly apiKey: string,
		testMode?: boolean,
	) {
		const { version, baseUrl, testBaseUrl } = AppmaxAPI.apiInfo;
		this.baseUrl = `${testMode ? testBaseUrl : baseUrl}/${version}`;
	}

	async fetch<T, U = unknown>(
		path: string,
		init: APIRequestInit = {},
	): Promise<APIPayload<T, U, true>> {
		init.method = init.method?.toUpperCase() || "GET";
		init.body =
			init.method === "POST"
				? { "access-token": this.apiKey, ...(init.body || {}) }
				: init.body;

		const response = await fetch(
			`${this.baseUrl}/${path}`,
			init as RequestInit,
		).catch((error) => {
			throw new AppmaxAPIError(error.code || "UNKNOWN_ERROR", error.message);
		});

		const data: APIPayload<T, U> = await response.json();

		if (!data || !data.success || !response.ok) {
			throw new AppmaxAPIError("API_ERROR", data.text, { cause: data.data });
		}

		return data;
	}
}
