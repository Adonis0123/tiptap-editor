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
import { useEditorContext } from '@/tiptap/contexts/editorContext';

/* https://tiptap.dev/api/extensions/bubble-menu */

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children' | 'editor'>;

/* https://tiptap.dev/api/extensions/bubble-menu */
// This extension will make a contextual menu appear near a selection of text. Use it to let users apply marks to their text selection.

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const { editor } = useEditorContext();
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => editor.isActive('bold'),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => editor.isActive('italic'),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => editor.isActive('underline'),
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: () => editor.isActive('strike'),
      command: () => editor.chain().focus().toggleStrike().run(),
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

      return !(!view.hasFocus() || empty || isEmptyTextBlock);
    },

    tippyOptions: {
      maxWidth: '500px',
      moveTransition: 'transform 0.15s ease-out',
      duration: 200,
      animation: 'shift-toward-subtle',
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        // setIsColorSelectorOpen(false);
      },
    },
  };

  const onReplaceSelection = () => {};

  /* https://tiptap.dev/api/commands#chain-commands */
  const onInsertBelow = () => {
    console.log(editor.state.selection.from, 'from');
    console.log(editor.state.selection.to, 'to');
    editor.commands.insertContent('插入标题', {
      parseOptions: {
        preserveWhitespace: 'full',
      },
    });
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      editor={editor}
      className={cls`
      overflow-hidden
      rounded
      border border-stone-200
      bg-white shadow-xl
      flex gap-x-1
      `}
    >
      <NodeSelector
        editor={editor}
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

      <button onClick={onReplaceSelection}>replace selection</button>
      <button onClick={onInsertBelow}>insert below</button>

      {/* <ColorSelector
        editor={editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
        }}
      /> */}
    </BubbleMenu>
  );
};
