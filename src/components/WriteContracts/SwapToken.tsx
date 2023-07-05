import { Button, Form, Input } from "antd"
import * as React from "react"
import { XYZCOIN_ADDRESS } from "../../constants/address"
import useSwapToken from "../../hooks/useSwapToken"
import { InputSwapToken } from "../../types"

export interface ISetCurrencyAndRateProps {}

export function SwapToken({}: ISetCurrencyAndRateProps) {
  const [inputData, setInputData] = React.useState<InputSwapToken>({
    token: XYZCOIN_ADDRESS,
    amountSender: 123,
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
  } = useSwapToken(inputData.token, inputData.amountSender)
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
    form.setFieldsValue({ token: XYZCOIN_ADDRESS, amountSender: 123 })
  }
  const fieldList = [
    { id: 1, name: "token", label: "Token" },
    { id: 2, name: "amountSender", label: "Amount Sender" },
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
          Swap Token
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
