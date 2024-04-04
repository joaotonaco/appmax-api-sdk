import { assertString } from "./assertions/literal";
import { APIManager } from "./managers/api";
import { CustomersManager } from "./managers/customers";

export class AppmaxAPI {
	public static apiInfo = {
		version: "v3",
		baseUrl: "https://admin.appmax.com.br/api",
		testBaseUrl: "https://homolog.sandboxappmax.com.br/api",
	};

	public readonly api: APIManager;
	public readonly customers = new CustomersManager(this);

	constructor(apiKey: string) {
		assertString(apiKey, "API_KEY");
		this.api = new APIManager(apiKey);
	}
}
