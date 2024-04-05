# @appmax-api/sdk

## 0.1.0

### Minor Changes

- d46bcdd: New `AppmaxAPI#orders` for `/order` route
- 6ddcd28: New `AppmaxAPI#payments` for payment-related routes (current: `/tokenize/card`)
- c85b47a: New `PaymentsManager#create` for `/payment/*` routes
- 3ea722a: New `OrdersManager#setTrackingCode` for `/order/delivery-tracking-code` route
- 3f5d2e8: New `OrdersManager#refund` for `/refund` route
- 0274640: New `AppmaxAPI#customers` for `/customer` route

### Patch Changes

- 6127580: Add support for API testing url