import { Form } from "antd";
import * as React from "react";
import { XYZCOIN_ADDRESS } from "../../constants/address";
import useReadDecimals from "../../hooks/useReadDecimals";
import FormCustomRead from "../FormCustomRead";

export function ReadDecimals() {
  const [inputData, setInputData] = React.useState<any>({});
  const { data, isSuccess } = useReadDecimals(inputData.currency);
  const [formReadDecimals] = Form.useForm();
  const onFinish = (values: any) => {
    setInputData(values);
  };
  const onReset = () => {
    formReadDecimals.resetFields();
  };
  const onFill = () => {
    formReadDecimals.setFieldsValue({
      currency: XYZCOIN_ADDRESS,
    });
  };
  const fieldList = [{ id: 1, name: "currency", label: "Currency" }];
  return (
    <FormCustomRead
      data={data}
      isSuccess={isSuccess}
      form={formReadDecimals}
      onFill={onFill}
      onFinish={onFinish}
      onReset={onReset}
      fieldList={fieldList}
      inputData={inputData}
      buttonLabel="Read Decimals"
    />
  );
}
