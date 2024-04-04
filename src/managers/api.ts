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
		this.baseUrl = `${testMode ? testBaseUrl : baseUrl}/${version}/`;
	}

	async fetch<T, U = unknown>(
		path: string,
		requestInit: APIRequestInit = {},
	): Promise<APIPayload<T, U, true>> {
		const url = new URL(path, this.baseUrl);
		const init = this.parseInit(requestInit);

		const response = await fetch(url, init).catch((err) => {
			throw new AppmaxAPIError(err.code || "UNKNOWN_ERROR", err.message);
		});

		const data: APIPayload<T, U> = await response.json();

		if (!data || !data.success || !response.ok) {
			throw new AppmaxAPIError("API_ERROR", data.text, { cause: data.data });
		}

		return data;
	}

	private parseInit(init: APIRequestInit) {
		init.method = init.method?.toUpperCase() || "GET";

		if (init.method === "POST" && init.body) {
			init.body = {
				"access-token": this.apiKey,
				...init.body,
			};
		}

		return { ...init, body: JSON.stringify(init.body) } as RequestInit;
	}
}
