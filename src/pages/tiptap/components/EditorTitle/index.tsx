import React, { useRef, useState } from 'react';


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

  return (
    <div className={cls`${className}`}>
      <textarea
        ref={textAreaRef}
        maxLength={200}
        placeholder="Title"
        value={title}
        onChange={onChange}
        className={cls`
            focus:outline-none
            w-full h-[44px]
            text-4xl font-bold
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
