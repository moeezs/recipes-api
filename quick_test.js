import { scrapeRecipe } from './api/scrape.js';

async function quickTest() {
    try {
        console.log('Testing with debugging...');
        const result = await scrapeRecipe("https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/");
        console.log('SUCCESS - Title:', result.title);
    } catch (error) {
        console.error('ERROR:', error.message);
    }
}

quickTest();
