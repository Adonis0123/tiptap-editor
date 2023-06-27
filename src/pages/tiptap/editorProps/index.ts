import cls from '@/pages/utils/cls';
import { EditorProps } from '@tiptap/pm/view';

export const TiptapEditorProps: EditorProps = {
  attributes: {
    class: cls`text-[#677788] focus:outline-none `,
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      // prevent default event listeners from firing when slash command is active
      if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
        const slashCommand = document.querySelector("#slash-command");
        if (slashCommand) {
          return true;
        }
      }
    },
  },
  handlePaste: (view, event) => {
    return false;
  },
  handleDrop: (view, event, _slice, moved) => {
    return false;
  },
};
