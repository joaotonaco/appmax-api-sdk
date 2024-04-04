import { assertString } from "./assertions/literal";
import { APIManager } from "./managers/api";
import { CustomersManager } from "./managers/customers";
import { OrdersManager } from "./managers/orders";
import { PaymentsManager } from "./managers/payments";

export class AppmaxAPI {
	public static apiInfo = {
		version: "v3",
		baseUrl: "https://admin.appmax.com.br/api",
		testBaseUrl: "https://homolog.sandboxappmax.com.br/api",
	};

	public readonly api: APIManager;
	public readonly customers = new CustomersManager(this);
	public readonly orders = new OrdersManager(this);
	public readonly payments = new PaymentsManager(this);

	constructor(apiKey: string, options?: { testMode?: boolean }) {
		assertString(apiKey, "API_KEY");
		this.api = new APIManager(apiKey, options?.testMode);
	}
}
