// Copyright (c) 2025-2026 by Aaron Bean.

const { buildHtml } = require('./lib/matrix');

const THE_MATRIX_TEMPLATE = 'the_matrix';

async function buildMatrixHtml(options) {
    options = options || { };
    return buildHtml(THE_MATRIX_TEMPLATE, options, options.compile, options.minify);
}

function theMatrixRoute(options) {
    return async function (req, res) {
        options = options || { };
        Object.assign(options, req.query);
        const html = await buildMatrixHtml(options);
        if (!html) return res.status(404);
        return res.send(html);
    }
}

module.exports = {
    theMatrixRoute,
};
