// ensure environment variables are set from .env files
const path = require( 'path' );


const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const isProduction = process.env.NODE_ENV === 'production';
// set to true when we (finally) start using Typescript
const useTypescript = false;

module.exports = {
  presets: [
    [
      require( '@babel/preset-env' ).default,
      {
        useBuiltIns: isTest ? undefined : 'entry',
        corejs: isTest ? undefined : 3,
        exclude: isTest ? undefined : [ 'transform-typeof-symbol' ],
        targets: isTest ? { node: 'current' } : undefined,
      },
    ],
    [
      require( '@babel/preset-react' ).default,
      {
        runtime: 'classic',
        development: isDevelopment || isTest,
        useBuiltIns: true,
      },
    ],
    useTypescript && [
      require( '@babel/preset-typescript' ).default,
      {
        allExtensions: true,
        allowNamespaces: true,
        isTSX: true,
        onlyRemoveTypeImports: true,
      },
    ],
  ].filter( Boolean ),

  plugins: [
    // export Component from './Component'
    require( '@babel/plugin-proposal-export-default-from' ).default,
    // export * as something from 'module'
    require( '@babel/plugin-proposal-export-namespace-from' ).default,
    require( 'babel-plugin-macros' ),
    // legacy decorators
    useTypescript && [ require( '@babel/plugin-proposal-decorators' ).default, false ],
    // handle properties like: class { handleClick = () => { } }
    [ require( '@babel/plugin-proposal-class-properties' ).default, { loose: true }],
    require( '@babel/plugin-proposal-numeric-separator' ).default,
    [
      require( '@babel/plugin-transform-runtime' ).default,
      {
        corejs: false,
        helpers: false,
        version: require( '@babel/runtime/package.json' ).version,
        regenerator: true,
        useESModules: isDevelopment || isProduction,
        absoluteRuntime: path.dirname(
          require.resolve( '@babel/runtime/package.json' ),
        ),
      },
    ],
    isProduction && [
      require( 'babel-plugin-transform-react-remove-prop-types' ).default,
      { removeImport: true },
    ],
    require( '@babel/plugin-proposal-optional-chaining' ).default,
    require( '@babel/plugin-proposal-nullish-coalescing-operator' ).default,
    require( '@babel/plugin-transform-react-constant-elements' ).default,
  ].filter( Boolean ),

  overrides: [
    useTypescript && {
      test: /\.tsx?$/,
      plugins: [[
        require( '@babel/plugin-proposal-decorators' ).default,
        { legacy: true },
      ]],
    },
  ].filter( Boolean ),
};
