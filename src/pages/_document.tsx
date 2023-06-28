import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          (
            <StyleProvider cache={cache}>
              <App {...props} />
            </StyleProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractStyle(cache);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles && <style dangerouslySetInnerHTML={{ __html: styles }} />}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en-us">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
