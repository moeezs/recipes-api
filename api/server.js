import express from 'express';
import rateLimit from 'express-rate-limit';
import { scrapeRecipe } from './scrape.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: { error: 'Too many requests, please try again later.' }
});

app.use('/api', limiter);

// API route
app.get('/api', async (req, res) => {
    const url = req.query.url;

    const isValidAllrecipesUrl = /^https:\/\/www\.allrecipes\.com\/recipe\/\d+\/[a-z0-9\-]+\/?$/i.test(url);

    if (!url || !isValidAllrecipesUrl) {
        return res.status(400).json({ error: 'Invalid or missing Allrecipes URL (must match https://www.allrecipes.com/recipe/ID/NAME/)' });
    }

    const timeoutId = setTimeout(() => {
        if (!res.headersSent) {
            res.status(504).json({ error: 'Request timeout - recipe took too long to scrape' });
        }
    }, 20000);

    try {
        const recipeData = await scrapeRecipe(url);
        clearTimeout(timeoutId);
        if (!res.headersSent) {
            res.json(recipeData);
        }
    } catch (error) {
        clearTimeout(timeoutId);
        console.error("Error:", error.message);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to scrape recipe' });
        }
    }
});

// Serve static files from the React app build directory
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// Handle React routing - serve index.html for any routes that don't match API or static files
app.use((req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`Frontend available at: http://localhost:${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api`);
}); 