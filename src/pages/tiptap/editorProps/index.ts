import cls from '@/pages/utils/cls';
import { EditorProps } from '@tiptap/pm/view';

export const TiptapEditorProps: EditorProps = {
  attributes: {
    class: cls`text-[#677788] focus:outline-none`,
  },
  
  handlePaste: (view, event) => {
    return false;
  },
  handleDrop: (view, event, _slice, moved) => {
    return false;
  },
};
