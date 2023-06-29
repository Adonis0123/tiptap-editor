import React, { useMemo } from 'react';
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from '@tiptap/react';

const DragIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 4H3V6H5V4ZM5 7H3V9H5V7ZM3 10H5V12H3V10ZM8 4H6V6H8V4ZM6 7H8V9H6V7ZM8 10H6V12H8V10ZM3 13H5V15H3V13ZM8 13H6V15H8V13ZM3 16H5V18H3V16ZM8 16H6V18H8V16Z"
        fill="#94A2AE"
      />
    </svg>
  );
};

export const DBlockNodeView: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  return (
    <NodeViewWrapper className="flex gap-1 group w-full relative">
      <section
        className="flex  w-4"
        contentEditable="false"
      >
        <div
          className="cursor-pointer opacity-0 group-hover:opacity-100"
          contentEditable={false}
          draggable
          data-drag-handle
        >
          <DragIcon className='w-3 h-[22px]'/>
        </div>
      </section>

      <NodeViewContent className={`node-view-content w-full`} />
    </NodeViewWrapper>
  );
};
