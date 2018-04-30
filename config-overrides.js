const rewireCssModules = require('react-app-rewire-css-modules');

// Override CRA config to be able to use CSS modules

module.exports = function override(config, env) {
  config = rewireCssModules(config, env);

  return config;
};
