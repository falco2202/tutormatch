import { Space, Typography, Select } from 'antd'

export default function OptionSelect({ value, handleChange, label, options }) {
  return (
    <Space>
      <Typography.Text>{label}</Typography.Text>
      <Select
        className="w-[8rem]"
        value={value}
        options={options}
        onChange={handleChange}
      />
    </Space>
  )
}
