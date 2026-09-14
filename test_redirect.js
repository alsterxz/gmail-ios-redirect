const fs = require('fs');
const assert = require('assert');
const { buildGmailUrl } = require('./redirect.js');

assert.match(fs.readFileSync('./index.html', 'utf8'), /redirect\.js\?v=2/);

assert.strictEqual(
  buildGmailUrl('?id=1a09ac9612eea73f'),
  'googlegmail:///cv=1a09ac9612eea73f/accountId=0&create-new-tab'
);
assert.strictEqual(
  buildGmailUrl('?id=ABCDEF0123456789&account=1'),
  'googlegmail:///cv=abcdef0123456789/accountId=1&create-new-tab'
);
assert.strictEqual(buildGmailUrl('?id=../../malicious'), null);
assert.strictEqual(buildGmailUrl('?id=1a09ac9612eea73f&account=x'), null);
assert.strictEqual(buildGmailUrl('?account=0'), null);

console.log('redirect tests: ok');
