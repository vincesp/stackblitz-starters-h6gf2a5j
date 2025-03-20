import './style.css'
import markdownit from 'markdown-it'
import {
  registerRemotes,
  loadRemote,
} from '@module-federation/enhanced/runtime'

const remotes = [
  {
    name: 'js-remote',
    entry: 'http://localhost:8765/remoteEntry.js',
    type: 'module',
  },
  {
    name: 'mf-remote',
    entry: 'http://localhost:8766/mf-manifest.json',
  },
  {
    name: 'js-remote-rsbuild',
    entry: 'http://localhost:8767/remoteEntry.js',
  },
  {
    name: 'mf-remote-rsbuild',
    entry: 'http://localhost:8768/mf-manifest.json',
  },
]

const exports = {
  'js-remote': 'jsMessage',
  'mf-remote': 'mfMessage',
  'js-remote-rsbuild': 'jsRsMessage',
  'mf-remote-rsbuild': 'mfRsMessage',
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
