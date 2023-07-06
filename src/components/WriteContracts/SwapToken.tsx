import { Button, Form, Input } from "antd";
import * as React from "react";
import { XYZCOIN_ADDRESS } from "../../constants/address";
import useSwapToken from "../../hooks/useSwapToken";
import { InputSwapToken } from "../../types";
import FormCustom from "../FormCustom";

export interface ISetCurrencyAndRateProps {}

export function SwapToken({}: ISetCurrencyAndRateProps) {
  const [inputData, setInputData] = React.useState<InputSwapToken>({
    token: XYZCOIN_ADDRESS,
    amountSender: 123,
  });
  const { data, error, isLoading, write } = useSwapToken(
    inputData.token,
    inputData.amountSender
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
    form.setFieldsValue({ token: XYZCOIN_ADDRESS, amountSender: 123 });
  };
  const fieldList = [
    { id: 1, name: "token", label: "Token" },
    { id: 2, name: "amountSender", label: "Amount Sender" },
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
      buttonLabel="Swap Token"
    />
  );
}
