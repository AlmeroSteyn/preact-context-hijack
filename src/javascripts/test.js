import seamlyUI from './index'

const appConfig = {
  namespace: 'window',
}

const el = document.createElement('div')
el.id = 'preact-bots'
document.body.appendChild(el)

seamlyUI(el, appConfig)

const inlineAppConfig = {
  namespace: 'inline',
  layoutMode: 'inline',
}

seamlyUI(document.getElementById('inlinebot'), inlineAppConfig)

