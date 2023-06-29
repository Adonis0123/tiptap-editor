import cls from '@/pages/utils/cls';
import { Editor } from '@tiptap/react';
import React from 'react';
import styles from '../index.module.scss';
import { Link2Icon } from 'lucide-react';
import AddLink from './AddLink';
import AddImage from './AddImage';

export interface IOtherOptionsProps {
  className?: string;
  editor: Editor;
}

const OtherOptions: React.FC<IOtherOptionsProps> = (props) => {
  const { className, editor } = props;

  return (
    <div
      className={cls`
      ${styles['list-warp']}
      ${className}
`}
    >
      <AddLink editor={editor}/>
      <AddImage editor={editor}/>
    </div>
  );
};

export default OtherOptions;
