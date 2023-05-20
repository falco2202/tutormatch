import { Button, Table } from 'antd'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { compareTime } from '@/utils/helper'
import dayjs from 'dayjs'
import { DATE_TIME } from '@/constants/defaultValue'
import { TIME_CHECK } from '@/constants/timeCheck'

//TODO_BETA
const HomeworkTable = (props) => {
  const { t } = useTranslation()
  const { listHomeworks } = useSelector((state) => state.fakeDataSlice)
  const columns = [
    {
      title: t('classroom.homework.test'),
      width: '40%',
      render: (_, record) => <div>{record.title}</div>
    },
    {
      title: t('classroom.homework.time_start'),
      dataIndex: 'timeStart',
      width: '20%'
    },
    {
      title: t('classroom.homework.time_end'),
      dataIndex: 'timeEnd',
      width: '20%'
    },
    {
      render: (_, record) => (
        <div className="w-full flex justify-end">
          <div className="mr-10 w-[100px] flex justify-center">
            {compareTime(
              record.timeStart,
              record.timeEnd,
              dayjs().format(DATE_TIME)
            ) === TIME_CHECK.BEFORE ? (
              <div className="text-red-400">
                {t('classroom.homework.not-yet')}
              </div>
            ) : compareTime(
                record.timeStart,
                record.timeEnd,
                dayjs().format(DATE_TIME)
              ) === TIME_CHECK.BETWEEN ? (
              <div className="text-yellow-400">
                {t('classroom.homework.processing')}
              </div>
            ) : (
              <div>
                <Button type="primary" onClick={handleClickResult}>
                  {t('classroom.homework.result')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )
    }
  ]

  const handleClickResult = () => {
    props.onModalResult(true)
  }

  return (
    <div>
      <div>
        <Table
          dataSource={listHomeworks}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default HomeworkTable
