// Copyright (c) 2025-2026 by Aaron Bean.

const fs = require('node:fs');
const Handlebars = require('handlebars');
const { minify } = require('html-minifier-terser');
const path = require('node:path');

const c = require('./constants');

async function buildHtml(templateName, dataOptions = null, compileOptions = null, minifyOptions = null) {
    const source = await readHandlebarsTemplate(c.TEMPLATE_NAME);
    if (!source) return null;
    const template = compileTemplate(source, compileOptions);
    if (!template) return null;
    const html = template(buildTemplateData(dataOptions));
    const minifiedHtml = await minifyHtml(html, minifyOptions);
    return !!minifiedHtml ? minifiedHtml : null;
}

function buildTemplateData(dataOptions) {
    const defaultCharacters = c.KATAKANA + c.LATIN + c.NUMBERS;
    dataOptions = dataOptions || { };
    const backgroundColor = dataOptions.backgroundColor || dataOptions.bg || dataOptions.background || c.DEFAULT_BACKGROUND_COLOR;
    dataOptions.backgroundColor = backgroundColor;
    dataOptions.backgroundRgb = hexToRgb(backgroundColor);
    dataOptions.backgroundRgb.a = dataOptions.alpha || dataOptions.transparency || c.DEFAULT_ALPHA_TRANSPARENCY;
    dataOptions.characters = dataOptions.characters || dataOptions.chars || defaultCharacters;
    dataOptions.fontFamily = dataOptions.fontFamily || dataOptions.font || c.DEFAULT_FONT_FAMILY;
    dataOptions.fontSize = dataOptions.fontSize || dataOptions.size || c.DEFAULT_FONT_SIZE;
    dataOptions.interval = dataOptions.interval || c.DEFAULT_INTERVAL;
    dataOptions.pageTitle = dataOptions.pageTitle || dataOptions.title || c.DEFAULT_PAGE_TITLE;
    dataOptions.textColor = dataOptions.textColor || dataOptions.color || c.DEFAULT_TEXT_COLOR;
    return Object.assign(dataOptions, c.DEFAULT_DATA_OPTIONS);
}

function compileTemplate(source, compileOptions) {
    const DEFAULT_COMPILE_OPTIONS = { noEscape: true };
    compileOptions = compileOptions || DEFAULT_COMPILE_OPTIONS;
    if (!source) return null;
    try {
        return Handlebars.compile(source, compileOptions);
    } catch (e) {
        console.error('Error compiling template', e);
        return null;
    }
}

function hexToRgb(hex) {
    if (!hex) return null;
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map((x) => x + x).join('');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

async function minifyHtml(html, minifyOptions) {
    const DEFAULT_MINIFY_OPTIONS = { collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true,
        removeOptionalTags: false, removeRedundantAttributes: true, removeScriptTypeAttributes: true,
        removeTagWhitespace: true, useShortDoctype: true };
    if (!html) return null;
    minifyOptions = minifyOptions || DEFAULT_MINIFY_OPTIONS;
    try {
        return minify(html, minifyOptions);
    } catch (e) {
        console.error('Error minifying HTML', e);
        return null;
    }
}

async function readHandlebarsTemplate(templateName, templateExtension = 'hbs') {
    if (!templateName) return null;
    const templateFileName = `${ templateName }.${ templateExtension }`;
    try {
        return fs.readFileSync(path.join(__dirname, templateFileName), 'utf8').toString();
    } catch (e) {
        console.error(`Error reading template: ${ templateFileName }`, e);
        return null;
    }
}

module.exports = {
    buildHtml,
};
