import { Button, Form, Input } from "antd"
import * as React from "react"
import { XYZCOIN_ADDRESS } from "../../constants/address"
import useSetSwappedCurrencyRateAndDecimals from "../../hooks/useSetSwappedCurrencyRateAndDecimals"
import { InputSetCurrencyAndRate } from "../../types"

export interface ISetCurrencyAndRateProps {}

export function SetCurrencyAndRate({}: ISetCurrencyAndRateProps) {
  const [inputData, setInputData] = React.useState<InputSetCurrencyAndRate>({
    currency: XYZCOIN_ADDRESS,
    rate: 123,
    decimals: 2,
  })
  const { data, write } = useSetSwappedCurrencyRateAndDecimals(
    inputData.currency,
    inputData.rate,
    inputData.decimals
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
    form.setFieldsValue({ currency: XYZCOIN_ADDRESS, rate: 123, decimals: 2 })
  }
  const fieldList = [
    { id: 1, name: "currency", label: "Currency" },
    { id: 2, name: "rate", label: "Rate" },
    { id: 3, name: "decimals", label: "Decimals" },
  ]
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      {fieldList.map((field) => (
        <Form.Item
          key={field.id}
          name={field.name}
          label={field.label}
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
          Set currency and rate
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
