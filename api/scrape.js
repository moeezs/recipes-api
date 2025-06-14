import puppeteer from "puppeteer";
import { getRecipeData } from "./helperFunctions.js";

let url = "https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/";
let url2 = "https://www.allrecipes.com/recipe/16102/chicken-biryani/"

export async function scrapeRecipe(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            timeout: 15000,
            protocolTimeout: 10000,
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
                '--max_old_space_size=2048',
                '--single-process'
            ],
        });

        const page = await browser.newPage();
        
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.setExtraHTTPHeaders({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        });
        
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 15000,
        });

        await new Promise(resolve => setTimeout(resolve, 500));
        
        const pageTitle = await page.title();
        
        const currentUrl = page.url();
        
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