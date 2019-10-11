import {  useState, useContext } from 'preact/hooks'
import {SeamlyConfigContext} from '../core/seamly_api_context'

const Input = () => {
  const config = useContext(SeamlyConfigContext)
  const [userMessage, setUserMessage] = useState('')

  const onSubmitHandler = e => {
    e.preventDefault()
    setUserMessage('')
  }

  const onInputHandler = e => {
    setUserMessage(e.target.value)
  }

  return (
    <form
      onSubmit={onSubmitHandler}
    >
      {config.namespace}
      <input
        type="text"
        autoComplete="off"
        value={userMessage}
        onInput={onInputHandler}
      />
    </form>
  )
}

export default Input
