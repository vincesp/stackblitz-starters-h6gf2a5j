import markdownit from 'markdown-it'
const md = markdownit()
export const jsMessage = md.render('## Hello JS Remote!')
