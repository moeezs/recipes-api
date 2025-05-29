import puppeteer from "puppeteer";
import { getRecipeData } from "./helperFunctions.js";

let url = "https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/";
let url2 = "https://www.allrecipes.com/recipe/16102/chicken-biryani/"

export async function scrapeRecipe(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            timeout: 20000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-web-security',
                '--disable-extensions',
                '--no-first-run',
                '--disable-default-apps',
                '--memory-pressure-off',
                '--max_old_space_size=4096'
            ],
        });

        const page = await browser.newPage();
        
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 20000,
        });

        await page.waitForTimeout(2000);
        
        const recipeData = await getRecipeData(page);
        return recipeData;
    } catch (error) {
        console.error("Scraping error:", error.message);
        throw new Error('Failed to scrape recipe');
    } finally {
        if (browser) {
            try {
                await browser.close();
            } catch (closeError) {
                console.error("Browser close error:", closeError.message);
            }
        }
    }
}