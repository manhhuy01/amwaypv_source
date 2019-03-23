
const ghpages = require('gh-pages')
const fs = require('fs');
const path = require('path');

let filename = 'CNAME';
let src = path.join(__dirname, '../', filename);
let destDir = path.join(__dirname, '../', 'public');

async function copyFile(src, dest) {

  let readStream = fs.createReadStream(src);

  readStream.once('error', (err) => {
    console.log(err);
  });

  readStream.once('end', () => {
    console.log('done copying');
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
  });

  readStream.pipe(fs.createWriteStream(dest));
}

fs.access(destDir, (err) => {
  if (err)
    fs.mkdirSync(destDir);

  copyFile(src, path.join(destDir, filename));
});

