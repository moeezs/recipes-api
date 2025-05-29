async function getTitle(page) {
    const title = await page.locator('.article-heading').waitHandle()
    const accessedTitle = await title?.evaluate(el => el.textContent);
    return accessedTitle;
}

async function getDetails(page) {
    let details_stuff = {};
    const detailsContainer = await page.locator('.mm-recipes-details__content').waitHandle();
    const detailItems = await detailsContainer.$$('.mm-recipes-details__item');

    for (const item of detailItems) {
        const label = await item.$eval('.mm-recipes-details__label', el => el.textContent.trim());
        const value = await item.$eval('.mm-recipes-details__value', el => el.textContent.trim());

        const key = label.replace(':', '').replace(/\s+(.)/g, (match, letter) => letter.toUpperCase()).replace(/^\w/, c => c.toLowerCase());
        details_stuff[key] = value;
    }
    return details_stuff;
}

async function getIngredients(page) {
    let ingredients = {};

    await page.waitForSelector('#mm-recipes-structured-ingredients_1-0', { timeout: 30000 });
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

    ingredients = sections;
    return ingredients;
}

async function getSteps(page) {
    let steps = [];

    await page.waitForSelector('#mm-recipes-steps__content_1-0', { timeout: 30000 });
    const stepsContainer = await page.locator('#mm-recipes-steps__content_1-0').waitHandle();

    const stepsList = await stepsContainer.$$eval('ol li', 
        (elements) => {
            return elements.map((element, index) => {
                const instruction = element.querySelector('p.mntl-sc-block-html')?.textContent.trim() || '';
                const image = element.querySelector('img')?.getAttribute('data-src') || 
                             element.querySelector('img')?.getAttribute('src') || '';
                
                return {
                    step: index + 1,
                    instruction: instruction,
                    image: image
                };
            }).filter(step => step.instruction !== '');
        }
    );

    steps = stepsList;
    return steps;
}

async function getNutrition(page) {
    let nutrition = {};

    try {
        await page.waitForSelector('#mm-recipes-nutrition-facts-summary_1-0', { timeout: 10000 });
        const nutritionContainer = await page.locator('#mm-recipes-nutrition-facts-summary_1-0').waitHandle();
        
        const nutritionData = await nutritionContainer.$$eval('table tbody tr', 
            (rows) => {
                let result = {};
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length === 2) {
                        const value = cells[0].textContent.trim();
                        const label = cells[1].textContent.trim().toLowerCase();
                        result[label] = value;
                    }
                });
                return result;
            }
        );
        
        nutrition = nutritionData;
    } catch (error) {
        console.log('Nutrition facts not found or failed to load');
        nutrition = {};
    }

    return nutrition;
}

export async function getRecipeData(page) {
    const title = await getTitle(page);
    const details = await getDetails(page);
    const ingredients = await getIngredients(page);
    const steps = await getSteps(page);
    const nutrition = await getNutrition(page);

    return {
        title,
        details,
        ingredients,
        steps,
        nutrition
    };
}