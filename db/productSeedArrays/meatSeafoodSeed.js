
const meatSeafoodProductsToCreate = [
    {
      name: "Blue Mussels",
      description: "Fresh, succulent blue mussels from the Atlantic coast.",
      inventory: 50,
      price: 12.99,
      category: "Meat and Seafood",
      subCategory: "Seafood",
      imageURL: "https://example.com/blue-mussels.jpg"
    },
    {
      name: "Alaskan Salmon",
      description: "Wild-caught Alaskan salmon, rich in omega-3 fatty acids.",
      inventory: 30,
      price: 19.99,
      category: "Meat and Seafood",
      subCategory: "Seafood",
      imageURL: "https://example.com/alaskan-salmon.jpg"
    },
    {
      name: "Wild Pacific Cod",
      description: "Sustainably caught Pacific cod with a mild, flaky texture.",
      inventory: 40,
      price: 15.99,
      category: "Meat and Seafood",
      subCategory: "Seafood",
      imageURL: "https://example.com/wild-pacific-cod.jpg"
    },
    {
      name: "Maine Lobster Tails",
      description: "Sweet and succulent lobster tails from the cold waters of Maine.",
      inventory: 20,
      price: 32.99,
      category: "Meat and Seafood",
      subCategory: "Seafood",
      imageURL: "https://example.com/maine-lobster-tails.jpg"
    },
    {
      name: "Marasheen Bay Oysters",
      description: "Plump and briny oysters from the Marasheen Bay in Nova Scotia.",
      inventory: 60,
      price: 1.99,
      category: "Meat and Seafood",
      subCategory: "Seafood",
      imageURL: "https://example.com/marasheen-bay-oysters.jpg"
    },
    {
      name: "Chicken Wings",
      description: "Juicy and flavorful chicken wings.",
      inventory: 100,
      price: 9.99,
      category: "Meat and Seafood",
      subCategory: "Poultry",
      imageURL: "https://example.com/chicken-wings.jpg"
    },
    {
      name: "Chicken Livers",
      description: "Tender and savory chicken livers.",
      inventory: 80,
      price: 7.99,
      category: "Meat and Seafood",
      subCategory: "Poultry",
      imageURL: "https://example.com/chicken-livers.jpg"
    },
    {
      name: "Heritage Breed Whole Chicken",
      description: "Free-range chicken with exceptional flavor.",
      inventory: 50,
      price: 19.99,
      category: "Meat and Seafood",
      subCategory: "Poultry",
      imageURL: "https://example.com/heritage-breed-chicken.jpg"
    },
    {
      name: "Turkey Bacon",
      description: "Lean and flavorful bacon made from turkey.",
      inventory: 60,
      price: 8.99,
      category: "Meat and Seafood",
      subCategory: "Poultry",
      imageURL: "https://example.com/turkey-bacon.jpg"
    },
    {
      name: "Whole Perkin Duck",
      description: "Whole duck with tender and flavorful meat.",
      inventory: 30,
      price: 29.99,
      category: "Meat and Seafood",
      subCategory: "Poultry",
      imageURL: "https://example.com/perkin-duck.jpg"
    },
    {
      name: "Organic Ground Beef",
      description: "Fresh, organic ground beef.",
      inventory: 50,
      price: 12.99,
      category: "Meat and Seafood",
      subCategory: "Beef",
      imageURL: "https://example.com/organic-ground-beef.jpg"
    },
    {
      name: "Top Sirloin",
      description: "Lean and flavorful beef cut.",
      inventory: 40,
      price: 18.99,
      category: "Meat and Seafood",
      subCategory: "Beef",
      imageURL: "https://example.com/top-sirloin.jpg"
    },
    {
      name: "Filet Mignon",
      description: "Premium, melt-in-your-mouth beef cut.",
      inventory: 20,
      price: 34.99,
      category: "Meat and Seafood",
      subCategory: "Beef",
      imageURL: "https://example.com/filet-mignon.jpg"
    },
    {
      name: "Organic Burger Patties",
      description: "Juicy and flavorful beef burger patties.",
      inventory: 60,
      price: 14.99,
      category: "Meat and Seafood",
      subCategory: "Beef",
      imageURL: "https://example.com/organic-burger-patties.jpg"
    },
    {
      name: "Fullblood Wagyu Ribeye",
      description: "Highly marbled and tender ribeye steak.",
      inventory: 30,
      price: 54.99,
      category: "Meat and Seafood",
      subCategory: "Beef",
      imageURL: "https://example.com/fullblood-wagyu-ribeye.jpg"
    },
    {
      name: "Ground Pork",
      description: "Finely chopped pork for versatile cooking.",
      inventory: 50,
      price: 7.99,
      category: "Meat and Seafood",
      subCategory: "Pork",
      imageURL: "https://example.com/ground-pork.jpg"
    },
    {
      name: "Pork Shoulder",
      description: "A tasty cut of pork that's great for slow roasting or braising.",
      inventory: 30,
      price: 12.99,
      category: "Meat and Seafood",
      subCategory: "Pork",
      imageURL: "https://example.com/pork-shoulder.jpg"
    },
    {
      name: "Hot Italian Sausage",
      description: "Spicy sausage with Italian flavors.",
      inventory: 25,
      price: 8.99,
      category: "Meat and Seafood",
      subCategory: "Pork",
      imageURL: "https://example.com/hot-italian-sausage.jpg"
    },
    {
      name: "Organic Applewood Smoked Bacon",
      description: "Smoky bacon for breakfast or sandwiches.",
      inventory: 20,
      price: 10.99,
      category: "Meat and Seafood",
      subCategory: "Pork",
      imageURL: "https://example.com/applewood-smoked-bacon.jpg"
    },
    {
      name: "Pork Belly",
      description: "Indulgent pork belly for crispy bites or savory dishes.",
      inventory: 15,
      price: 14.99,
      category: "Meat and Seafood",
      subCategory: "Pork",
      imageURL: "https://example.com/pork-belly.jpg"
    },
    {
      name: "Oven Roasted Turkey",
      description: "Juicy and tender roasted turkey breast.",
      inventory: 50,
      price: 9.99,
      category: "Meat and Seafood",
      subCategory: "Deli Meat & Charcuterie",
      imageURL: "https://example.com/oven-roasted-turkey.jpg"
    },
    {
      name: "Prosciutto",
      description: "Thinly sliced dry-cured Italian ham.",
      inventory: 30,
      price: 11.99,
      category: "Meat and Seafood",
      subCategory: "Deli Meat & Charcuterie",
      imageURL: "https://example.com/prosciutto.jpg"
    },
    {
      name: "Smoked Beef Salami",
      description: "Savory smoked beef with coarse texture.",
      inventory: 25,
      price: 8.99,
      category: "Meat and Seafood",
      subCategory: "Deli Meat & Charcuterie",
      imageURL: "https://example.com/smoked-beef-salami.jpg"
    },
    {
      name: "Shaved Ham",
      description: "Thinly sliced ham with mild flavor.",
      inventory: 20,
      price: 7.99,
      category: "Meat and Seafood",
      subCategory: "Deli Meat & Charcuterie",
      imageURL: "https://example.com/shaved-ham.jpg"
    },
    {
      name: "Sliced Pancetta",
      description: "Thinly sliced Italian bacon with rich flavor.",
      inventory: 15,
      price: 13.99,
      category: "Meat and Seafood",
      subCategory: "Deli Meat & Charcuterie",
      imageURL: "https://example.com/sliced-pancetta.jpg"
    },
    {
      name: "Rack of Lamb",
      description: "Tender and juicy rack of lamb",
      inventory: 10,
      price: 24.99,
      category: "Meat and Seafood",
      subCategory: "Lamb",
      imageURL: "https://example.com/rack-of-lamb.jpg"
    },
    {
      name: "Ground Lamb",
      description: "Ground lamb for all your cooking needs",
      inventory: 25,
      price: 11.99,
      category: "Meat and Seafood",
      subCategory: "Lamb",
      imageURL: "https://example.com/ground-lamb.jpg"
    },
    {
      name: "Leg of Lamb",
      description: "Classic leg of lamb for roasting",
      inventory: 15,
      price: 34.99,
      category: "Meat and Seafood",
      subCategory: "Lamb",
      imageURL: "https://example.com/leg-of-lamb.jpg"
    },
    {
      name: "Loin Chop",
      description: "Juicy and flavorful lamb loin chop",
      inventory: 20,
      price: 19.99,
      category: "Meat and Seafood",
      subCategory: "Lamb",
      imageURL: "https://example.com/loin-chop.jpg"
    },
    {
      name: "Lamb Shank",
      description: "Tender and succulent lamb shank",
      inventory: 10,
      price: 29.99,
      category: "Meat and Seafood",
      subCategory: "Lamb",
      imageURL: "https://example.com/lamb-shank.jpg"
    }
  ]

  module.exports = meatSeafoodProductsToCreate