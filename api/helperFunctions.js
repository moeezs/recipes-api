async function getTitle(page) {
    await page.waitForSelector('.article-heading', { timeout: 10000 });
    return await page.$eval('.article-heading', el => el.textContent.trim());
}

async function getDetails(page) {
    await page.waitForSelector('.mm-recipes-details__content', { timeout: 10000 });
    const detailItems = await page.$$('.mm-recipes-details__item');
    
    let details_stuff = {};
    for (const item of detailItems) {
        const label = await item.$eval('.mm-recipes-details__label', el => el.textContent.trim());
        const value = await item.$eval('.mm-recipes-details__value', el => el.textContent.trim());
        const key = label.replace(':', '').replace(/\s+(.)/g, (match, letter) => letter.toUpperCase()).replace(/^\w/, c => c.toLowerCase());
        details_stuff[key] = value;
    }
    return details_stuff;
}

async function getIngredients(page) {
    await page.waitForSelector('#mm-recipes-structured-ingredients_1-0', { timeout: 10000 });
    
    const sections = await page.$$eval('#mm-recipes-structured-ingredients_1-0 .mm-recipes-structured-ingredients__list-heading, #mm-recipes-structured-ingredients_1-0 .mm-recipes-structured-ingredients__list',
        (elements) => {
            let result = {};
            let currentHeading = null;

            elements.forEach(element => {
                if (element.classList.contains('mm-recipes-structured-ingredients__list-heading')) {
                    currentHeading = element.textContent.replace(':', '').trim();
                    result[currentHeading] = [];
                } else if (element.classList.contains('mm-recipes-structured-ingredients__list')) {
                    if (!currentHeading) {
                        currentHeading = 'Main';
                        result[currentHeading] = [];
                    }
                    
                    const items = element.querySelectorAll('.mm-recipes-structured-ingredients__list-item p');
                    items.forEach(item => {
                        const quantity = item.querySelector('[data-ingredient-quantity]')?.textContent || '';
                        const unit = item.querySelector('[data-ingredient-unit]')?.textContent || '';
                        const name = item.querySelector('[data-ingredient-name]')?.textContent || '';

                        const ingredient = `${quantity} ${unit} ${name}`.trim();
                        result[currentHeading].push(ingredient);
                    });
                    
                    if (currentHeading !== 'Main') {
                        currentHeading = null;
                    }
                }
            });

            return result;
        }
    );

    return sections;
}

async function getSteps(page) {
    await page.waitForSelector('#mm-recipes-steps__content_1-0', { timeout: 10000 });
    
    const stepsList = await page.$$eval('#mm-recipes-steps__content_1-0 ol li', 
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

    return stepsList;
}

async function getNutrition(page) {
    try {
        await page.waitForSelector('#mm-recipes-nutrition-facts-summary_1-0', { timeout: 5000 });
        
        const nutritionData = await page.$$eval('#mm-recipes-nutrition-facts-summary_1-0 table tbody tr', 
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
        
        return nutritionData;
    } catch (error) {
        return {};
    }
}

export async function getRecipeData(page) {
        console.log('Starting recipe data extraction...');
    
    const bodyContent = await page.evaluate(() => {
        const body = document.body.innerText;
        return body.substring(0, 500); // First 500 chars
    });
    console.log('Page content preview:', bodyContent);
    
    const title = await getTitle(page);
    console.log('✓ Title extracted');
    
    const details = await getDetails(page);
    console.log('✓ Details extracted');
    
    const ingredients = await getIngredients(page);
    console.log('✓ Ingredients extracted');
    
    const steps = await getSteps(page);
    console.log('✓ Steps extracted');
    
    const nutrition = await getNutrition(page);
    console.log('✓ Nutrition extracted');

    return {
        title,
        details,
        ingredients,
        steps,
        nutrition
    };
}