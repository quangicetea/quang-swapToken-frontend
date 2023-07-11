export const calculateRate = (rate: number, decimals: number) => {
  const rateCurrency = rate / Math.pow(10, decimals);
  return rateCurrency;
};
export const displayWalletAddress = (address: string | undefined, digits = 6) => {
  if (!address) return "N/A";
  return `${address.substring(0, digits)}...${address.substring(
    address.length - 3,
    address.length,
  )}`;
};
