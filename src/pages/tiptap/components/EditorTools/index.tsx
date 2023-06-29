import cls from '@/pages/utils/cls';
import { Editor } from '@tiptap/react';
import React from 'react';
import HeadingOptions from './HeadingOptions';
import { BoldIcon } from 'lucide-react';
import TextOptions from './TextOptions';
import ListOptions from './ListOptions';
import OperateOptions from './OperateOptions';

export interface IEditorToolsProps {
  className?: string;
  editor: Editor;
}

export interface ToolItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
}

export interface ToolIconItem extends ToolItem {
  icon: typeof BoldIcon;
  isDisabled: () => boolean;
}

const Interval = () => {
  return <div className={cls`h-5 w-[1px] bg-display-tertiary`} />;
};

const EditorTools: React.FC<IEditorToolsProps> = (props) => {
  const { className, editor } = props;

  return (
    <div
      className={cls`
      mb-2
      flex space-x-2 items-center flex-wrap
      ${className}
  `}
    >
      <HeadingOptions editor={editor} />
      <Interval />
      <TextOptions editor={editor} />
      <Interval />
      <ListOptions editor={editor} />
      <Interval />
      <OperateOptions editor={editor} />
    </div>
  );
};

export default EditorTools;
