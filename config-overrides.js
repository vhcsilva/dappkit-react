module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    ...config?.resolve?.fallback || {},
    "crypto": false,
    "stream": false,
    "assert": false,
    "http": false,
    "https": false,
    "os": false,
    "url": false,
    zlib: false
  }

  return config;
}