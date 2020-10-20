#!/usr/bin/env node

require('@babel/register');

const fs = require('fs');
const path = require('path');
const { createElement } = require('react');
const { render } = require('../');

const args = process.argv.slice(2);

const prettifyOptions = ['--prettify', '-p'];

if (!args.length) {
    console.log('react-render-static [options] <file>');
    console.log('options:');
    console.log(`${prettifyOptions.join(', ')}      prettify output`);
    return;
}

const [filePath, ...options] = args.reverse();

if (!filePath) {
    console.error('Please specify input file as a first argument.');
    process.exitCode = 1;
    return;
}

const absoluteFilePath = path.resolve(process.cwd(), filePath);

if (!fs.existsSync(absoluteFilePath)) {
    console.error(`File ${absoluteFilePath} does not exist.`);
    process.exitCode = 1;
    return;
}

try {
    const { default: Component } = require(absoluteFilePath);
    const element = createElement(Component);

    const prettify = !!~options.findIndex(option => prettifyOptions.includes(option));
    const output = render(element, { prettify });

    console.log(output);
}
catch (error) {
    console.error(`Error occurred while trying to render React component.`);
    console.error(error);
    process.exitCode = 1;
    return;
}
