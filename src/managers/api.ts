import { AppmaxAPIError } from "@/structures/error";
import type { APIPayload, APIRequestInit } from "@/types/api";
import { AppmaxAPI } from "..";

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
		const request = new Request(url, init);

		const response = await fetch(request).catch((err) => {
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
				...init.body,
				"access-token": this.apiKey,
			};
			init.headers = {
				...init.headers,
				"Content-Type": "application/json",
			};
		}

		return { ...init, body: JSON.stringify(init.body) } as RequestInit;
	}
}
