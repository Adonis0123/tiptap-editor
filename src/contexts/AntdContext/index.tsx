import React, { useContext } from 'react'

import type { NotificationInstance } from 'antd/es/notification/interface'
import type { MessageInstance } from 'antd/es/message/interface'

export const AntdContext = React.createContext<{
  message: MessageInstance | null
  notification: NotificationInstance | null
}>({
  message: null,
  notification: null,
})

export const AntdContextProvider = ({
  message,
  notification,
  children,
}: {
  message: MessageInstance
  notification: NotificationInstance
  children: React.ReactNode
}) => {
  return (
    <AntdContext.Provider
      value={{
        message,
        notification,
      }}
    >
      {children}
    </AntdContext.Provider>
  )
}

export const useAntdContext = () => {
  const { message } = useContext(AntdContext)

  if (!message) {
    throw new Error('message is null')
  }

  return { message }
}
