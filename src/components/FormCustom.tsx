import { Button, Form, FormInstance, Input } from "antd";
import * as React from "react";
import { FieldType } from "../types";

type FormProps = {
  inputData?: any;
  setInputData?: React.Dispatch<React.SetStateAction<any>>;
  data?: any[] | any;
  error?: Error | null;
  isLoading?: boolean;
  isSuccess?: boolean;
  write?: any;
  isError?: boolean;
  isPrepareError?: boolean;
  prepareError?: boolean;
  fieldList?: FieldType[];
  onFinish?: any;
  onFill?: any;
  onReset?: any;
  buttonLabel: string;
  form?: FormInstance<any>;
};

export default function FormCustom({
  onFill,
  onFinish,
  isLoading,
  onReset,
  fieldList,
  data,
  buttonLabel,
  form,
}: FormProps) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  return (
    <Form
      {...layout}
      form={form}
      name={buttonLabel}
      onFinish={onFinish}
      style={{ maxWidth: 600, minWidth: 500 }}
    >
      {fieldList?.map((filed) => (
        <Form.Item
          key={filed.name}
          name={filed.name}
          label={filed.label}
          rules={[{ required: true }]}
          style={{ minWidth: 500 }}
        >
          <Input />
        </Form.Item>
      ))}

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        style={{ minWidth: 500 }}
      ></Form.Item>
      <Form.Item {...tailLayout}>
        <Button className="mx-1 text-white bg-blue-600" htmlType="submit" disabled={isLoading}>
          {buttonLabel}
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" className="" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
      {data && data?.hash && (
        <div className="flex justify-center w-full">
          <a
            className="p-2 text-white bg-red-400 border rounded-lg"
            target="_blank"
            href={`https://goerli.etherscan.io/tx/${data?.hash}`}
          >
            View your transaction
          </a>
        </div>
      )}
    </Form>
  );
}
