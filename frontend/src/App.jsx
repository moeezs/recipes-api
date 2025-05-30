import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { ChefHat, Code2, Play, BookOpen, ExternalLink, Copy, Check } from 'lucide-react'
import './App.css'

// Sample API Response Data
const sampleResponse = {
  "title": "Brookies (Brownie Cookies)",
  "details": {
    "prepTime": "15 mins",
    "cookTime": "12 mins", 
    "totalTime": "27 mins",
    "servings": "24",
    "difficulty": "Easy"
  },
  "ingredients": {
    "Main": [
      "1 cup all-purpose flour",
      "1/2 cup unsweetened cocoa powder", 
      "1/2 teaspoon baking soda",
      "1/2 teaspoon salt",
      "1/2 cup butter, melted",
      "1 cup white sugar",
      "1 large egg",
      "1 teaspoon vanilla extract",
      "1 cup chocolate chips"
    ]
  },
  "steps": [
    {
      "step": 1,
      "instruction": "Preheat oven to 350 degrees F (175 degrees C). Line baking sheets with parchment paper.",
      "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F03%2F25%2F238654-brookies-brownie-cookies-ddmfs-4x3-0189.jpg"
    },
    {
      "step": 2, 
      "instruction": "Whisk together flour, cocoa powder, baking soda, and salt in a bowl.",
      "image": ""
    },
    {
      "step": 3,
      "instruction": "Mix melted butter and sugar in a large bowl until combined. Beat in egg and vanilla.",
      "image": ""
    },
    {
      "step": 4,
      "instruction": "Gradually stir in flour mixture until just combined. Fold in chocolate chips.",
      "image": ""
    },
    {
      "step": 5,
      "instruction": "Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.",
      "image": ""
    },
    {
      "step": 6,
      "instruction": "Bake for 10-12 minutes until edges are set. Cool on baking sheet for 5 minutes before transferring to wire rack.",
      "image": ""
    }
  ],
  "nutrition": {
    "calories": "180",
    "totalFat": "8g", 
    "saturatedFat": "5g",
    "cholesterol": "25mg",
    "sodium": "95mg",
    "totalCarbohydrate": "25g",
    "dietaryFiber": "2g",
    "totalSugars": "18g",
    "protein": "3g"
  }
}

// Navigation Component
function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home', icon: ChefHat },
    { path: '/docs', label: 'API Docs', icon: BookOpen },
    { path: '/examples', label: 'Examples', icon: Code2 },
    { path: '/playground', label: 'Try It', icon: Play }
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <ChefHat size={24} />
          <span>Recipe API</span>
        </Link>
        
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

