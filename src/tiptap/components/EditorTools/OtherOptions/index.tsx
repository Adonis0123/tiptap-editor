import cls from '@/utils/cls';
import { Editor } from '@tiptap/react';
import React from 'react';
import styles from '../index.module.scss';
import { Link2Icon } from 'lucide-react';
import AddLink from './AddLink';
import AddImage from './AddImage';
import { useEditorContext } from '@/tiptap/contexts/editorContext';

export interface IOtherOptionsProps {
  className?: string;
}

const OtherOptions: React.FC<IOtherOptionsProps> = (props) => {
  const { className } = props;

  const { editor } = useEditorContext();

  return (
    <div
      className={cls`
      ${styles['list-warp']}
      ${className}
`}
    >
      <AddLink editor={editor} />
      <AddImage editor={editor} />
    </div>
  );
};

export default OtherOptions;
