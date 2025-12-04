// Global free-shipping threshold logic
// Base rule: Free shipping on orders over 49 USD.
// Currency system uses CNY as base, so we store the threshold as CNY value
// using the same USD rate as in `CurrencyContext`.

export const FREE_SHIPPING_THRESHOLD_USD = 49

// Shipping fee per item for orders under free shipping threshold
export const SHIPPING_FEE_PER_ITEM_USD = 7.95

// Must stay in sync with `currencyConfigs.USD.rate` in `CurrencyContext`
const USD_RATE_RELATIVE_TO_CNY = 0.14

// Threshold value expressed in CNY (base currency)
export const FREE_SHIPPING_THRESHOLD_CNY =
  FREE_SHIPPING_THRESHOLD_USD / USD_RATE_RELATIVE_TO_CNY

// Shipping fee per item expressed in CNY (base currency)
export const SHIPPING_FEE_PER_ITEM_CNY =
  SHIPPING_FEE_PER_ITEM_USD / USD_RATE_RELATIVE_TO_CNY


