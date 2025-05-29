import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();

await page.goto("https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/", {
    waitUntil: 'networkidle0',  
    timeout: 60000, 
})

await page.setViewport({width: 1080, height: 1024});
console.log("set pages")

const title = await page.locator('.article-heading').waitHandle()
console.log('title waites')
const accessedTitle = await title?.evaluate(el => el.textContent);

console.log('achieved title')

let details_stuff = [];

const detailsContainer = await page.locator('.mm-recipes-details__content').waitHandle()
console.log('got details', detailsContainer)

const detailItems = await detailsContainer.$$('.mm-recipes-details__item');

for (const item of detailItems) {
    const label = await item.$eval('.mm-recipes-details__label', el => el.textContent.trim());
    const value = await item.$eval('.mm-recipes-details__value', el => el.textContent.trim());
    details_stuff.push({ label, value });
}

let ingredients = {};

const ingredientsContainer = await page.locator('#mm-recipes-structured-ingredients_1-0').waitHandle();

const sections = await ingredientsContainer.$$eval('.mm-recipes-structured-ingredients__list-heading, .mm-recipes-structured-ingredients__list', 
    (elements) => {
        let result = {};
        let currentHeading = null;
        
        elements.forEach(element => {
            if (element.classList.contains('mm-recipes-structured-ingredients__list-heading')) {
                currentHeading = element.textContent.replace(':', '').trim();
                result[currentHeading] = [];
            } else if (element.classList.contains('mm-recipes-structured-ingredients__list') && currentHeading) {
                const items = element.querySelectorAll('.mm-recipes-structured-ingredients__list-item p');
                items.forEach(item => {
                    const quantity = item.querySelector('[data-ingredient-quantity]')?.textContent || '';
                    const unit = item.querySelector('[data-ingredient-unit]')?.textContent || '';
                    const name = item.querySelector('[data-ingredient-name]')?.textContent || '';
                    
                    const ingredient = `${quantity} ${unit} ${name}`.trim();
                    result[currentHeading].push(ingredient);
                });
            }
        });
        
        return result;
    }
);

console.log('Ingredients by section:', ingredients);

console.log('Recipe details:', details_stuff);
console.log('The title of this blog post is "%s".', accessedTitle);

await browser.close();