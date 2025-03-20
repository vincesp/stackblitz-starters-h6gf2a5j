import markdownit from 'markdown-it'
const md = markdownit()
export const jsRsMessage = md.render('## Hello JS Remote built w/ rsbuild!')
