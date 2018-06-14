module.exports = {
    'extends': ['eslint:recommended','google', 'prettier'],
    'parserOptions': {
      'ecmaVersion': 6,
    },
    'plugins': ['prettier'],
    'env':{
      'es6': true,
      'mocha': true,
      'node': true
    },
    'rules': {
      'no-console': ['off'],
      'prettier/prettier': ["error", {"singleQuote": true}],
      "require-jsdoc": [2, {
        "require": {
            "FunctionDeclaration": false,
            "MethodDefinition": false,
            "ClassDeclaration": false
        }
    }],
    }
  };