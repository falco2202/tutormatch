import { Button } from 'antd'

export default function Title({
  title,
  addButton = false,
  buttonName,
  onClickAddButton
}) {
  const handleClickAddButton = () => {
    onClickAddButton()
  }

  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      {addButton && (
        <Button type="primary" onClick={() => handleClickAddButton()}>
          {buttonName}
        </Button>
      )}
    </div>
  )
}
