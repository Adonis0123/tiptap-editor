import { BubbleMenu, BubbleMenuProps, isTextSelection } from '@tiptap/react';
import { FC, useState } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from 'lucide-react';
import cls from '@/utils/cls';
import { NodeSelector } from '../NodeSelector';

/* https://tiptap.dev/api/extensions/bubble-menu */

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => props.editor.isActive('bold'),
      command: () => props.editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => props.editor.isActive('italic'),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => props.editor.isActive('underline'),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: () => props.editor.isActive('strike'),
      command: () => props.editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
  ];
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  // const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor, view, state, from, to }) => {
      const { doc, selection } = state;
      const { empty } = selection;
      // don't show if image is selected
      if (editor.isActive('image')) {
        return false;
      }
      // Sometime check for `empty` is not enough.
      // Doubleclick an empty paragraph returns a node size of 2.
      // So we check also for an empty text size.
      const isEmptyTextBlock =
        !doc.textBetween(from, to).length && isTextSelection(state.selection);

     
      return !(!view.hasFocus() || empty || isEmptyTextBlock)
    },

    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      duration: 200,
      animation: 'shift-toward-subtle',
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        // setIsColorSelectorOpen(false);
      },
    },
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className={cls`
      overflow-hidden
      rounded
      border border-stone-200
      bg-white shadow-xl
      flex    
      `}
    >
      <NodeSelector
        editor={props.editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          // setIsColorSelectorOpen(false);
        }}
      />

      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.command}
          className="p-2 text-[#375375] hover:bg-stone-100 active:bg-stone-200"
        >
          <item.icon
            className={cls`
            h-4 w-4 
            ${{
              'text-[#3A7EFF]': item.isActive(),
            }}
            `}
          />
        </button>
      ))}
      {/* <ColorSelector
        editor={props.editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
        }}
      /> */}
    </BubbleMenu>
  );
};
