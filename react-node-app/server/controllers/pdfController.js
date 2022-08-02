const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');

function renderTemplate(data, templateName) {
    const html = fs.readFileSync(path.join(process.cwd(), 'server/controllers/templates', `${templateName}.hbs`), {
        encoding: "utf-8",
    });

    const template = hbs.compile(html);

    const rendered = template(data);
    return rendered;
}

async function createPdf(outputPath, htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    await page.emulateMediaType("print");
    await page.pdf({path: outputPath, format: "A4"});

    await browser.close();
}

module.exports.regCirt =  async (req, res) => {

    const htmlContent = renderTemplate(req.query, '/regCit');

    await createPdf(`${new Date().getTime()}.pdf`, htmlContent);

};

module.exports.degreeSt = async (req, res) => {
    const data = {
        username: req.query.username,
        name: req.query.name,
        collage: req.query.collage,
        department: req.query.department,
        level: req.query.level,
        GPA: req.query.GPA,
        degreeLevel: req.query.degreeLevel,
        semestar: req.query.semestar,
        semAvg: req.query.semAvg,
        semGrd: req.query.semGrd,
        sex: req.query.sex,
        nationality: req.query.nationality,
        POB: req.query.POB,
        DOB: req.query.DOB,
        yearToJoin: req.query.yearToJoin,
        gread: req.query.gread,
        subjects: JSON.parse(req.query.subjects)
    };

    const htmlContent = renderTemplate(data, '/degreesSt');

    await createPdf(`${new Date().getTime()}.pdf`, htmlContent);

};