// Code Block Component
function CodeBlock({ code, language = 'json', copyable = true }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="code-block">
      {copyable && (
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

// Home Page
function HomePage() {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-content">
          <h1>Recipe Scraper API</h1>
          <p>Extract comprehensive recipe data from AllRecipes.com with a simple REST API call. Get ingredients, cooking steps, nutrition facts, and more in clean JSON format.</p>
          
          <div className="hero-buttons">
            <Link to="/docs" className="btn-primary">
              <BookOpen size={20} />
              View Documentation
            </Link>
            <Link to="/playground" className="btn-secondary">
              <Play size={20} />
              Try It Live
            </Link>
          </div>
        </div>
        
        <div className="hero-demo">
          <div className="demo-card">
            <div className="demo-header">
              <span className="demo-label">GET Request</span>
              <span className="demo-status">200 OK</span>
            </div>
            <CodeBlock 
              code={`GET /api?url=https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/`}
              language="http"
              copyable={false}
            />
          </div>
        </div>
      </div>

      <div className="features">
        <h2>What You Get</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Recipe Details</h3>
            <p>Prep time, cook time, servings, and difficulty level</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🥗</div>
            <h3>Ingredients</h3>
            <p>Organized by sections with precise measurements</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🍳</div>
            <h3>Instructions</h3>
            <p>Step-by-step cooking directions with images</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Nutrition Facts</h3>
            <p>Complete nutritional information per serving</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// API Documentation Page
function DocsPage() {
  const baseUrl = "https://recipes-api-production-6853.up.railway.app"
  
  return (
    <div className="page docs-page">
      <div className="docs-container">
        <h1>API Documentation</h1>
        <p>Complete guide to using the Recipe Scraper API</p>

        <section className="docs-section">
          <h2>Base URL</h2>
          <CodeBlock code={baseUrl} language="text" />
        </section>

        <section className="docs-section">
          <h2>Authentication</h2>
          <p>No authentication required. The API is free to use with rate limiting.</p>
        </section>

        <section className="docs-section">
          <h2>Rate Limiting</h2>
          <p>Requests are limited to <strong>5 requests per minute</strong> per IP address to ensure fair usage.</p>
        </section>

        <section className="docs-section">
          <h2>Endpoints</h2>
          
          <div className="endpoint">
            <div className="endpoint-header">
              <span className="method">GET</span>
              <span className="path">/api</span>
            </div>
            <p>Extract recipe data from an AllRecipes.com URL</p>
            
            <h4>Parameters</h4>
            <div className="param-table">
              <div className="param-row">
                <span className="param-name">url</span>
                <span className="param-type">string</span>
                <span className="param-required">required</span>
                <span className="param-desc">Valid AllRecipes.com recipe URL</span>
              </div>
            </div>

            <h4>Example Request</h4>
            <CodeBlock code={`curl "${baseUrl}/api?url=https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/"`} language="bash" />

            <h4>Response Format</h4>
            <CodeBlock code={JSON.stringify({
              title: "string",
              details: {
                prepTime: "string",
                cookTime: "string", 
                totalTime: "string",
                servings: "string"
              },
              ingredients: {
                "Section Name": ["ingredient 1", "ingredient 2"]
              },
              steps: [
                {
                  step: "number",
                  instruction: "string",
                  image: "string"
                }
              ],
              nutrition: {
                calories: "string",
                totalFat: "string"
              }
            }, null, 2)} language="json" />
          </div>
        </section>

        <section className="docs-section">
          <h2>Error Responses</h2>
          
          <div className="error-examples">
            <div className="error-item">
              <h4>400 Bad Request</h4>
              <CodeBlock code={JSON.stringify({
                error: "URL parameter is required"
              }, null, 2)} language="json" />
            </div>
            
            <div className="error-item">
              <h4>400 Bad Request</h4>
              <CodeBlock code={JSON.stringify({
                error: "Invalid URL. Please provide a valid AllRecipes.com URL"
              }, null, 2)} language="json" />
            </div>
            
            <div className="error-item">
              <h4>429 Too Many Requests</h4>
              <CodeBlock code={JSON.stringify({
                error: "Rate limit exceeded. Please wait before making another request."
              }, null, 2)} language="json" />
            </div>
            
            <div className="error-item">
              <h4>500 Internal Server Error</h4>
              <CodeBlock code={JSON.stringify({
                error: "Failed to scrape recipe"
              }, null, 2)} language="json" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Examples Page
function ExamplesPage() {
  return (
    <div className="page">
      <div className="examples-container">
        <h1>Examples</h1>
        <p>Real API responses and code examples</p>

        <section className="example-section">
          <h2>Sample Response</h2>
          <p>Here's what you get when scraping a recipe:</p>
          <CodeBlock code={JSON.stringify(sampleResponse, null, 2)} language="json" />
        </section>

        <section className="example-section">
          <h2>JavaScript Example</h2>
          <CodeBlock code={`// Using fetch API
const recipeUrl = 'https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/';
const apiUrl = 'https://recipes-api-production-6853.up.railway.app/api';

async function getRecipe() {
  try {
    const response = await fetch(\`\${apiUrl}?url=\${encodeURIComponent(recipeUrl)}\`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('Recipe Title:', data.title);
      console.log('Prep Time:', data.details.prepTime);
      console.log('Ingredients:', data.ingredients);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

getRecipe();`} language="javascript" />
        </section>

        <section className="example-section">
          <h2>Python Example</h2>
          <CodeBlock code={`import requests
import json

def get_recipe(recipe_url):
    api_url = "https://recipes-api-production-6853.up.railway.app/api"
    params = {"url": recipe_url}
    
    try:
        response = requests.get(api_url, params=params)
        data = response.json()
        
        if response.status_code == 200:
            print(f"Recipe: {data['title']}")
            print(f"Prep Time: {data['details']['prepTime']}")
            print(f"Ingredients: {len(data['ingredients']['Main'])} items")
            return data
        else:
            print(f"Error: {data['error']}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

# Example usage
recipe_url = "https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/"
recipe_data = get_recipe(recipe_url)`} language="python" />
        </section>

        <section className="example-section">
          <h2>Node.js Example</h2>
          <CodeBlock code={`const axios = require('axios');

async function scrapeRecipe(recipeUrl) {
  const apiUrl = 'https://recipes-api-production-6853.up.railway.app/api';
  
  try {
    const response = await axios.get(apiUrl, {
      params: { url: recipeUrl }
    });
    
    const recipe = response.data;
    
    console.log(\`📝 \${recipe.title}\`);
    console.log(\`⏱️  Prep: \${recipe.details.prepTime} | Cook: \${recipe.details.cookTime}\`);
    console.log(\`🍽️  Serves: \${recipe.details.servings}\`);
    
    // Process ingredients
    Object.entries(recipe.ingredients).forEach(([section, items]) => {
      console.log(\`\\n\${section} Ingredients:\`);
      items.forEach(ingredient => console.log(\`  • \${ingredient}\`));
    });
    
    return recipe;
    
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data.error);
    } else {
      console.error('Network Error:', error.message);
    }
  }
}

// Usage
const recipeUrl = 'https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/';
scrapeRecipe(recipeUrl);`} language="javascript" />
        </section>
      </div>
    </div>
  )
}

// Playground Page
function PlaygroundPage() {
  const [url, setUrl] = React.useState('https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/')
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const [error, setError] = React.useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const apiUrl = 'https://recipes-api-production-6853.up.railway.app/api'
      const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`)
      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page playground-page">
      <div className="playground-container">
        <h1>API Playground</h1>
        <p>Test the Recipe Scraper API with any AllRecipes.com URL</p>

        <form onSubmit={handleSubmit} className="playground-form">
          <div className="input-group">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter AllRecipes.com URL..."
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Scraping...' : 'Scrape Recipe'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result-container">
            <div className="result-header">
              <h3>API Response</h3>
              <span className="status-badge success">200 OK</span>
            </div>
            <CodeBlock code={JSON.stringify(result, null, 2)} language="json" />
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Scraping recipe data...</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/examples" element={<ExamplesPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 Recipe Scraper API. Built with React & Vite.</p>
            <div className="footer-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
