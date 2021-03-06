module.exports = {
  'plugins': [ 'plugins/summarize', 'plugins/markdown' ],
  'recurseDepth': 10,
  'source': {
    'includePattern': '.+\\.js(doc|x)?$',
    'excludePattern': '(^|\\/|\\\\)_',
  },
  'sourceType': 'module',
  'tags': {
    'allowUnknownTags': true,
    'dictionaries': [ 'jsdoc', 'closure' ],
  },
  'templates': {
    'cleverLinks': true,
    'monospaceLinks': false,
  },
};
