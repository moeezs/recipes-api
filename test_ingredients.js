import { scrapeRecipe } from './api/scrape.js';

async function testIngredients() {
    try {
        console.log('Testing ingredient extraction...');
        
        // Test with the brookies recipe that has both main and sectioned ingredients
        const url = "https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/";
        const recipeData = await scrapeRecipe(url);
        
        console.log('\n=== TITLE ===');
        console.log(recipeData.title);
        
        console.log('\n=== INGREDIENTS ===');
        console.log(JSON.stringify(recipeData.ingredients, null, 2));
        
        console.log('\n=== INGREDIENTS SUMMARY ===');
        Object.keys(recipeData.ingredients).forEach(section => {
            console.log(`${section}: ${recipeData.ingredients[section].length} items`);
        });
        
    } catch (error) {
        console.error('Error testing ingredients:', error);
    }
}

testIngredients();
