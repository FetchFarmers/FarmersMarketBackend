
const dairyProductsToCreate = [
  //milk & cream
  {
    name: "Grass-fed whole milk",
    description: "Organic whole milk from grass-fed cows",
    inventory: 100,
    price: 4.99,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://example.com/grass-fed-milk.jpg"
  },
  {
    name: "Buttermilk",
    description: "Organic cultured buttermilk",
    inventory: 50,
    price: 3.49,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://example.com/buttermilk.jpg"
  },
  {
    name: "Heavy Cream",
    description: "Organic heavy cream with 36% butterfat",
    inventory: 75,
    price: 5.99,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://example.com/heavy-cream.jpg"
  },
  {
    name: "Half & Half",
    description: "Organic half and half with 12% butterfat",
    inventory: 60,
    price: 2.99,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://example.com/half-and-half.jpg"
  },
  {
    name: "Egg Nog",
    description: "Organic egg nog with nutmeg and cinnamon",
    inventory: 25,
    price: 6.99,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://example.com/eggnog.jpg"
  },
//eggs & butter
{
  name: "Salted Butter",
  description: "Organic salted butter made from cream",
  inventory: 100,
  price: 3.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://example.com/salted-butter.jpg"
},
{
  name: "Unsalted Butter",
  description: "Organic unsalted butter made from cream",
  inventory: 75,
  price: 3.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://example.com/unsalted-butter.jpg"
},
{
  name: "Garlic Butter",
  description: "Organic garlic butter made from cream and garlic",
  inventory: 50,
  price: 4.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://example.com/garlic-butter.jpg"
},
{
  name: "Sweet Cream Butter",
  description: "Organic sweet cream butter made from cream",
  inventory: 100,
  price: 4.49,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://example.com/sweet-cream-butter.jpg"
},
{
  name: "Lard",
  description: "Organic pork lard for cooking and baking",
  inventory: 25,
  price: 2.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://example.com/lard.jpg"
},
{
  name: "Pasture Raised eggs",
  description: "Organic eggs from pasture-raised chickens",
  inventory: 60,
  price: 5.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://example.com/pasture-raised-eggs.jpg"
},
//cheese
{
  name: "Aged Gouda",
  description: "Aged Dutch cheese with a nutty flavor",
  inventory: 50,
  price: 8.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/aged-gouda.jpg"
},
{
  name: "Bocconcini",
  description: "Mild and creamy Italian cheese",
  inventory: 75,
  price: 6.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/bocconcini.jpg"
},
{
  name: "Burrata",
  description: "Italian cheese made from mozzarella and cream",
  inventory: 50,
  price: 9.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/burrata.jpg"
},
{
  name: "Camembert",
  description: "Soft and creamy French cheese with a bloomy rind",
  inventory: 25,
  price: 7.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/camembert.jpg"
},
{
  name: "Parmigiano Reggiano",
  description: "Hard Italian cheese with a sharp and nutty flavor",
  inventory: 100,
  price: 12.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/parmigiano-reggiano.jpg"
},
{
  name: "Fresh Mozzarella",
  description: "Soft and mild Italian cheese",
  inventory: 75,
  price: 5.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/fresh-mozzarella.jpg"
},
{
  name: "Gruyere",
  description: "Swiss cheese with a nutty and earthy flavor",
  inventory: 50,
  price: 10.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/gruyere.jpg"
},
{
  name: "White Cheddar",
  description: "Sharp and tangy English cheese",
  inventory: 75,
  price: 7.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/white-cheddar.jpg"
},
{
  name: "Cream cheese",
  description: "Soft and spreadable cheese",
  inventory: 50,
  price: 4.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/cream-cheese.jpg"
},
{
  name: "Ricotta",
  description: "Italian cheese with a mild and creamy flavor",
  inventory: 75,
  price: 4.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/ricotta.jpg"
},
{
  name: "Grana Padano",
  description: "Italian cheese similar to Parmigiano Reggiano",
  inventory: 50,
  price: 9.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://example.com/feta.jpg"
},
{
  name: "Feta", 
  description: "Traditional crumbly Greek cheese made from sheep's milk", 
  inventory: 50, 
  price: 6.99, 
  category: "Eggs and dairy", 
  subCategory: "Cheese",
  imageURL: "https://example.com/feta.jpg"
}, 
{
  name: "Goat Cheese", 
  description: "Soft and creamy cheese made from fresh goat's milk", 
  inventory: 30, 
  price: 7.99, 
  category: "Eggs and dairy", 
  subCategory: "Cheese",
  imageURL: "https://example.com/goat-cheese.jpg"
}, 
{
  name: "Pecorino Romano", 
  description: "Hard, salty Italian cheese made from sheep's milk", 
  inventory: 20, 
  price: 8.99, 
  category: "Eggs and dairy", 
  subCategory: "Cheese",
  imageURL: "https://example.com/pecorino-romano.jpg"
},
//yogurt and cultured Dairy
{
  name: "Sour Cream", 
  description: "Thick and tangy dairy product commonly used as a topping or ingredient in recipes", 
  inventory: 50, 
  price: 2.99, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://example.com/sour-cream.jpg"
}, 
{
  name: "Kefir", 
  description: "Probiotic drink made from fermented milk", 
  inventory: 30, 
  price: 3.99, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://example.com/kefir.jpg"
}, 
{
  name: "Greek yogurt", 
  description: "Thick and creamy yogurt with a high protein content", 
  inventory: 20, 
  price: 4.99, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://example.com/greek-yogurt.jpg"
},
{
  name: "Plain whole milk yogurt", 
  description: "Creamy and tangy yogurt made from whole milk", 
  inventory: 25, 
  price: 3.49, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://example.com/plain-yogurt.jpg"
}, 
{
  name: "Creme Fraiche", 
  description: "Thick and tangy French cultured cream used in both sweet and savory dishes", 
  inventory: 15, 
  price: 5.99, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://example.com/creme-fraiche.jpg"
}
  ]

exports.dairyProductsToCreate = dairyProductsToCreate