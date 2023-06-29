import cls from '@/utils/cls';
import React from 'react';
import { ToolIconItem } from '..';
import { Editor } from '@tiptap/react';
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  RemoveFormatting,
  UnderlineIcon,
} from 'lucide-react';
import styles from '../index.module.scss';

export interface ITextOptionsProps {
  className?: string;
  editor: Editor;
}

const TextOptions: React.FC<ITextOptionsProps> = (props) => {
  const { className, editor } = props;
  const items: ToolIconItem[] = [
    {
      name: 'bold',
      isActive: () => editor.isActive('bold'),
      isDisabled: () => !editor.can().chain().focus().toggleBold().run(),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => editor.isActive('italic'),
      command: () => editor.chain().focus().toggleItalic().run(),
      isDisabled: () => !editor.can().chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => editor.isActive('underline'),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      isDisabled: () => !editor.can().chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'code',
      isActive: () => editor.isActive('code'),
      command: () => editor.chain().focus().toggleCode().run(),
      isDisabled: () => !editor.can().chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
    {
      name: 'clear marks',
      command: () => editor.chain().focus().unsetAllMarks().run(),
      isActive: () => false,
      isDisabled: () => !editor.can().chain().focus().unsetAllMarks().run(),
      icon: RemoveFormatting,
    },
  ];

  return (
    <div
      className={cls`
      ${styles['list-warp']}
      ${className}
    `}
    >
      {items.map((item) => {
        return (
          <button
            disabled={item.isDisabled()}
            className={cls`
            cursor-pointer
            px-1 h-full w-8 flex items-center justify-center

          `}
            key={item.name}
            onClick={() => {
              item.command();
            }}
          >
            <item.icon
              className={cls`
              h-5 w-5 
              ${item.isActive() ? 'text-primary' : 'text-display'}
            `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default TextOptions;
