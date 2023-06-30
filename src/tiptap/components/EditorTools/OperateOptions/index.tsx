import cls from '@/utils/cls';
import React from 'react';
import styles from '../index.module.scss';
import { Editor } from '@tiptap/react';
import { ToolIconItem } from '..';
import { Redo, UndoIcon } from 'lucide-react';
import { useEditorContext } from '@/tiptap/contexts/editorContext';

export interface IOperateOptionsProps {
  className?: string;
}

const OperateOptions: React.FC<IOperateOptionsProps> = (props) => {
  const { className } = props;
  const { editor } = useEditorContext();
  const items: ToolIconItem[] = [
    {
      name: 'undo',
      isActive: () => false,
      isDisabled: () => !editor.can().chain().focus().undo().run(),
      command: () => editor.chain().focus().undo().run(),
      icon: UndoIcon,
    },
    {
      name: 'redo',
      isActive: () => false,
      isDisabled: () => !editor.can().chain().focus().redo().run(),
      command: () => editor.chain().focus().redo().run(),
      icon: Redo,
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

export default OperateOptions;
