import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto("https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/")

await page.setViewport({width: 1080, height: 1024});

const title = await page.locator('.article-heading').waitHandle()
const accessedTitle = await title?.evaluate(el => el.textContent);


// Print the full title.
console.log('The title of this blog post is "%s".', accessedTitle);

await browser.close();