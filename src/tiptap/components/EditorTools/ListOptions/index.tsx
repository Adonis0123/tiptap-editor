import cls from '@/utils/cls';
import { Editor } from '@tiptap/react';
import React from 'react';
import { ToolIconItem } from '..';
import { Dropdown, type MenuProps } from 'antd';
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ListOrdered,
  List,
} from 'lucide-react';
import styles from '../index.module.scss';

export interface IListOptionsProps {
  className?: string;
  editor: Editor;
}

const ListOptions: React.FC<IListOptionsProps> = (props) => {
  const { className, editor } = props;

  const renderIcon = (Icon: typeof AlignLeftIcon) => {
    return <Icon className="w-5 h-5 cursor-pointer text-display" />;
  };

  const textAlignItems = [
    {
      key: 'left',
      label: renderIcon(AlignLeftIcon),
      isActive: () => editor.isActive({ textAlign: 'left' }),
      command: () => editor.chain().focus().setTextAlign('left').run(),
    },
    {
      key: 'center',
      label: renderIcon(AlignCenterIcon),
      isActive: () => editor.isActive({ textAlign: 'center' }),
      command: () => editor.chain().focus().setTextAlign('center').run(),
    },
    {
      key: 'right',
      label: renderIcon(AlignRightIcon),
      isActive: () => editor.isActive({ textAlign: 'right' }),
      command: () => editor.chain().focus().setTextAlign('right').run(),
    },
    {
      key: 'justify',
      label: renderIcon(AlignJustifyIcon),
      isActive: () => editor.isActive({ textAlign: 'justify' }),
      command: () => editor.chain().focus().setTextAlign('justify').run(),
    },
  ];

  const activeTextAlign =
    textAlignItems.filter((item) => item.isActive()).pop() ?? textAlignItems[0];

  const items: ToolIconItem[] = [
    {
      name: 'Bullet List',
      icon: List,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
      isDisabled: () => false,
    },
    {
      name: 'Numbered List',
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
      isDisabled: () => false,
    },
  ];
  return (
    <div
      className={cls`
      ${styles['list-warp']}
      ${className}
`}
    >
      <Dropdown
        menu={{
          items: textAlignItems.map((item) => ({
            label: item.label,
            key: item.key,
          })),
          selectedKeys: [activeTextAlign.key],
          selectable: true,
          onClick: (item) => {
            const key = item.key;
            const findItem = textAlignItems
              .filter((item) => item.key === key)
              .pop();
            findItem?.command();
            // item.command();
          },
        }}
        trigger={['click']}
      >
        {activeTextAlign.label}
      </Dropdown>
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

export default ListOptions;
