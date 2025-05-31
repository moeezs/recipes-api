# Recipe Scraper API 🍳

A clean, fast REST API that scrapes recipe data from AllRecipes.com. No auth, no BS—just send a URL and get structured JSON back.

## Live Demo

🔗 **API**: https://recipes-api-production-6853.up.railway.app  
🌐 **Frontend**: https://recipes-api-production-6853.up.railway.app

## What it does

Extracts recipe data from AllRecipes URLs and returns it as clean JSON. Gets you:

- Recipe title and basic details (prep time, cook time, servings)  
- Ingredients organized by sections  
- Step-by-step cooking instructions with images  
- Nutrition facts when available  

## Usage

```bash
GET /api?url=https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/
```

That's it. No API keys, no registration, just works.

## Example Response

```json
{
  "title": "Brookies (Brownie Cookies)",
  "details": {
    "prepTime": "20 mins",
    "cookTime": "20 mins", 
    "totalTime": "40 mins",
    "servings": "20"
  },
  "ingredients": {
    "Cookie Layer": [
      "1/2 cup butter, softened",
      "1/2 cup light brown sugar",
      "1 large egg"
    ],
    "Brownie Layer": [
      "1 cup white sugar",
      "1/2 cup butter, melted"
    ]
  },
  "steps": [
    {
      "step": 1,
      "instruction": "Gather all ingredients.",
      "image": "https://..."
    }
  ],
  "nutrition": {
    "calories": "246",
    "fat": "13g"
  }
}
```

## Quick Examples

### JavaScript
```javascript
const response = await fetch('https://recipes-api-production-6853.up.railway.app/api?url=YOUR_RECIPE_URL');
const recipe = await response.json();
console.log(recipe.title);
```

### Python
```python
import requests
response = requests.get('https://recipes-api-production-6853.up.railway.app/api', 
                       params={'url': 'YOUR_RECIPE_URL'})
recipe = response.json()
```

### cURL
```bash
curl "https://recipes-api-production-6853.up.railway.app/api?url=YOUR_RECIPE_URL"
```

## Rate Limits

5 requests per minute per IP. Don't be greedy.

## Error Responses

- `400` - Invalid or missing URL  
- `429` - Rate limit exceeded  
- `500` - Scraping failed  

## Local Development

```bash
# Clone and install
git clone https://github.com/moeezs/recipes-api.git
cd recipes-api
npm install

# Run backend server
npm run server

# Run frontend dev server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **Backend**: Node.js + Express + Puppeteer
- **Frontend**: React + Vite + Tailwind CSS  
- **Deployment**: Railway

## Project Structure

```
├── api/                 # Backend API
│   ├── server.js       # Express server
│   ├── scrape.js       # Puppeteer scraping logic
│   └── helperFunctions.js
├── src/                # React frontend
│   ├── App.jsx         # Main app component
│   ├── components/     # UI components
│   └── lib/           # Utilities
└── public/            # Static assets
```

## Contributing

Found a bug? Recipe not scraping right? Open an issue or send a PR. 

## License

MIT. Do whatever you want with it.

---

Built by [@moeezs](https://github.com/moeezs) • [Star on GitHub](https://github.com/moeezs/recipes-api) ⭐
