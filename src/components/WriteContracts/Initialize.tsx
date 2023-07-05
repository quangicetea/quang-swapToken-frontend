import { Button, Form, Input } from "antd"
import * as React from "react"
import {
  ABCCOIN_ADDRESS,
  USER1_ADDRESS,
  USER2_ADDRESS,
  XYZCOIN_ADDRESS,
} from "../../constants/address"
import useInitialize from "../../hooks/useInitialize"
import { InputInitialize } from "../../types"

export interface ISetCurrencyAndRateProps {}

export function Initialize({}: ISetCurrencyAndRateProps) {
  const [inputData, setInputData] = React.useState<InputInitialize>({
    mainToken: ABCCOIN_ADDRESS,
    swappedCurrency: XYZCOIN_ADDRESS,
    swappedRate: 150,
    swappedCurrencyDecimals: 2,
    _receiver: USER2_ADDRESS,
    _sender: USER1_ADDRESS,
  })
  const {
    data,
    error,
    isLoading,
    isSuccess,
    write,
    isError,
    isPrepareError,
    prepareError,
  } = useInitialize(
    inputData.mainToken,
    inputData.swappedCurrency,
    inputData.swappedRate,
    inputData.swappedCurrencyDecimals,
    inputData._receiver,
    inputData._sender
  )
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    setInputData(values)
    write?.()
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFill = () => {
    form.setFieldsValue({
      mainToken: ABCCOIN_ADDRESS,
      swappedCurrency: XYZCOIN_ADDRESS,
      swappedRate: 150,
      swappedCurrencyDecimals: 2,
      _receiver: USER2_ADDRESS,
      _sender: USER1_ADDRESS,
    })
  }
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
  ]
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      {fieldList.map((filed) => (
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
          Initialize
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
    </Form>
  )
}
