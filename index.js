const http = require('http');
const https = require('https');
const url = require('url');
const express = require('express');

const URL = `https://www.reddit.com/r/exokit.json`;

const _parseLinks = j => j.data.children.map(child => child.data.url);
let links = null;

const _fetchLinks = () => {
  const {hostname, path} = url.parse(URL);
  const req = https.get({
    hostname,
    path,
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
      links = _parseLinks(j);
    });
    res.on('error', err => {
      console.warn(err.stack);
    });
  });
  req.on('error', err => {
    console.warn(err.stack);
  });
};
_fetchLinks();
setInterval(_fetchLinks, 10 * 1000);

const app = express();
app.get('*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Credentials', 'true');

  res.json(links);
});
http.createServer(app)
  .listen(9000);
