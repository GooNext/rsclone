import { Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

interface ModalTypes {
  onChange: any;
  visible: boolean;
  onOk: () => any;
  onCancel: () => any;
  title: string;
  options: Array<any>;
}

const ModalWindow = ({
  title,
  onChange: { inputChange, selectChange },
  visible,
  onOk,
  onCancel,
  options,
}: ModalTypes) => {
  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Input onChange={(e) => inputChange(e)} placeholder={useTranslation().t('Enter title')} />
      {options.length ? (
        <Select
          showSearch
          style={{ width: '100%', marginTop: '15px' }}
          placeholder="Select a board"
          optionFilterProp="children"
          onChange={selectChange}
          filterOption={(input: any, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {options.map((item) => {
            return <Option value={item._id}>{item.title}</Option>;
          })}
        </Select>
      ) : null}
    </Modal>
  );
};

export default ModalWindow;
