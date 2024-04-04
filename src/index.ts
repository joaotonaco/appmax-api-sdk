import { assertString } from "./assertions/literal";
import { APIManager } from "./managers/api";

export class AppmaxAPI {
	public static apiInfo = {
		version: "v3",
		baseUrl: "https://admin.appmax.com.br/api",
		testBaseUrl: "https://homolog.sandboxappmax.com.br/api",
	};

	public readonly api: APIManager;

	constructor(private apiKey: string) {
		assertString(apiKey, "API_KEY");
		this.api = new APIManager(apiKey);
	}
}
