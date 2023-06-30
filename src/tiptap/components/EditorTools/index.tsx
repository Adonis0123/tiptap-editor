import cls from '@/utils/cls';
import { Editor } from '@tiptap/react';
import React from 'react';
import HeadingOptions from './HeadingOptions';
import { BoldIcon } from 'lucide-react';
import TextOptions from './TextOptions';
import ListOptions from './ListOptions';
import OperateOptions from './OperateOptions';
import OtherOptions from './OtherOptions';

export interface IEditorToolsProps {
  className?: string;
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
  const { className } = props;

  return (
    <div
      className={cls`
      mb-2
      flex space-x-2 items-center flex-wrap
      ${className}
  `}
    >
      <HeadingOptions />
      <Interval />
      <TextOptions />
      <Interval />
      <ListOptions />
      <Interval />
      <OtherOptions />
      <Interval />
      <OperateOptions />
    </div>
  );
};

export default EditorTools;
