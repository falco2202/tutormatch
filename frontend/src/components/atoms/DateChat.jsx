import { Typography } from 'antd'

export default function DateChat({ item }) {
  return (
    <div className="flex justify-center">
      <Typography.Text>{item.date}</Typography.Text>
    </div>
  )
}
