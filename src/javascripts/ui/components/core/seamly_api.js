import { useEffect, useState } from 'preact/hooks'
import { SeamlyConfigContext } from './seamly_api_context'
import Input from '../input/input'

const SeamlyApi = ({ config }) => {
  const [seamlyConfig, setSeamlyConfig] = useState({})

  useEffect(() => {
    setSeamlyConfig(config)
  }, [config])

  return (
    <SeamlyConfigContext.Provider value={seamlyConfig}>
      <Input />
    </SeamlyConfigContext.Provider>
  )
}

export default SeamlyApi
