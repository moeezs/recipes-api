import puppeteer from "puppeteer";
import { getRecipeData } from "./functions.js";

let browser;

let url = "https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/";

(async () => {
    try {
        browser = await puppeteer.launch({
            headless: true,
            timeout: 60000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        });

        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });

        await page.setViewport({ width: 1080, height: 1024 });

        const recipeData = await getRecipeData(page);
        console.log(recipeData);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
})();