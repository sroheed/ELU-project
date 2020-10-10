const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const bodyParser = require("body-parser");
const puppeteer = require('puppeteer');

app.use(bodyParser.json());

router.get("/", async (req, res) => {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.reddit.com/r/RPGMaker/');
        await page.waitForSelector('body');

        const rposts = await page.evaluate(() => {
            let posts = document.body.querySelectorAll('.BiNC74axuTz66dlnEgicY');
            posts.forEach(post => {
                console.log(post);
            });
            return;
        });

        await browser.close();

        res.send(rposts);
    }catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});