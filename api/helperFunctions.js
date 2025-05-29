async function getTitle(page) {
    await page.waitForSelector('.article-heading', { timeout: 5000 });
    return await page.$eval('.article-heading', el => el.textContent.trim());
}

async function getDetails(page) {
    await page.waitForSelector('.mm-recipes-details__content', { timeout: 5000 });
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
    await page.waitForSelector('#mm-recipes-structured-ingredients_1-0', { timeout: 5000 });
    
    const sections = await page.$eval('#mm-recipes-structured-ingredients_1-0',
        (container) => {
            let result = {};
            let currentHeading = null;

            const elements = container.querySelectorAll('.mm-recipes-structured-ingredients__list-heading, .mm-recipes-structured-ingredients__list');
            
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
    await page.waitForSelector('#mm-recipes-steps__content_1-0', { timeout: 5000 });
    
    const stepsList = await page.$eval('#mm-recipes-steps__content_1-0 ol', 
        (orderList) => {
            const elements = orderList.querySelectorAll('li');
            return Array.from(elements).map((element, index) => {
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
        await page.waitForSelector('#mm-recipes-nutrition-facts-summary_1-0', { timeout: 3000 });
        
        const nutritionData = await page.$eval('#mm-recipes-nutrition-facts-summary_1-0 table tbody', 
            (tbody) => {
                const rows = tbody.querySelectorAll('tr');
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
        console.log('Nutrition section not found, skipping...');
        return {};
    }
}

export async function getRecipeData(page) {
    console.log('Starting parallel recipe data extraction...');
    
    try {
        // First, wait for key elements to be available
        await Promise.race([
            page.waitForSelector('.article-heading', { timeout: 5000 }),
            page.waitForSelector('.mm-recipes-details__content', { timeout: 5000 })
        ]);
        
        console.log('Page loaded, starting parallel extraction...');
        
        const [title, details, ingredients, steps, nutrition] = await Promise.allSettled([
            getTitle(page).catch(err => {
                console.log('Title extraction failed:', err.message);
                return 'Recipe Title Not Found';
            }),
            getDetails(page).catch(err => {
                console.log('Details extraction failed:', err.message);
                return {};
            }),
            getIngredients(page).catch(err => {
                console.log('Ingredients extraction failed:', err.message);
                return {};
            }),
            getSteps(page).catch(err => {
                console.log('Steps extraction failed:', err.message);
                return [];
            }),
            getNutrition(page).catch(err => {
                console.log('Nutrition extraction failed:', err.message);
                return {};
            })
        ]);

        console.log('All extractions completed');

        return {
            title: title.status === 'fulfilled' ? title.value : 'Recipe Title Not Found',
            details: details.status === 'fulfilled' ? details.value : {},
            ingredients: ingredients.status === 'fulfilled' ? ingredients.value : {},
            steps: steps.status === 'fulfilled' ? steps.value : [],
            nutrition: nutrition.status === 'fulfilled' ? nutrition.value : {}
        };
    } catch (error) {
        console.error('Recipe extraction failed:', error);
        throw new Error(`Recipe extraction failed: ${error.message}`);
    }
}