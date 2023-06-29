import Modal from '@/components/antd/Modal';
import cls from '@/utils/cls';
import { Editor } from '@tiptap/react';
import { Input } from 'antd';
import { Link2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export interface IAddLinkProps {
  className?: string;
  editor: Editor;
}

const AddLink: React.FC<IAddLinkProps> = (props) => {
  const { className, editor } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const onOpenLinkModal = () => {
    setOpen(true);
    const href = editor.getAttributes('link').href;
    if (href) {
      setLink(href);
    }
  };

  const onCloseModal = () => {
    setLink('');
    setErrMsg('');
    setOpen(false);
  };


  const onValidateLink = () => {
    if (!link) {
      setErrMsg('');
      return true;
    }
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
    if (link === null) {
      return;
    }

    // empty
    if (link === '') {
      editor.chain().extendMarkRange('link').unsetLink().run();
      onCloseModal();
      return;
    }
    // update link
    editor.chain().extendMarkRange('link').setLink({ href: link }).run();
    onCloseModal();
  };

  return (
    <>
      <button
        onClick={onOpenLinkModal}
        disabled={
          !editor
            .can()
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: '' })
            .run()
        }
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
    </>
  );
};

export default AddLink;
