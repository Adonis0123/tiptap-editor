import React from 'react';
import cls from '../utils/cls';

export interface IEditorProps {}

const Editor: React.FC<IEditorProps> = (props) => {
  return (
    <>
      <div
        style={{
          boxShadow: '0px 4px 9px rgba(11, 45, 96, 0.16)',
        }}
        className={cls`
        bg-white
        w-full h-full 
        rounded-lg
        overflow-y-auto
        `}
      >
        123
      </div>
    </>
  );
};

export default Editor;
