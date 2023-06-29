import '@/styles/globals.css';
import '@/styles/tiptap.scss';
import '@/styles/antd.scss';
import type { AppProps } from 'next/app';

import dynamic from 'next/dynamic';
import themeStyles from '@/styles/theme.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useMount } from 'ahooks';
const WithAntd = dynamic(() => import('../_layout/WithAntd'));

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const themeClassNames = useMemo(() => {
    return [themeStyles.theme];
  }, [router]);

  useMount(() => {
    // 异步添加到全局样式中，使得挂载到 body 中的元素也能使用应用主题相关变量
    document.body.classList.add(...themeClassNames);
  });

  return (
    <WithAntd>
      <Component {...pageProps} />
    </WithAntd>
  );
}
