const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');
const express = require('express');
const Student = require('../Models/studentModel');

const compile = async (templateName, data) => {
    const filePath = path.join(process.cwd(), 'server/controllers/templates', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data)
}

hbs.registerHelper('dataFormat', (value, format) => {
    return moment(value.format(format))
})

module.exports.regCirt =  (req, res) => {

    (async function() {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // for name of pdf file
            let milis = new Date();
	        milis = milis.getTime();

            const content = await compile('/regCit', req.query);

            await page.setContent(content);
            await page.emulateMediaType('screen');
            await page.pdf({
                path: `${milis}.pdf`,
                format: "A4",
                printBackground: true
            });

            await browser.close();
            return res.status(200);
        }
        catch(err) {
            console.log(err)
        }
    })();

};

module.exports.degreeSt = (req, res) => {
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

    (async function() {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // for name of pdf file
            let milis = new Date().getTime();

            const content = await compile('/degreesSt', data);

            await page.setContent(content);
            await page.emulateMediaType('screen');
            await page.pdf({
                path: `${milis}.pdf`,
                format: "A4",
                printBackground: true
            });

            await browser.close();
        }
        catch(err) {
            console.log(err)
        }
    })();


};
