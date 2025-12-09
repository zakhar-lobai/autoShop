const path = require('path');
const cfgPath = path.resolve(__dirname, '..', 'babel.config.js');
console.log('Using babel.config.js at', cfgPath);
try {
  const cfg = require(cfgPath);
  if (typeof cfg === 'function') {
    const res = cfg({ cache() {} });
    console.log('Resolved config:', JSON.stringify(res, null, 2));
  } else {
    console.log('Config object:', JSON.stringify(cfg, null, 2));
  }
} catch (e) {
  console.error('Failed to load config:', e && e.stack ? e.stack : e);
}
