
const ghpages = require('gh-pages')

ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/manhhuy01/amwaypv.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)