import { Table, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compareTime } from '@/utils/helper';
import dayjs from 'dayjs';
import { DATE_TIME } from '@/constants/defaultValue';
import { TIME_CHECK } from '@/constants/timeCheck';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from 'antd';
import DetailTestStudent from '../molecules/DetailTestStudent';

//TODO_BETA
const TestsTableOrg = () => {
  const { t } = useTranslation()
  const { listHomeworks } = useSelector((state) => state.fakeDataSlice)
  const navigate = useNavigate()
  const [isModalDetailTestStudent, setIsModalDetailTestStudent] = useState(false)
  const [dataTest, setDataTest] = useState({})
  const columns = [
    {
      title: t('classroom.homework.test'),
      width: '40%',
      render: (_, record) => (
        <div>
          {record.title}
        </div>
      )
    },
    {
      title: t('classroom.homework.subject'),
      dataIndex: 'subject',
      width: '10%'
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
            {compareTime(record.timeStart, record.timeEnd, dayjs().format(DATE_TIME)) === TIME_CHECK.BEFORE
              ? (
                <div className="text-red-400">{t('classroom.homework.not-yet')}</div>
              ) : (
                <div>
                  {record.status
                    ? (
                      <div>
                        <Button onClick={() => handleDetailTestStudent(record)}>
                          {t('classroom.homework.result')}
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          type="primary"
                          onClick={() => handleTakeTheTest(record.id)}>
                          {t('tests.do_it')}
                        </Button>
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      )
    }
  ];

  const handleTakeTheTest = (id) => {
    navigate(`/take-test/${id}`)
  }

  const handleModalDetailTestStudent = (status) => {
    setIsModalDetailTestStudent(status)
  }

  const handleDetailTestStudent = (record) => {
    setDataTest(record)
    handleModalDetailTestStudent(true)
  }

  return (
    <div>
      <div>
        <Table
          dataSource={listHomeworks}
          columns={columns}
        />
      </div>
      <Modal
        open={isModalDetailTestStudent}
        onCancel={() => handleModalDetailTestStudent(false)}
        footer={null}
        destroyOnClose
        width={700}>
        <DetailTestStudent dataTest={dataTest} />
      </Modal>
    </div>
  )
}

export default TestsTableOrg;
