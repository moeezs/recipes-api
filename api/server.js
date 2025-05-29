import express from 'express';
import rateLimit from 'express-rate-limit';
import { scrapeRecipe } from './scrape.js';

const app = express();
const PORT = 3000;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: { error: 'Too many requests, please try again later.' }
});

app.use('/api', limiter);

app.get('/api', async (req, res) => {
    const url = req.query.url;

    const isValidAllrecipesUrl = /^https:\/\/www\.allrecipes\.com\/recipe\/\d+\/[a-z0-9\-]+\/?$/i.test(url);

    if (!url || !isValidAllrecipesUrl) {
        return res.status(400).json({ error: 'Invalid or missing Allrecipes URL (must match https://www.allrecipes.com/recipe/ID/NAME/)' });
    }

    try {
        const recipeData = await scrapeRecipe(url);
        res.json(recipeData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Failed to scrape recipe' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 