import { render } from 'preact'
import ChatApp from './ui/components/chat_app'

export default (el, config) => {
  render(<ChatApp config={config} />, el)
}
