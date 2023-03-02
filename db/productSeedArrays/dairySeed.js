
const dairyProductsToCreate = [
  //milk & cream
  {
    name: "Grass-fed whole milk",
    description: "Organic whole milk from grass-fed cows",
    inventory: 100,
    price: 4.99,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Buttermilk-%28right%29-and-Milk-%28left%29.jpg/800px-Buttermilk-%28right%29-and-Milk-%28left%29.jpg?20080926192314"
  },
  {
    name: "Buttermilk",
    description: "Organic cultured buttermilk",
    inventory: 50,
    price: 3.49,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://c.pxhere.com/photos/1d/52/photo-1622031.jpg!d"
  },
  {
    name: "Heavy Cream",
    description: "Organic heavy cream with 36% butterfat",
    inventory: 75,
    price: 5.99,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://get.pxhere.com/photo/food-milk-Raw-milk-buttermilk-dairy-lactose-almond-milk-Grain-milk-Milk-punch-hemp-milk-plant-milk-Rice-milk-yogurt-Amazake-drink-soy-milk-coconut-milk-cream-mason-jar-dessert-breakfast-ingredient-condensed-milk-kefir-1484293.jpg"
  },
  {
    name: "Half & Half",
    description: "Organic half and half with 12% butterfat",
    inventory: 60,
    price: 2.99,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://live.staticflickr.com/4851/44586577260_112805f0be_b.jpg"
  },
  {
    name: "Egg Nog",
    description: "Organic egg nog with nutmeg and cinnamon",
    inventory: 25,
    price: 6.99,
    category: "Dairy",
    subCategory: "Milk & Cream",
    imageURL: "https://c.pxhere.com/photos/9f/83/beverage_bowl_breakfast_cappuccino_cinnamon_coffee_cream_cup-1537203.jpg!d"
  },
//eggs & butter
{
  name: "Salted Butter",
  description: "Organic salted butter made from cream",
  inventory: 100,
  price: 3.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/frbutter_food_nutrition_delicious-image-kybbyrka.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=7c1b7047c3754579f95a36898dc2180e"
},
{
  name: "Unsalted Butter",
  description: "Organic unsalted butter made from cream",
  inventory: 75,
  price: 3.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/frbutter_food_nutrition_delicious-image-kybbyrka.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=7c1b7047c3754579f95a36898dc2180e"
},
{
  name: "Garlic Butter",
  description: "Organic garlic butter made from cream and garlic",
  inventory: 50,
  price: 4.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://live.staticflickr.com/5127/5225540338_44bbd701fe_b.jpg"
},
{
  name: "Sweet Cream Butter",
  description: "Organic sweet cream butter made from cream",
  inventory: 100,
  price: 4.49,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/frbutter_food_nutrition_delicious-image-kybbyrka.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=7c1b7047c3754579f95a36898dc2180e"
},
{
  name: "Lard",
  description: "Organic pork lard for cooking and baking",
  inventory: 25,
  price: 2.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://c.pxhere.com/photos/8b/10/blur_cheese_close_up_dairy_product_depth_of_field_focus_food_food_photography-1528189.jpg!d"
},
{
  name: "Pasture Raised eggs",
  description: "Organic eggs from pasture-raised chickens",
  inventory: 60,
  price: 5.99,
  category: "Dairy",
  subCategory: "Eggs & Butter",
  imageURL: "https://live.staticflickr.com/5137/5483256997_7ac715aa83_b.jpg"
},
//cheese
{
  name: "Aged Gouda",
  description: "Aged Dutch cheese with a nutty flavor",
  inventory: 50,
  price: 8.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/WikiCheese_-_Gouda_36_mois_03.jpg/1280px-WikiCheese_-_Gouda_36_mois_03.jpg"
},
{
  name: "Bocconcini",
  description: "Mild and creamy Italian cheese",
  inventory: 75,
  price: 6.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/0/02/Bocconcini_gobeirne.jpg"
},
{
  name: "Burrata",
  description: "Italian cheese made from mozzarella and cream",
  inventory: 50,
  price: 9.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Burrata2.jpg/800px-Burrata2.jpg?20160701200821"
},
{
  name: "Camembert",
  description: "Soft and creamy French cheese with a bloomy rind",
  inventory: 25,
  price: 7.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Camembert_de_Normandie_%28AOP%29_11.jpg/800px-Camembert_de_Normandie_%28AOP%29_11.jpg?20150306212809"
},
{
  name: "Parmigiano Reggiano",
  description: "Hard Italian cheese with a sharp and nutty flavor",
  inventory: 100,
  price: 12.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://live.staticflickr.com/4084/4959064756_8f534b1235_b.jpg"
},
{
  name: "Fresh Mozzarella",
  description: "Soft and mild Italian cheese",
  inventory: 75,
  price: 5.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Mozzarella_di_bufala2.jpg/800px-Mozzarella_di_bufala2.jpg?20160708055137"
},
{
  name: "Gruyere",
  description: "Swiss cheese with a nutty and earthy flavor",
  inventory: 50,
  price: 10.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Gruy%C3%A8re.jpg"
},
{
  name: "White Cheddar",
  description: "Sharp and tangy English cheese",
  inventory: 75,
  price: 7.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://pixnio.com/free-images/food-and-drink/cheese/white-cheddar-cheese-1150x863.jpg"
},
{
  name: "Cream Cheese",
  description: "Soft and spreadable cheese",
  inventory: 50,
  price: 4.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://www.publicdomainpictures.net/pictures/290000/velka/cream-cheese-bagel.jpg"
},
{
  name: "Ricotta",
  description: "Italian cheese with a mild and creamy flavor",
  inventory: 75,
  price: 4.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://live.staticflickr.com/4086/5033608294_54d68b87e3_b.jpg"
},
{
  name: "Grana Padano",
  description: "Italian cheese similar to Parmigiano Reggiano",
  inventory: 50,
  price: 9.99,
  category: "Dairy",
  subCategory: "Cheese",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Grana_Padano_DOP.jpg"
},
{
  name: "Feta", 
  description: "Traditional crumbly Greek cheese made from sheep's milk", 
  inventory: 50, 
  price: 6.99, 
  category: "Eggs and dairy", 
  subCategory: "Cheese",
  imageURL: "https://www.freeimageslive.co.uk/files/images009/greek_feta.preview.jpg"
}, 
{
  name: "Goat Cheese", 
  description: "Soft and creamy cheese made from fresh goat's milk", 
  inventory: 30, 
  price: 7.99, 
  category: "Eggs and dairy", 
  subCategory: "Cheese",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/9/94/Ziegenkaese_Rolle_II.jpg"
}, 
{
  name: "Pecorino Romano", 
  description: "Hard, salty Italian cheese made from sheep's milk", 
  inventory: 20, 
  price: 8.99, 
  category: "Eggs and dairy", 
  subCategory: "Cheese",
  imageURL: "https://pixnio.com/free-images/food-and-drink/cheese/pecorino-romano-cheese-1150x863.jpg"
},
//yogurt and cultured Dairy
{
  name: "Sour Cream", 
  description: "Thick and tangy dairy product commonly used as a topping or ingredient in recipes", 
  inventory: 50, 
  price: 2.99, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://live.staticflickr.com/1846/44211965261_269e54067d_b.jpg"
}, 
{
  name: "Kefir", 
  description: "Probiotic drink made from fermented milk", 
  inventory: 30, 
  price: 3.99, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://live.staticflickr.com/1839/43494200074_02294be0de_b.jpg"
}, 
{
  name: "Greek yogurt", 
  description: "Thick and creamy yogurt with a high protein content", 
  inventory: 20, 
  price: 4.99, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Joghurt.jpg"
},
{
  name: "Plain whole milk yogurt", 
  description: "Creamy and tangy yogurt made from whole milk", 
  inventory: 25, 
  price: 3.49, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/frwhipped_cream_cream_fat-image-kybai4mt.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=4e5c6843b880a662c9ff57489024899d"
}, 
{
  name: "Creme Fraiche", 
  description: "Thick and tangy French cultured cream used in both sweet and savory dishes", 
  inventory: 15, 
  price: 5.99, 
  category: "Eggs and dairy", 
  subCategory: "Yogurt and Cultured Dairy",
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Raspberries_with_cr%C3%A8me_fra%C3%AEche_and_sugar.jpg/800px-Raspberries_with_cr%C3%A8me_fra%C3%AEche_and_sugar.jpg?20080524005507"
}
  ]

exports.dairyProductsToCreate = dairyProductsToCreate