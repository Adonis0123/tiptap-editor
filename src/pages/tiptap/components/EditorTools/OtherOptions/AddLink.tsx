import Modal from '@/pages/components/antd/Modal';
import cls from '@/pages/utils/cls';
import { Editor } from '@tiptap/react';
import { Link2Icon } from 'lucide-react';
import React from 'react';

export interface IAddLinkProps {
  className?: string;
  editor: Editor;
}

const AddLink: React.FC<IAddLinkProps> = (props) => {
  const { className, editor } = props;

  const [openModal, setOpenModal] = React.useState(false);

  const onOpenLinkModal = () => {};

  return (
    <>
      <button
        className={cls`
      cursor-pointer
      px-1 h-full w-8 flex items-center justify-center
      `}
      >
        <Link2Icon
          className={cls`
        h-5 w-5 
        ${editor.isActive('link') ? 'text-primary' : 'text-display'}
      `}
        />
      </button>
      <Modal>
          123
      </Modal>
    </>
  );
};

export default AddLink;
