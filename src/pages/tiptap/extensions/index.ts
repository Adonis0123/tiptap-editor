import cls from '@/pages/utils/cls';
import StarterKit from '@tiptap/starter-kit';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { InputRule } from '@tiptap/core';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapUnderline from '@tiptap/extension-underline';
import TiptapImage from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import SlashCommand from './SlashCommand';

export const TiptapExtensions = [
  /**
   * 基础套件
   * https://tiptap.dev/api/extensions/starter-kit
   */
  StarterKit.configure({
    /* 无序列表 https://tiptap.dev/api/nodes/bullet-list */
    bulletList: {
      HTMLAttributes: {
        class: cls``,
      },
    },
    /* 有序列表 https://tiptap.dev/api/nodes/ordered-list */
    orderedList: {
      HTMLAttributes: {
        class: cls``,
      },
    },
    /* li标签 https://tiptap.dev/api/nodes/list-item */
    listItem: {
      HTMLAttributes: {
        class: cls``,
      },
    },
    /* 引用 https://tiptap.dev/api/nodes/blockquote */
    blockquote: {
      HTMLAttributes: {
        class: cls`border-l-4 border-stone-700`,
      },
    },
    /* 代码块 https://tiptap.dev/api/nodes/code-block */
    codeBlock: {
      HTMLAttributes: {
        class: cls`rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800`,
      },
    },
    /* 代码 https://tiptap.dev/api/marks/code */
    code: {
      HTMLAttributes: {
        class: cls`rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-black`,
        spellcheck: 'false',
      },
    },
    /* hr 换行 https://tiptap.dev/api/nodes/horizontal-rule */
    horizontalRule: false,
    /* 拖拽时显示的下划线 https://tiptap.dev/api/extensions/dropcursor */
    dropcursor: {
      color: '#3A7EFF',
      width: 4,
    },
    /* 文本间隙光标 https://tiptap.dev/api/extensions/gapcursor */
    gapcursor: false,
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: 'mt-4 mb-6 border-t border-stone-300',
    },
  }),
  /* 超链接 https://tiptap.dev/api/marks/link */
  TiptapLink.configure({
    protocols: [
      'ftp',
      'mailto',
      {
        scheme: 'tel',
        optionalSlashes: true,
      },
    ],
    HTMLAttributes: {
      class: cls`text-[#3A7EFF] transition-colors cursor-pointer hover:underline underline-offset-[3px]`,
    },
  }),
  /* https://tiptap.dev/api/extensions/placeholder#placeholder */
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`;
      }
      return "Press '/' for commands";
    },
    includeChildren: true,
  }),
  /* https://tiptap.dev/api/marks/underline */
  TiptapUnderline,
  TiptapImage.configure({
    HTMLAttributes: {
      class: cls``,
    },
  }),
  TextStyle,
  Color,
  SlashCommand,
  // TaskList.configure({
  //   HTMLAttributes: {
  //     class: cls`not-prose pl-2`,
  //   },
  // }),
  // TaskItem.configure({
  //   HTMLAttributes: {
  //     class: cls`flex items-start mb-4`,
  //   },
  // }),
];
