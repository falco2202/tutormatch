import { Table, Space, Button } from 'antd';
import { t } from 'i18next';
import { useMemo } from 'react';

const SelectChildren = (props) => {
  const listChildren = useMemo(() => {
    const listChildrenAddKey = props.listChildren.map((item) => {
      return { ...item, key: item?.id }
    })

    return listChildrenAddKey
  }, [props.listChildren])

  const columns = [
    {
      title: t('full_name'),
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('date_of_birth'),
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleSelect(record.id)}>
            {t('classroom.add_classroom.classroom_register')}
          </Button>
        </Space>
      ),
    },
  ];

  const handleSelect = (id) => {
    props.callApiJoinClassroom(id)
  }

  return (
    <div className="flex justify-center p-10 flex-col">
      <Table columns={columns} dataSource={listChildren} pagination={false} />
    </div>
  )
}

export default SelectChildren;
