import { useEditor } from '@tiptap/react';
import Tiptap from '../tiptap';
import { TiptapExtensions } from '@/tiptap/extensions';
import { TiptapEditorProps } from '@/tiptap/editorProps';
import { EditorProvider } from '@/tiptap/contexts/editorContext';

export default function Home() {
  /*  初始化editor */
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: '',
    autofocus: 'end',
    onUpdate: (e) => {},
  });

  if (!editor) {
    return null;
  }

  return (
    <main className={`h-screen p-12`}>
      <EditorProvider
        initialContextValue={{
          editor: editor,
        }}
      >
        <Tiptap />
      </EditorProvider>
    </main>
  );
}
