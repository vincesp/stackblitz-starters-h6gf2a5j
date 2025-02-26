import './style.css'
import markdownit from 'markdown-it'
import {
  registerRemotes,
  loadRemote,
} from '@module-federation/enhanced/runtime'

const md = markdownit()
const result = md.render('# Hello Host!')
document.querySelector('#app').innerHTML = result

registerRemotes([
  {
    name: 'js-remote',
    entry: 'http://localhost:8765/remoteEntry.js',
    type: 'module',
  },
])
const { jsMessage } = await loadRemote('js-remote')
document.querySelector('#app').innerHTML += jsMessage

registerRemotes([
  {
    name: 'mf-remote',
    entry: 'http://localhost:8766/mf-manifest.json',
  },
])
try {
  const { mfMessage } = await loadRemote('mf-remote')
  document.querySelector('#app').innerHTML += mfMessage
} catch (e) {
  document.querySelector('#app').innerHTML += `
<pre>
${e}
</pre>
`
  console.error(e)
}
