import puppeteer from "puppeteer";
import { getRecipeData } from "./helperFunctions.js";

let url = "https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/";
let url2 = "https://www.allrecipes.com/recipe/16102/chicken-biryani/"

export async function scrapeRecipe(url) {
    let browser;
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