import { AntdContextProvider } from '@/pages/contexts/AntdContext';
import { ConfigProvider, message, notification } from 'antd';
import { displayColor } from '../../../styles/theme.module.scss';
export interface IWithAntdProps {
  children: React.ReactNode;
}

const WithAntd: React.FC<IWithAntdProps> = (props) => {
  const { children } = props;

  const [messageApi, messageContextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  return (
    <ConfigProvider
      prefixCls="coco"
      iconPrefixCls="coco-icon"
      theme={{
        token: {
          // fontFamily: `var(${variableMulish})`,
          fontSize: 16,
          colorText: displayColor,
          // modal 为 1000
          // header 为 900
          // 常规弹出内容基于 800 增加
          // 尽量减少 antd 相关组件的使用或者使用平替方案
          zIndexPopupBase: 800,
          colorBorder: '#DEE8F9',
          colorBorderSecondary: '#DEE8F9',
          borderRadius: 4,
          controlInteractiveSize: 20,
          colorBgMask: 'rgba(55,83,117,0.9)',
        },
      }}
    >
      <AntdContextProvider message={messageApi} notification={notificationApi}>
        {messageContextHolder}
        {notificationContextHolder}
        {children}
      </AntdContextProvider>
    </ConfigProvider>
  );
};

export default WithAntd;
