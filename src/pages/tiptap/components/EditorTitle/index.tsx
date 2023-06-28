import React, { useRef, useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

import cls from '@/pages/utils/cls';
import { Editor } from '@tiptap/react';

export interface IEditorTitleProps {
  className?: string;
  editor: Editor;
}

const EditorTitle: React.FC<IEditorTitleProps> = (props) => {
  const { className, editor } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (!editor) {
      return;
    }
    // 第一个模块聚焦
    editor.commands.focus('start');
  };

  return (
    <div className={cls`${className}`}>
      <TextArea
        onPressEnter={onPressEnter}
        ref={textAreaRef}
        maxLength={60}
        bordered={false}
        placeholder="Title"
        autoSize
        value={title}
        onChange={onChange}
        className={cls`
            w-full 
            text-4xl font-bold
            mb-8
            p-0
            placeholder:font-normal
            text-[#375375]
            placeholder:text-[#94a2ae]
            resize-none
          `}
      />
    </div>
  );
};

export default EditorTitle;