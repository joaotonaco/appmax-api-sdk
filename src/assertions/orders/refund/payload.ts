import { refundOrderSchema } from ".";

export const refundOrderPayloadSchema = refundOrderSchema.transform(
	(input) => ({
		order_id: input.orderId,
		refund_type: input.type,
		refund_amount: input.type === "partial" ? input.amount : undefined,
	}),
);
