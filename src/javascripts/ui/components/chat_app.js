import SeamlyApi from './core/seamly_api'

const ChatApp = ({ config, eventBus }) => {
  return (
      <SeamlyApi config={config} eventBus={eventBus} />
  )
}

export default ChatApp
