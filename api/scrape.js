import puppeteer from "puppeteer";
import { getRecipeData } from "./helperFunctions.js";

let url = "https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/";
let url2 = "https://www.allrecipes.com/recipe/16102/chicken-biryani/"

export async function scrapeRecipe(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            timeout: 30000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--no-first-run',
                '--no-default-browser-check',
                '--single-process'
            ],
        });

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 45000,
        });

        await page.setViewport({ width: 1080, height: 1024 });

        const recipeData = await getRecipeData(page);
        return recipeData;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}