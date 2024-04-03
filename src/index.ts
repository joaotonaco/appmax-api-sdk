export class AppmaxAPI {
	public static apiInfo = {
		version: "v3",
		baseUrl: "https://admin.appmax.com.br/api",
		testBaseUrl: "https://homolog.sandboxappmax.com.br/api",
	};

	constructor(private apiKey: string) {}
}
