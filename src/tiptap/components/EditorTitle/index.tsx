import React, { useRef, useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

import cls from '@/utils/cls';
import { Editor } from '@tiptap/react';
import { useEditorContext } from '@/tiptap/contexts/editorContext';

export interface IEditorTitleProps {
  className?: string;

}

const EditorTitle: React.FC<IEditorTitleProps> = (props) => {
  const { className } = props;
  const {editor} = useEditorContext()
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState<string>('this is title');

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
