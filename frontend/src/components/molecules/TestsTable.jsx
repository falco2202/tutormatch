import { deleteTest } from '@/redux/reducers/fakeDataReducers';
import { Table, Button, Modal } from 'antd';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch } from 'react-redux';


//TODO_BETA
const TestsTable = (props) => {
  const { t } = useTranslation()
  const { confirm } = Modal
  const dispatch = useDispatch()
  const columns = [
    {
      title: t('exercise.tests'),
      width: '50%',
      render: (_, record) => (
        <div>
          {record.title}
        </div>
      )
    },
    {
      title: t('exercise.subject'),
      width: '20%',
      render: (_, record) => (
        <div>
          {record.subject}
        </div>
      )
    },
    {
      render: (_, record) => (
        <div className="w-full flex justify-end">
          <Button
            className="w-[6rem] mr-5"
            danger
            type="primary"
            onClick={(e) => {
              e.stopPropagation()
              deleteTestsRequest(record)
            }}>
            {t('common.button.delete')}
          </Button>
        </div>
      )
    }
  ];

  const handleClickDetailTests = (record) => {
    props.setDataTestDetail(record)
    props.onModalDetailTest(true)
  }

  const handleDelete = (id) => {
    dispatch(deleteTest(id))
  }

  const deleteTestsRequest = (record) => {
    return confirm({
      title: t('exercise.test_delete'),
      content: (
        <Trans i18nkey="exercise.test_delete_modal_confirm">
          {t('exercise.test_delete_modal_confirm', {
            test: record.title
          })}
        </Trans>
      ),
      onOk() {
        handleDelete(record.id)
      },
      okText: t('common.button.ok'),
      cancelText: t('common.button.cancel')
    })
  }

  return (
    <div>
      <Table
        className="table-hover"
        dataSource={props.listTests}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => handleClickDetailTests(record)
          };
        }}
      />
    </div>
  )
}

export default TestsTable;
