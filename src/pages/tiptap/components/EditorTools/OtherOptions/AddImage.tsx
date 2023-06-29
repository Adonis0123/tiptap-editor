import Modal from '@/pages/components/antd/Modal';
import cls from '@/pages/utils/cls';
import { Editor } from '@tiptap/react';
import { Input } from 'antd';
import { ImageIcon } from 'lucide-react';
import React, { useState } from 'react';

export interface IAddImageProps {
  className?: string;
  editor: Editor;
}

const AddImage: React.FC<IAddImageProps> = (props) => {
  const { className, editor } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>(
    'https://hix.ai/cdn/public/images/for-freelancers.jpg'
  );
  const [errMsg, setErrMsg] = useState<string>('');

  const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const onOpenLinkModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setLink('');
    setErrMsg('');
    setOpen(false);
  };

  const onValidateLink = () => {
    const isOk = /^https?:\/\//.test(link);
    if (!isOk) {
      setErrMsg('link is not valid.');
      return false;
    }
    setErrMsg('');
    return true;
  };

  const onOk = () => {
    const isOk = onValidateLink();
    if (!isOk) {
      return;
    }

    // set img link
    editor.chain().focus().setImage({ src: link }).run();
    onCloseModal();
  };

  return (
    <button
      onClick={onOpenLinkModal}
      disabled={!editor.can().chain().focus().setImage({ src: '' }).run()}
      className={cls`
      cursor-pointer
      px-1 h-full w-8 flex items-center justify-center
`}
    >
      <ImageIcon
        className={cls`
        h-5 w-5 
        ${editor.isActive('link') ? 'text-primary' : 'text-display'}
        `}
      />
      <Modal
        onCancel={() => {
          onCloseModal();
        }}
        destroyOnClose
        open={open}
        onOk={onOk}
      >
        <div className="px-6 pt-6 pb-4 min-[100px]">
          <Input
            placeholder="enter a link"
            onChange={onChangeLink}
            onBlur={() => {
              onValidateLink();
            }}
            value={link}
            type="text"
            className="mb-1"
          />
          <span className="text-sm text-[#F77062]">{errMsg}</span>
        </div>
      </Modal>
    </button>
  );
};

export default AddImage;
