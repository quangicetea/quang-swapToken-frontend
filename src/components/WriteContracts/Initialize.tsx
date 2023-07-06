import { Button, Form, Input } from "antd";
import * as React from "react";
import {
  ABCCOIN_ADDRESS,
  USER1_ADDRESS,
  USER2_ADDRESS,
  XYZCOIN_ADDRESS,
} from "../../constants/address";
import useInitialize from "../../hooks/useInitialize";
import { InputInitialize } from "../../types";
import FormCustom from "../FormCustom";

export interface ISetCurrencyAndRateProps {}

export function Initialize({}: ISetCurrencyAndRateProps) {
  const [inputData, setInputData] = React.useState<InputInitialize>({
    mainToken: ABCCOIN_ADDRESS,
    swappedCurrency: XYZCOIN_ADDRESS,
    swappedRate: 150,
    swappedCurrencyDecimals: 2,
    _receiver: USER2_ADDRESS,
    _sender: USER1_ADDRESS,
  });
  const { data, error, isLoading, write } = useInitialize(
    inputData.mainToken,
    inputData.swappedCurrency,
    inputData.swappedRate,
    inputData.swappedCurrencyDecimals,
    inputData._receiver,
    inputData._sender
  );
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    setInputData(values);
    write?.();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      mainToken: ABCCOIN_ADDRESS,
      swappedCurrency: XYZCOIN_ADDRESS,
      swappedRate: 150,
      swappedCurrencyDecimals: 2,
      _receiver: USER2_ADDRESS,
      _sender: USER1_ADDRESS,
    });
  };
  const fieldList = [
    { id: 1, name: "mainToken", label: "Main Token" },
    { id: 2, name: "swappedCurrency", label: "Swapped Currency" },
    { id: 3, name: "swappedRate", label: "Rate" },
    {
      id: 4,
      name: "swappedCurrencyDecimals",
      label: "Swapped Currency Decimals",
    },
    { id: 5, name: "_receiver", label: "Receiver" },
    { id: 5, name: "_sender", label: "Sender" },
  ];

  return (
    <FormCustom
      form={form}
      data={data}
      write={write}
      error={error}
      onFill={onFill}
      onFinish={onFinish}
      onReset={onReset}
      fieldList={fieldList}
      inputData={inputData}
      setInputData={setInputData}
      isLoading={isLoading}
      buttonLabel="Initialize"
    />
  );
}
