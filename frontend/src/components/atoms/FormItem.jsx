import { useMemo } from 'react'
import { Form, Input, Select, Radio, DatePicker } from 'antd'
import { DATE_FORMAT, INPUT_TYPES } from '@/constants/common'
import dayjs from 'dayjs'

const FormItem = ({
  className = '',
  name,
  rules = [],
  label,
  labelCol = { span: 4 },
  labelAlign = 'left',
  colon = true,
  inputType = 'input',
  options = [],
  placeholder = null,
  format = DATE_FORMAT.DATE_MONTH_YEAR,
  autoSize = { minRows: 3, maxRows: 5 },
  requireAge = 0,
  disabled = false,
  defaultValue,
  showSearch,
  filterOption = false
}) => {
  const { Item } = Form
  const { TextArea, Password } = Input
  // TODO
  // select options: Array<{label: String, value: Any}>
  // radio options: Array<{label: String, value: String, disabled?: Boolean}>

  const disabledDate = (current) => {
    // customDisabledDate explain the youngest teacher: 18 years old

    return current && current > dayjs().subtract(requireAge, 'y').startOf('y')
  }

  const inputTypeMemo = useMemo(() => {
    switch (inputType) {
      case INPUT_TYPES.TEXT_AREA:
        return <TextArea placeholder={placeholder} autoSize={autoSize} />
      case INPUT_TYPES.SELECT:
        return (
          <Select
            placeholder={placeholder}
            options={options}
            disabled={disabled}
            defaultValue={defaultValue}
            showSearch={showSearch}
            filterOption={filterOption}
          />
        )
      case INPUT_TYPES.RADIO:
        return <Radio.Group options={options} />
      case INPUT_TYPES.DATE_PICKER:
        return (
          <DatePicker
            inputReadOnly
            className="w-full"
            format={format}
            placeholder={placeholder}
            disabledDate={disabledDate}
            defaultPickerValue={dayjs().subtract(requireAge, 'y')}
            showToday={false}
          />
        )
      case INPUT_TYPES.INPUT:
        return <Input placeholder={placeholder} />
      case INPUT_TYPES.PASSWORD:
        return <Password placeholder={placeholder} />
      default:
        return null
    }
  }, [inputType, options])

  return (
    <Item
      className={className}
      label={<span className="font-bold">{label}</span>}
      name={name}
      rules={rules}
      colon={colon}
      labelCol={labelCol}
      labelAlign={labelAlign}
    >
      {inputTypeMemo}
    </Item>
  )
}

export default FormItem
