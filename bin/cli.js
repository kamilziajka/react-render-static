#!/usr/bin/env node

require('@babel/register');

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { createElement } = require('react');
const { render } = require('../');
const { version } = require('../package.json');

const program = new Command();

program
    .name('react-render-static')
    .version(version)
    .usage('[options] file')
    .option('-p, --prettify', 'prettify output', false)
    .arguments('<filePath>')
    .action(filePath => {
        const absoluteFilePath = path.resolve(process.cwd(), filePath);

        if (!fs.existsSync(absoluteFilePath)) {
            console.error(`File ${absoluteFilePath} does not exist.`);
            process.exitCode = 1;
            return;
        }

        try {
            const { default: Component } = require(absoluteFilePath);
            const element = createElement(Component);

            const { prettify } = program;
            const output = render(element, { prettify });

            console.log(output);
        }
        catch (error) {
            console.error(`Error occurred while trying to render React component.`);
            console.error(error);
            process.exitCode = 1;
        }
    });

program.parse(process.argv);
