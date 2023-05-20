//TODO_BETA: tạo icon common địa điểm class trên bản đồ
import { BOOK_ICON } from '@/assets/icons'

const BookIconLocation = () => {
  return (
    <img
      src={BOOK_ICON}
      alt=""
      className="p-1 bg-[#fd6914] rounded-2xl border-[1px] border-solid border-[#fff] cursor-pointer"
      width={26}
      height={26}
    />
  )
}

export default BookIconLocation
