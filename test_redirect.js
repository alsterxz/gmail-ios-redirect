const fs = require('fs');
const assert = require('assert');
const { buildGmailWebUrl } = require('./redirect.js');

assert.match(fs.readFileSync('./index.html', 'utf8'), /redirect\.js\?v=3/);

assert.strictEqual(
  buildGmailWebUrl('?id=1a09ac9612eea73f'),
  'https://mail.google.com/mail/u/0/#all/1a09ac9612eea73f'
);
assert.strictEqual(
  buildGmailWebUrl('?id=ABCDEF0123456789'),
  'https://mail.google.com/mail/u/0/#all/abcdef0123456789'
);
assert.strictEqual(buildGmailWebUrl('?id=../../malicious'), null);
assert.strictEqual(buildGmailWebUrl(''), null);

console.log('redirect tests: ok');
