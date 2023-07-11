import { Form } from "antd";
import * as React from "react";
import { XYZCOIN_ADDRESS } from "../../constants/address";
import useSwapToken from "../../hooks/useSwapToken";
import FormCustom from "../FormCustom";

export function SwapToken() {
  const [inputData, setInputData] = React.useState<any>({});
  const { data, error, isLoading, write } = useSwapToken(inputData.token, inputData.amountSender);
  const [formSwap] = Form.useForm();
  const onFinish = (values: any) => {
    setInputData(values);
    write?.();
  };
  const onReset = () => {
    formSwap.resetFields();
  };
  const onFill = () => {
    formSwap.setFieldsValue({ token: XYZCOIN_ADDRESS, amountSender: 123 });
  };
  const fieldList = [
    { id: 1, name: "token", label: "Token" },
    { id: 2, name: "amountSender", label: "Amount Sender" },
  ];
  return (
    <FormCustom
      form={formSwap}
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
