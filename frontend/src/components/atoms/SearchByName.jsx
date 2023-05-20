import { Input } from 'antd';
import { useTranslation } from 'react-i18next';

const { Search } = Input;

const SearchByName = (props) => {
  const { t } = useTranslation()
  return (
    <div>
      <Search
        className="w-full"
        placeholder={t('common.placeholder.input_class_name_text')}
        enterButton
        defaultValue={props.defaultValue}
        onSearch={props.handleSearch}
      />
    </div>
  )
}

export default SearchByName
