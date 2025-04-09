const { buildTemplateData, compileTemplate, minifyHtml, readHandlebarsTemplate } = require('./lib/matrix');

const THE_MATRIX_TEMPLATE = 'the_matrix';

function theMatrixRoute(options) {
    return async function (req, res) {
        options = options || { };
        Object.assign(options, req.query);
        const source = await readHandlebarsTemplate(THE_MATRIX_TEMPLATE);
        if (!source) return null;
        const template = compileTemplate(source, options.compile);
        if (!template) return res.status(404);
        const html = template(buildTemplateData(options));
        const minifiedHtml = await minifyHtml(html, options.minify);
        if (!minifiedHtml) return res.status(404);
        return res.send(minifiedHtml);
    }
}

module.exports = {
    theMatrixRoute,
};
