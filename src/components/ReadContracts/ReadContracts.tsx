import { XYZCOIN_ADDRESS } from "../../constants/address";
import useReadDecimals from "../../hooks/useReadDecimals";
import useReadRate from "../../hooks/useReadRate";

export function ReadContracts() {
  const { data: rate } = useReadRate(XYZCOIN_ADDRESS);
  const { data: decimals } = useReadDecimals(XYZCOIN_ADDRESS);
  return (
    <>
      <p className="text-xl font-bold">Read contract</p>
      {rate && decimals && (
        <p>
          Rate between ABC Coin and XYZ Coin is: {Number(rate) / Math.pow(10, Number(decimals))}
        </p>
      )}
    </>
  );
}
