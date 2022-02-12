import { Config } from '@stencil/core';
// import { sass } from "@stencil/sass";

// const scssVariables = 'src/scss/variables.scss';
const { distDirs } = require('./package.json');
const yargs = require('yargs');

const docs = yargs.argv.docs;

const config: Config = {
  namespace: 'web-component-stencil',
  taskQueue: 'async',
  srcDir: 'src',
  // plugins: [
  //   sass({
  //     injectGlobalPaths: [scssVariables],
  //   }),
  // ],
  globalStyle: './src/global.scss',
  devServer: {
    reloadStrategy: 'hmr',
    openBrowser: false,
  },
  outputTargets: [
    {
      type: 'dist',
      dir: distDirs.stencil,
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: distDirs.stencil,
    },
    // {
    //   type: 'docs-readme',
    // },
    {
      type: 'docs-json',
      file: `${distDirs.stencil}/components.json`,
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
// creates readme.md for components
if (docs) {
  config.outputTargets.push({
    type: 'docs-readme',
    dir: 'src',
  });
}

export {config}
