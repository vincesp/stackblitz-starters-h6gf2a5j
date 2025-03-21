import './style.css'
import markdownit from 'markdown-it'
import {
  registerRemotes,
  loadRemote,
} from '@module-federation/enhanced/runtime'

const remotes = [
  {
    name: 'js_remote',
    entry: 'http://localhost:8765/remoteEntry.js',
    type: 'module',
  },
  {
    name: 'mf_remote',
    entry: 'http://localhost:8766/mf-manifest.json',
  },
  {
    name: 'js_remote_rsbuild',
    entry: 'http://localhost:8767/remoteEntry.js',
  },
  {
    name: 'mf_remote_rsbuild',
    entry: 'http://localhost:8768/mf-manifest.json',
  },
]

const exports = {
  'js_remote': 'jsMessage',
  'mf_remote': 'mfMessage',
  'js_remote_rsbuild': 'jsRsMessage',
  'mf_remote_rsbuild': 'mfRsMessage',
}

async function startRemote(remote) {
  try {
    registerRemotes([remote])
    const { [exports[remote.name]]: message } = await loadRemote(remote.name)
    document.querySelector('#result').innerHTML += message
  } catch (e) {
    console.error(e)
    document.querySelector('#result').innerHTML += `
<h2 class="error">${remote.name}</h2>
<pre>
${e}
</pre>
`
  } finally {
    console.log('------------------', remote.name)
  }
}

const md = markdownit()
const result = md.render('# Hello Host!')
document.querySelector('#app').innerHTML = result

for (const remote of remotes) {
  const button = document.createElement('button')
  button.innerText = `Load ${remote.name}`
  button.onclick = () => startRemote(remote)
  document.querySelector('#app').appendChild(button)
}

console.log('------------------')
