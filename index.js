const https = require('https');

// const URL = `https://www.reddit.com/r/exokit.json`;

const _parseLinks = j => j.data.children.map(child => child.data.url);

const req = https.get({
  hostname: 'www.reddit.com',
  path: '/r/exokit.json',
  encoding: 'utf8',
}, res => {
  const bs = [];
  res.on('data', d => {
    bs.push(d);
  });
  res.on('end', () => {
    const b = Buffer.concat(bs);
    const s = b.toString('utf8');
    const j = JSON.parse(s);
    console.log(_parseLinks(j));
  });
  res.on('error', err => {
    throw err;
  });
});
req.on('error', err => {
  throw err;
});
