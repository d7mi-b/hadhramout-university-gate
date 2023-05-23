const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');

const getDate = (e) => {
    const year = new Date(e).getFullYear();
    const month = new Date(e).getMonth() + 1;
    const day = new Date(e).getDate();

    return `${year}-${month}-${day}`;
}

function renderTemplate(data, templateName) {
    const html = fs.readFileSync(`${process.cwd()}\\controllers\\templates\\${templateName}.hbs`, {
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
    const pdf = await page.pdf({format: "A4"});

    await browser.close();

    return pdf;
}

module.exports.regCirt =  async (req, res) => {

    const htmlContent = renderTemplate(req.query, 'registration');

    await createPdf(`${new Date().getTime()}.pdf`, htmlContent)
        .then(pdf => {
            res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
            res.send(pdf)
        })

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
        subjects: JSON.parse(req.query.subjects),
        date: getDate(new Date())
    };

    const htmlContent = renderTemplate(data, '/degree_statement');

    await createPdf(`${new Date().getTime()}.pdf`, htmlContent)
    .then(pdf => {
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
        res.send(pdf)
    })

};

module.exports.grievancyPDF =  async (req, res) => {

    const data = {
        name: req.query.name,
        department: req.query.department,
        date: req.query.date,
        grivences: JSON.parse(req.query.grivences)
    }

    const htmlContent = renderTemplate(data, '/grievances');

    await createPdf(`${new Date().getTime()}.pdf`, htmlContent)
        .then(pdf => {
            res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
            res.send(pdf)
        })

};
