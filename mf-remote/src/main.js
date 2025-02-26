import markdownit from 'markdown-it'
const md = markdownit()
export const mfMessage = md.render('## Hello MF Remote!')
