export interface InputSetCurrencyAndRate {
  currency: `0x${string}` | undefined;
  rate: number;
  decimals: number;
}

export interface InputSwapToken {
  token: `0x${string}` | undefined;
  amountSender: number;
}
export interface InputSetMainToken {
  token: `0x${string}` | undefined;
}
export interface InputInitialize {
  mainToken: `0x${string}`;
  _receiver: `0x${string}` | undefined;
  _sender: `0x${string}` | undefined;
  swappedCurrency: `0x${string}` | undefined;
  swappedRate: number;
  swappedCurrencyDecimals: number;
}

export interface FieldType {
  id: number;
  name: string;
  label: string;
}
