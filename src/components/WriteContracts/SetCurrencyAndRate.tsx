import { Form } from "antd";
import * as React from "react";
import { XYZCOIN_ADDRESS } from "../../constants/address";
import useSetSwappedCurrencyRateAndDecimals from "../../hooks/useSetSwappedCurrencyRateAndDecimals";
import FormCustom from "../FormCustom";

export function SetCurrencyAndRate() {
  const [inputData, setInputData] = React.useState<any>({});
  const { data, write } = useSetSwappedCurrencyRateAndDecimals(
    inputData.currency,
    inputData.rate,
    inputData.decimals,
  );
  const [formSetRate] = Form.useForm();
  const onFinish = (values: any) => {
    setInputData(values);
    write?.();
  };

  const onReset = () => {
    formSetRate.resetFields();
  };

  const onFill = () => {
    formSetRate.setFieldsValue({ currency: XYZCOIN_ADDRESS, rate: 123, decimals: 2 });
  };
  const fieldList = [
    { id: 1, name: "currency", label: "Currency" },
    { id: 2, name: "rate", label: "Rate" },
    { id: 3, name: "decimals", label: "Decimals" },
  ];
  return (
    <FormCustom
      form={formSetRate}
      data={data}
      write={write}
      onFill={onFill}
      onFinish={onFinish}
      onReset={onReset}
      fieldList={fieldList}
      inputData={inputData}
      setInputData={setInputData}
      buttonLabel="Set Currency and Rate"
    />
  );
}
