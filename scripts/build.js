// Copyright (c) 2026 by Aaron Bean.

const fs = require('node:fs/promises');
const path = require('node:path');

const { buildHtml } = require('../lib/matrix');
const c = require('../lib/constants');

async function buildMatrixHtml(options) {
    options = options || { };
    return buildHtml(c.TEMPLATE_NAME, options, options.compile, false, options.minify);
}

async function outputMatrixHtml(options) {
    const html = await buildMatrixHtml(options);
    if (!html) return null;
    const outputFilePath = 'output/the_matrix.html';
    const outputDir = path.dirname(outputFilePath);
    try {
        await fs.access(outputDir);
    } catch (e) {
        try {
            await fs.mkdir(outputDir, { recursive: true });
        } catch (e) {
            console.error(`Error creating directory: ${ outputDir }`, e);
            return null;
        }
    }
    try {
        await fs.writeFile(outputFilePath, html, 'utf8');
        return outputFilePath;
    } catch (e) {
        console.error(`Error writing file: ${ outputFilePath }`, e);
        return null;
    }
}

function parseCommandLineArgs() {
    const args = process.argv.slice(2);
    const options = { };
    for (let i = 0; i < args.length; i++) {
        const arg = args[ i ];
        if (arg.startsWith('--')) {
            const key = arg.slice(2);
            const value = args[ i + 1 ];
            options[ key ] = value;
            i++;
        }
    }
    return options;
}

(async () => {
    try {
        const options = parseCommandLineArgs();
        const result = await outputMatrixHtml(options);
        const filesystemPath = result ? path.resolve(result) : null;
        console.log(`Matrix HTML file generated at: "${ filesystemPath }"`);
    } catch (e) {
        console.error('Error generating matrix HTML', e);
    }
})();
