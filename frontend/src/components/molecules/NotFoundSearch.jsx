import { Image } from 'antd'
import { SEARCH_NOT_FOUND } from '@/assets/images'

export default function NotFoundSearch({ message }) {
  return (
    <div className="w-full text-center mt-12">
      <h2>{message}</h2>
      <Image src={SEARCH_NOT_FOUND} preview={false} />
    </div>
  )
}
