import { Editor } from '@tiptap/react';
import { ReactNode, createContext, createElement, useContext } from 'react';

interface IEditorContext {
  editor: Editor;
}

const EditorContext = createContext<IEditorContext>(null!);

export const EditorProvider = ({
  children,
  initialContextValue: { editor },
}: {
  children: ReactNode;
  initialContextValue: {
    editor: Editor;
  };
}) => {
  return createElement(
    EditorContext.Provider,
    {
      value: {
        editor,
      },
    },
    children
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  return context;
};
