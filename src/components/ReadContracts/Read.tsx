import * as React from "react"
import abi from "../../contracts/abi/TokenSwap.json"
import { TOKENSWAP_ADDRESS, XYZCOIN_ADDRESS } from "../../constants/address"
import { useContractRead } from "wagmi"
import useReadRate from "../../hooks/useReadRate"
import FormCustom from "../FormCustom"
import { InputReadRate } from "../../types"
import { Form } from "antd"
export interface IReadProps {}

export function Read(props: IReadProps) {
  const [inputData, setInputData] = React.useState<any>({})
  const { data, isSuccess } = useReadRate(inputData.currency)
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log(values)
    setInputData(values)
  }
  const onReset = () => {
    form.resetFields()
  }
  const onFill = () => {
    form.setFieldsValue({
      currency: XYZCOIN_ADDRESS,
    })
  }
  const fieldList = [{ id: 1, name: "currency", label: "Currency" }]
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
  )
}
