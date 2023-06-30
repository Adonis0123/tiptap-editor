import React, { useMemo } from 'react';

import { ToolItem } from '..';
import { Editor } from '@tiptap/react';
import { Select } from 'antd';
import { useEditorContext } from '@/tiptap/contexts/editorContext';

export interface IHeadingOptionsProps {
  className?: string;
}

const HeadingOptions: React.FC<IHeadingOptionsProps> = (props) => {
  const { className } = props;
  const { editor } = useEditorContext();
  const options: ToolItem[] = [
    {
      name: 'Text',
      command: () =>
        editor.chain().focus().toggleNode('paragraph', 'paragraph').run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive('paragraph') &&
        !editor.isActive('bulletList') &&
        !editor.isActive('orderedList'),
    },
    {
      name: 'Heading 1',
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      name: 'Heading 2',
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      name: 'Heading 3',
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
  ];

  const handleChange = (name: string) => {
    const { command } = options.find((item) => item.name === name)!;
    command();
  };

  const activeValue =
    options.filter((item) => item.isActive()).pop() ?? options[0];

  return (
    <>
      <Select
        className="w-[160px]"
        value={activeValue.name}
        onChange={handleChange}
      >
        {options.map((item) => {
          return (
            <Select.Option value={item.name} key={item.name}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
};

export default HeadingOptions;
