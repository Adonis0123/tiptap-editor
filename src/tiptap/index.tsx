import React, { use, useEffect, useRef, useState } from 'react';
import cls from '../utils/cls';
import { useMount } from 'ahooks';
import { EditorContent, useEditor } from '@tiptap/react';
import { TiptapExtensions } from './extensions';
import { TiptapEditorProps } from './editorProps';
import { presetMarkdown } from './defaultContent';
import { markdown2Html } from './utils';
import { EditorBubbleMenu } from './components/EditorBubbleMenu';
import EditorTitle from './components/EditorTitle';
import EditorTools from './components/EditorTools';
import { LinkBubbleMenu } from './components/EditorBubbleMenu/LinkBubbleMenu';
import { useEditorContext } from './contexts/editorContext';
export interface ITiptapProps {}

const Tiptap: React.FC<ITiptapProps> = (props) => {
  const [content, setContent] = useState<string>('');

  const { editor } = useEditorContext();

  useMount(() => {
    // 获取浏览器参数
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const init = searchParams.get('init');
    if (init === 'stream') {
      let i = 0;
      const interval = setInterval(() => {
        setContent(presetMarkdown.substring(0, i));
        i++;
        if (i > presetMarkdown.length) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setContent(presetMarkdown);
    }
  });

  useEffect(() => {
    if (!editor) {
      return;
    }
    // const html = markdown2Html(content);
    editor.commands.setContent(content);
  }, [editor, content]);

  /* 插入内容 */
  const onInsertContent = () => {
    if (!editor) {
      return;
    }

    const html = markdown2Html(content);
    editor.commands.insertContent(html, {
      parseOptions: {
        preserveWhitespace: true,
      },
    });
  };

  return (
    <>
      <EditorTools  />
      <div
        style={{
          boxShadow: '0px 4px 9px rgba(11, 45, 96, 0.16)',
        }}
        className={cls`
        bg-white
        w-full h-full 
        rounded-lg
        overflow-y-auto
        relative
        p-6
      `}
      >
        <>
          {/* 标题 */}
          <EditorTitle  />
          {/* 划线菜单 */}
          <EditorBubbleMenu  />
          {/* 测试link bubble */}
          {/* <LinkBubbleMenu  /> */}
          <EditorContent editor={editor} />
        </>
      </div>
    </>
  );
};

export default Tiptap;
