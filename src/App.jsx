import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { ChefHat, Code2, Play, BookOpen, ExternalLink, Copy, Check } from 'lucide-react'
import { Button } from './components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Input } from './components/ui/input'
import { cn } from './lib/utils'

const sampleResponse = {
  "title": "Brookies (Brownie Cookies)",
  "details": {
    "prepTime": "20 mins",
    "cookTime": "20 mins",
    "totalTime": "40 mins",
    "servings": "20",
    "yield": "20 bars"
  },
  "ingredients": {
    "Cookie Layer": [
      "1/2 cup butter, softened",
      "1/2 cup light brown sugar",
      "1/4 1/4 cup white sugar",
      "1/2 teaspoon vanilla extract",
      "1 large egg",
      "1 1/4 cups all-purpose flour",
      "1/2 teaspoon salt",
      "1/2 teaspoon baking soda",
      "1 cup semisweet chocolate chips"
    ],
    "Brownie Layer": [
      "1 cup white sugar",
      "1/2 cup butter, melted",
      "1 teaspoon vanilla extract",
      "2  eggs",
      "1/3 cup cocoa powder",
      "1/2 cup all-purpose flour",
      "1/4 teaspoon baking powder",
      "1/8 teaspoon salt"
    ]
  },
  "steps": [
    {
      "step": 1,
      "instruction": "Gather all ingredients.",
      "image": "https://www.allrecipes.com/thmb/0sNg-e1gjtPaKK_4wfWVVf5OXoA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/238654-Brookies-Brownie-Cookies-ddmfs-step-1-169-0d1f5a5560104ee09fb651442d71476f.jpg"
    },
    {
      "step": 2,
      "instruction": "Preheat the oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish.",
      "image": ""
    },
    {
      "step": 3,
      "instruction": "Prepare cookie layer: Beat 1/2 cup butter, 1/2 cup brown sugar, 1/4 cup white sugar, and 1/2 teaspoon vanilla in a large bowl until creamy. Add one egg; beat until light and creamy, about 2 minutes.",
      "image": "https://www.allrecipes.com/thmb/wo7rALe9s-Mc2nNy5ik9ZMGuQt4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/238654-Brookies-Brownie-Cookies-ddmfs-step-2-170-b6166aa049954e6fbcbdf0b42f0c314d.jpg"
    },
    {
      "step": 4,
      "instruction": "Whisk 1 1/4 cups flour, 1/2 teaspoon salt, and baking soda in a bowl. Gradually stir flour mixture into butter mixture until dough is combined. Stir chocolate chips into dough. Spread dough evenly into the prepared baking dish; set aside.",
      "image": "https://www.allrecipes.com/thmb/XfwcjkntTnuHAtIoe__1VdtYwBM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/238654-Brookies-Brownie-Cookies-ddmfs-step-3-171-5ca5446454ce400788a7d7061b50ad60.jpg"
    },
    {
      "step": 5,
      "instruction": "Prepare brownie layer: Stir 1 cup sugar, 1/2 cup melted butter, and 1 teaspoon vanilla in a bowl; add two eggs and beat well. Mix in cocoa powder until well-combined. Stir in 1/2 cup flour, baking powder, and 1/8 teaspoon salt until batter is combined. Pour over cookie layer and spread to cover completely.",
      "image": "https://www.allrecipes.com/thmb/FzxJEqroGjP_h9HIA9V6EXxNFV4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/238654-Brookies-Brownie-Cookies-ddmfs-step-4-172-58ed84e66d044b92b568dd7fa3fb26e5.jpg"
    },
    {
      "step": 6,
      "instruction": "Bake in the preheated oven until a toothpick inserted into the center comes out clean, 20 to 25 minutes. Cool completely before cutting into 20 bars. Enjoy!",
      "image": "https://www.allrecipes.com/thmb/PzvTMQluhHNcqDF0AZ1oc4MhYe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/238654-brookies-brownie-cookies-ddmfs-4x3-216-b5371aff3c03454aaeb5d586d35ec841.jpg"
    }
  ],
  "nutrition": {
    "calories": "246",
    "fat": "13g",
    "carbs": "32g",
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
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 font-bold text-lg">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <span>Recipe API</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              )
            })}
          </div>
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
    <div className="relative group">
      {copyable && (
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-2 py-1 rounded text-xs flex items-center gap-1 font-medium"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      )}
      <pre className="bg-slate-950 text-slate-50 rounded-lg p-4 overflow-x-auto text-sm border">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

// Home Page
function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-20">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
            <ChefHat className="mr-2 h-4 w-4 text-orange-500" />
            Free Recipe API
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Recipe Scraper API
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Extract comprehensive recipe data from AllRecipes.com with a simple REST API call. 
            Get ingredients, cooking steps, nutrition facts, and more in clean JSON format.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-base">
            <Link to="/docs">
              <BookOpen className="mr-2 h-5 w-5" />
              View Documentation
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="text-base">
            <Link to="/playground">
              <Play className="mr-2 h-5 w-5" />
              Try It Live
            </Link>
          </Button>
        </div>
      </div>

      {/* Demo Card */}
      <div className="mb-20">
        <Card className="max-w-4xl mx-auto shadow-lg border-2">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="font-mono">GET Request</Badge>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">200 OK</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <CodeBlock 
              code={`GET /api?url=https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/`}
              language="http"
              copyable={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">What You Get</h2>
          <p className="text-lg text-muted-foreground">Everything you need to build amazing recipe applications</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="text-5xl mb-4">📝</div>
              <CardTitle className="text-lg">Recipe Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Prep time, cook time, servings, and difficulty level
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="text-5xl mb-4">🥗</div>
              <CardTitle className="text-lg">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Organized by sections with precise measurements
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="text-5xl mb-4">👨‍🍳</div>
              <CardTitle className="text-lg">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Step-by-step cooking directions with images
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="text-5xl mb-4">📊</div>
              <CardTitle className="text-lg">Nutrition Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete nutritional information per serving
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// API Documentation Page
function DocsPage() {
  const baseUrl = "https://recipes-api-production-6853.up.railway.app"
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
          <p className="text-xl text-muted-foreground">Complete guide to using the Recipe Scraper API</p>
        </div>

        <div className="grid gap-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Base URL</CardTitle>
              <CardDescription>All API requests start with this endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={baseUrl} language="text" />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No authentication required. The API is free to use with rate limiting.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Rate Limiting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Requests are limited to <strong className="text-foreground">5 requests per minute</strong> per IP address to ensure fair usage.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Main Endpoint</CardTitle>
              <CardDescription>Extract recipe data from AllRecipes.com URLs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="border rounded-lg p-6 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="font-mono text-green-700 bg-green-50 border-green-200">GET</Badge>
                  <code className="text-lg font-mono bg-white px-3 py-1 rounded border break-all">/api</code>
                </div>
                <p className="text-muted-foreground mb-6">Extract recipe data from an AllRecipes.com URL</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-base">Parameters</h4>
                    <div className="bg-white rounded border overflow-hidden">
                      <div className="grid grid-cols-1 gap-4 p-4 sm:hidden">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <code className="font-mono text-blue-600 text-sm">url</code>
                            <Badge variant="destructive" className="text-xs">required</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Type:</span> string
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Valid AllRecipes.com recipe URL
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full min-w-[500px]">
                          <thead>
                            <tr className="bg-slate-50 border-b">
                              <th className="text-left p-3 text-sm font-medium w-20">Name</th>
                              <th className="text-left p-3 text-sm font-medium w-20">Type</th>
                              <th className="text-left p-3 text-sm font-medium w-24">Required</th>
                              <th className="text-left p-3 text-sm font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 text-sm">
                                <code className="font-mono text-blue-600 text-xs">url</code>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">string</td>
                              <td className="p-3 text-sm">
                                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">required</Badge>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">Valid AllRecipes.com recipe URL</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-base">Example Request</h4>
                    <div className="text-xs sm:text-sm">
                      <CodeBlock code={`curl "${baseUrl}/api?url=https://www.allrecipes.com/recipe/238654/brookies-brownie-cookies/"`} language="bash" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-base">Response Format</h4>
                    <div className="text-xs sm:text-sm">
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
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Error Responses</CardTitle>
              <CardDescription>Common error scenarios and their responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { code: "400", title: "Bad Request", error: "URL parameter is required" },
                  { code: "400", title: "Invalid URL", error: "Invalid URL. Please provide a valid AllRecipes.com URL" },
                  { code: "429", title: "Too Many Requests", error: "Rate limit exceeded. Please wait before making another request." },
                  { code: "500", title: "Internal Server Error", error: "Failed to scrape recipe" }
                ].map((errorCase, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-red-50/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="destructive">{errorCase.code}</Badge>
                      <span className="font-medium">{errorCase.title}</span>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <CodeBlock code={JSON.stringify({ error: errorCase.error }, null, 2)} language="json" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Examples Page
function ExamplesPage() {
  const jsCode = `// Using fetch API
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

getRecipe();`

  const pythonCode = `import requests
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
recipe_data = get_recipe(recipe_url)`

  const nodeCode = `const axios = require('axios');

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
scrapeRecipe(recipeUrl);`

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Code Examples</h1>
          <p className="text-xl text-muted-foreground">Integration examples in different programming languages</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Start Examples</CardTitle>
            <CardDescription>Choose your preferred language and get started in seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="nodejs">Node.js</TabsTrigger>
              </TabsList>
              
              <TabsContent value="javascript" className="mt-6">
                <CodeBlock code={jsCode} language="javascript" />
              </TabsContent>
              
              <TabsContent value="python" className="mt-6">
                <CodeBlock code={pythonCode} language="python" />
              </TabsContent>
              
              <TabsContent value="nodejs" className="mt-6">
                <CodeBlock code={nodeCode} language="javascript" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sample API Response</CardTitle>
            <CardDescription>Here's the complete JSON structure you'll receive</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={JSON.stringify(sampleResponse, null, 2)} language="json" />
          </CardContent>
        </Card>
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">API Playground</h1>
          <p className="text-xl text-muted-foreground">Test the Recipe Scraper API with any AllRecipes.com URL</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Try the API</CardTitle>
            <CardDescription>Enter a recipe URL to see the API in action</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter AllRecipes.com URL..."
                  required
                  disabled={loading}
                  className="flex-1 text-base"
                />
                <Button type="submit" disabled={loading} size="lg" className="px-8">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Scraping...
                    </>
                  ) : (
                    'Scrape Recipe'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-red-200 bg-red-50/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <CardTitle className="text-red-700">Error</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="shadow-lg border-green-200">
            <CardHeader className="bg-green-50/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-800">API Response</CardTitle>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">200 OK</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <CodeBlock code={JSON.stringify(result, null, 2)} language="json" />
            </CardContent>
          </Card>
        )}

        {loading && (
          <Card className="shadow-sm border-blue-200">
            <CardContent className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3 text-blue-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <div className="space-y-1">
                  <p className="font-medium">Scraping recipe data...</p>
                  <p className="text-sm text-muted-foreground">This usually takes 5-10 seconds</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/examples" element={<ExamplesPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
          </Routes>
        </main>
        
        <footer className="border-t bg-muted/30 mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 Recipe Scraper API. Built by <span className="font-medium text-foreground">Abdul Moeez Shaikh</span>
              </p>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
