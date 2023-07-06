import { Button, Form, FormInstance, Input } from "antd"
import * as React from "react"
import { FieldType, InputInitialize } from "../types"
import useInitialize from "../hooks/useInitialize"
import { WriteContractResult } from "@wagmi/core"

type FormProps = {
  inputData?: any
  setInputData?: React.Dispatch<React.SetStateAction<any>>
  data?: any
  error?: Error | null
  isLoading?: boolean
  isSuccess?: boolean
  write?: any
  isError?: boolean
  isPrepareError?: boolean
  prepareError?: boolean
  fieldList?: FieldType[]
  onFinish?: any
  onFill?: any
  onReset?: any
  buttonLabel: string
  form?: FormInstance<any>
}

export default function FormCustom({
  inputData,
  setInputData,
  error,
  isLoading,
  isSuccess,
  write,
  isError,
  isPrepareError,
  prepareError,
  onFill,
  onFinish,
  onReset,
  fieldList,
  data,
  buttonLabel,
  form,
}: FormProps) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }
  // const [form] = Form.useForm();
  console.log(data)
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      {fieldList?.map((filed) => (
        <Form.Item
          name={filed.name}
          label={filed.label}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      ))}

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      ></Form.Item>
      <Form.Item {...tailLayout}>
        <Button className="bg-blue-400" htmlType="submit">
          {buttonLabel}
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
      {data?.hash && (
        <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
          View your transaction
        </a>
      )}
      {data && isSuccess && data.map((x: any) => <p>{Number(x.result)}</p>)}
    </Form>
  )
}
