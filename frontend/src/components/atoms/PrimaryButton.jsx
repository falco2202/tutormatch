import { Button } from 'antd'

export default function PrimaryButton({ name, type, htmlType }) {
  return (
    <Button type={type} htmlType={htmlType} className="w-full">
      {name}
    </Button>
  )
}
