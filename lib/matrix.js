const fs = require('node:fs');
const Handlebars = require('handlebars');
const { minify } = require('html-minifier-terser');
const path = require('node:path');

function buildTemplateData(dataOptions) {
    const KATAKANA = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const NUMBERS = '0123456789';
    const DEFAULT_ALPHA_TRANSPARENCY = 0.05;
    const DEFAULT_DATA_OPTIONS = { canvasId: 'matrix', charset: 'utf-8' };
    const DEFAULT_BACKGROUND_COLOR = '#000'; // black
    const DEFAULT_FONT_FAMILY = 'monospace';
    const DEFAULT_FONT_SIZE = 16;
    const DEFAULT_INTERVAL = 33;
    const DEFAULT_TEXT_COLOR = '#0F0'; // green
    const DEFAULT_PAGE_TITLE = 'The Matrix';
    const defaultCharacters = KATAKANA + LATIN + NUMBERS;
    dataOptions = dataOptions || { };
    const backgroundColor = dataOptions.backgroundColor || dataOptions.bg || dataOptions.background || DEFAULT_BACKGROUND_COLOR;
    dataOptions.backgroundColor = backgroundColor;
    dataOptions.backgroundRgb = hexToRgb(backgroundColor);
    dataOptions.backgroundRgb.a = dataOptions.alpha || dataOptions.transparency || DEFAULT_ALPHA_TRANSPARENCY;
    dataOptions.characters = dataOptions.characters || dataOptions.chars || defaultCharacters;
    dataOptions.fontFamily = dataOptions.fontFamily || dataOptions.font || DEFAULT_FONT_FAMILY;
    dataOptions.fontSize = dataOptions.fontSize || dataOptions.size || DEFAULT_FONT_SIZE;
    dataOptions.interval = dataOptions.interval || DEFAULT_INTERVAL;
    dataOptions.pageTitle = dataOptions.pageTitle || dataOptions.title || DEFAULT_PAGE_TITLE;
    dataOptions.textColor = dataOptions.textColor || dataOptions.color || DEFAULT_TEXT_COLOR;
    return Object.assign(dataOptions, DEFAULT_DATA_OPTIONS);
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
    buildTemplateData,
    compileTemplate,
    minifyHtml,
    readHandlebarsTemplate,
};
