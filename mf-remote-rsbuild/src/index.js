import markdownit from 'markdown-it'
const md = markdownit()
export const mfRsMessage = md.render('## Hello MF Remote built w/ rsbuild!')
