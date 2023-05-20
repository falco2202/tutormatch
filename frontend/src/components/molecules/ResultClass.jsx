import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Table } from 'antd';

//TODO_BETA
const ResultClass = (props) => {
  const { t } = useTranslation()
  const { dataResultClass } = useSelector((state) => state.fakeDataSlice)
  const columns = [
    {
      title: t('classroom.homework.fullName'),
      width: '40%',
      dataIndex: 'fullName'
    },
    {
      title: t('classroom.homework.score'),
      width: '20%',
      render: (_, record) => (
        <div>
          {`${record.score}/100`}
        </div>
      )
    }
  ];

  const handleClickDetailResult = (record) => {
    props.setDataDetailResult(record)
    props.onModalDetailResult(true)
    props.onModalResult(false)
  }

  return (
    <div>
      <div className="pr-10 pl-10 pt-5 space-y-3">
        <div className="flex">
          <Col span={4}>
            <strong>{t('classroom.homework.test')}</strong>
          </Col>
          <Col span={20}>
            {dataResultClass.title}
          </Col>
        </div>
        <div className="flex">
          <Col span={4}>
            <strong>{t('classroom.homework.subject')}</strong>
          </Col>
          <Col span={20}>
            {dataResultClass.subject}
          </Col>
        </div>
        <div className="flex">
          <Col span={4}>
            <strong>{t('classroom.homework.description')}</strong>
          </Col>
          <Col span={20}>
            {dataResultClass.description}
          </Col>
        </div>
      </div>
      <div className="p-10">
        <Table
          className="table-hover"
          dataSource={dataResultClass.students}
          columns={columns}
          pagination={dataResultClass.students.length > 10}
          onRow={(record) => {
            return {
              onClick: () => handleClickDetailResult(record)
            };
          }}
        />
      </div>
    </div>
  )
}

export default ResultClass;
