import { Form } from 'antd';
import * as React from 'react';
import { XYZCOIN_ADDRESS } from '../../constants/address';
import useReadRate from '../../hooks/useReadRate';
import FormCustom from '../FormCustom';

export function ReadRate() {
  const [inputData, setInputData] = React.useState<any>({});
  const { data, isSuccess } = useReadRate(inputData.currency);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    setInputData(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      currency: XYZCOIN_ADDRESS
    });
  };
  const fieldList = [{ id: 1, name: 'currency', label: 'Currency' }];
  return (
    <FormCustom
      data={data}
      isSuccess={isSuccess}
      form={form}
      onFill={onFill}
      onFinish={onFinish}
      onReset={onReset}
      fieldList={fieldList}
      inputData={inputData}
      buttonLabel="Initialize"
    />
  );
}
