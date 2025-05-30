# Recipe Scraper API

A Node.js API that scrapes comprehensive recipe data from AllRecipes.com pages.

## Features

- Extracts recipe title, cooking details, ingredients, step-by-step instructions, and nutrition facts
- Supports recipes with multiple ingredient sections
- Includes images for cooking steps
- Built with Express.js and Puppeteer
- Rate limiting protection
- Deployed on Railway

## Installation

```bash
npm install
```

## Usage

### Local Development
```bash
npm start
```

### API Endpoint
```
GET /scrape?url=<allrecipes-url>
```

### Example Request

**Local:**
```bash
curl "http://localhost:3000/api?url=https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/"
```

**Live API:**
```bash
curl "https://recipes-api-production-6853.up.railway.app/api?url=https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/"
```

### Example Response
```json
{
  "title": "Brookies (Brownie Cookies)",
  "details": {
    "prepTime": "15 mins",
    "cookTime": "12 mins",
    "totalTime": "27 mins",
    "servings": "24"
  },
  "ingredients": {
    "Main": [
      "1 cup all-purpose flour",
      "1/2 cup cocoa powder",
      "1 cup sugar"
    ]
  },
  "steps": [
    {
      "step": 1,
      "instruction": "Preheat oven to 350 degrees F...",
      "image": "https://..."
    }
  ],
  "nutrition": {
    "calories": "180",
    "fat": "8g",
    "carbohydrates": "25g"
  }
}
```

## Requirements

- Node.js 18+
- Works with AllRecipes.com URLs only

## Deployment

**Live API:** https://recipes-api-production-6853.up.railway.app/

Optimized for Railway cloud deployment with proper Puppeteer configuration.
