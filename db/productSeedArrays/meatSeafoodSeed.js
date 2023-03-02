
const meatSeafoodProductsToCreate = [
    {
      name: "Blue Mussels",
      description: "Fresh, succulent blue mussels from the Atlantic coast.",
      inventory: 50,
      price: 12.99,
      category: "Meat and Seafood",
      subcategory: "Seafood",
      imageURL: "https://c.pxhere.com/photos/e3/7e/mussels_food_eat_shellfish_dinner_fresh_seafood-717358.jpg!d"
    },
    {
      name: "Alaskan Salmon",
      description: "Wild-caught Alaskan salmon, rich in omega-3 fatty acids.",
      inventory: 30,
      price: 19.99,
      category: "Meat and Seafood",
      subcategory: "Seafood",
      imageURL: "https://qualityseafooddelivery.com/wp-content/uploads/2022/02/Raw-Salmon-Fillets-1-1024x683.jpg"
    },
    {
      name: "Wild Pacific Cod",
      description: "Sustainably caught Pacific cod with a mild, flaky texture.",
      inventory: 40,
      price: 15.99,
      category: "Meat and Seafood",
      subcategory: "Seafood",
      imageURL: "https://live.staticflickr.com/1749/40684207990_af751ae682_b.jpg"
    },
    {
      name: "Maine Lobster Tails",
      description: "Sweet and succulent lobster tails from the cold waters of Maine.",
      inventory: 20,
      price: 32.99,
      category: "Meat and Seafood",
      subcategory: "Seafood",
      imageURL: "https://live.staticflickr.com/3346/3296917109_2dcbff88a8_b.jpg"
    },
    {
      name: "Marasheen Bay Oysters",
      description: "Plump and briny oysters from the Marasheen Bay in Nova Scotia.",
      inventory: 60,
      price: 1.99,
      category: "Meat and Seafood",
      subcategory: "Seafood",
      imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Oysters_2.jpg"
    },
    {
      name: "Chicken Wings",
      description: "Juicy and flavorful chicken wings.",
      inventory: 100,
      price: 9.99,
      category: "Meat and Seafood",
      subcategory: "Poultry",
      imageURL: "https://live.staticflickr.com/65535/49194247396_e087da9191_b.jpg"
    },
    {
      name: "Chicken Livers",
      description: "Tender and savory chicken livers.",
      inventory: 80,
      price: 7.99,
      category: "Meat and Seafood",
      subcategory: "Poultry",
      imageURL: "https://live.staticflickr.com/65535/50183200297_3061b043db_b.jpgy"
    },
    {
      name: "Organic Chicken Breast",
      description: "Free-range chicken with exceptional flavor.",
      inventory: 50,
      price: 19.99,
      category: "Meat and Seafood",
      subcategory: "Poultry",
      imageURL: "https://live.staticflickr.com/65535/49262118261_22ca3fbae7_b.jpg"
    },
    {
      name: "Organic Ground Beef",
      description: "Fresh, organic ground beef.",
      inventory: 50,
      price: 12.99,
      category: "Meat and Seafood",
      subcategory: "Beef",
      imageURL: "https://live.staticflickr.com/7174/6761655299_d565335a53_b.jpg"
    },
    {
      name: "Top Sirloin",
      description: "Lean and flavorful beef cut.",
      inventory: 40,
      price: 18.99,
      category: "Meat and Seafood",
      subcategory: "Beef",
      imageURL: "https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Filet Mignon",
      description: "Premium, melt-in-your-mouth beef cut.",
      inventory: 20,
      price: 34.99,
      category: "Meat and Seafood",
      subcategory: "Beef",
      imageURL: "https://live.staticflickr.com/65535/51022868567_9cfe5e2146_b.jpg"
    },
    {
      name: "Organic Burger Patties",
      description: "Juicy and flavorful beef burger patties.",
      inventory: 60,
      price: 14.99,
      category: "Meat and Seafood",
      subcategory: "Beef",
      imageURL: "https://live.staticflickr.com/191/520999007_4d0499023f_b.jpg"
    },
    {
      name: "Fullblood Wagyu Ribeye",
      description: "Highly marbled and tender ribeye steak.",
      inventory: 30,
      price: 54.99,
      category: "Meat and Seafood",
      subcategory: "Beef",
      imageURL: "https://live.staticflickr.com/3758/10809962553_0186184154_b.jpg"
    },
    {
      name: "Ground Pork",
      description: "Finely chopped pork for versatile cooking.",
      inventory: 50,
      price: 7.99,
      category: "Meat and Seafood",
      subcategory: "Pork",
      imageURL: "https://live.staticflickr.com/7168/6761656113_21154c7b16_b.jpg"
    },
    {
      name: "Pork Shoulder",
      description: "A tasty cut of pork that's great for slow roasting or braising.",
      inventory: 30,
      price: 12.99,
      category: "Meat and Seafood",
      subcategory: "Pork",
      imageURL: "https://live.staticflickr.com/7143/6683395471_4aa05a1f20_b.jpg"
    },
    {
      name: "Hot Italian Sausage",
      description: "Spicy sausage with Italian flavors.",
      inventory: 25,
      price: 8.99,
      category: "Meat and Seafood",
      subcategory: "Pork",
      imageURL: "https://images.pexels.com/photos/4669219/pexels-photo-4669219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Organic Applewood Smoked Bacon",
      description: "Smoky bacon for breakfast or sandwiches.",
      inventory: 20,
      price: 10.99,
      category: "Meat and Seafood",
      subcategory: "Pork",
      imageURL: "https://live.staticflickr.com/65535/50867825668_5f7165fc75_b.jpg"
    },
    {
      name: "Pork Belly",
      description: "Indulgent pork belly for crispy bites or savory dishes.",
      inventory: 15,
      price: 14.99,
      category: "Meat and Seafood",
      subcategory: "Pork",
      imageURL: "https://live.staticflickr.com/65535/50988733161_fb346b5b3e_b.jpg"
    },
    {
      name: "Oven Roasted Turkey",
      description: "Juicy and tender roasted turkey breast.",
      inventory: 50,
      price: 9.99,
      category: "Meat and Seafood",
      subcategory: "Deli Meat & Charcuterie",
      imageURL: "https://live.staticflickr.com/4191/33831122314_b5e967278f_b.jpg"
    },
    {
      name: "Prosciutto",
      description: "Thinly sliced dry-cured Italian ham.",
      inventory: 30,
      price: 11.99,
      category: "Meat and Seafood",
      subcategory: "Deli Meat & Charcuterie",
      imageURL: "https://live.staticflickr.com/7480/16110565465_2dd75520d0_b.jpg"
    },
    {
      name: "Smoked Beef Salami",
      description: "Savory smoked beef with coarse texture.",
      inventory: 25,
      price: 8.99,
      category: "Meat and Seafood",
      subcategory: "Deli Meat & Charcuterie",
      imageURL: "https://live.staticflickr.com/65535/48177126997_c202904aed_b.jpg"
    },
    {
      name: "Shaved Ham",
      description: "Thinly sliced ham with mild flavor.",
      inventory: 20,
      price: 7.99,
      category: "Meat and Seafood",
      subcategory: "Deli Meat & Charcuterie",
      imageURL: "https://live.staticflickr.com/65535/50422756102_a04c9f451e_b.jpg"
    },
    {
      name: "Sliced Pancetta",
      description: "Thinly sliced Italian bacon with rich flavor.",
      inventory: 15,
      price: 13.99,
      category: "Meat and Seafood",
      subcategory: "Deli Meat & Charcuterie",
      imageURL: "https://live.staticflickr.com/4050/4420722465_37f45a29c6_b.jpg"
    },
    {
      name: "Rack of Lamb",
      description: "Tender and juicy rack of lamb",
      inventory: 10,
      price: 24.99,
      category: "Meat and Seafood",
      subcategory: "Lamb",
      imageURL: "https://live.staticflickr.com/2805/10105892064_7280404cdc_b.jpg"
    },
    {
      name: "Ground Lamb",
      description: "Ground lamb for all your cooking needs",
      inventory: 25,
      price: 11.99,
      category: "Meat and Seafood",
      subcategory: "Lamb",
      imageURL: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Lammfars.jpg"
    },
    {
      name: "Leg of Lamb",
      description: "Classic leg of lamb for roasting",
      inventory: 15,
      price: 34.99,
      category: "Meat and Seafood",
      subcategory: "Lamb",
      imageURL: "https://live.staticflickr.com/2756/4442629934_0c7cea57ac_b.jpg"
    },
    {
      name: "Loin Chop",
      description: "Juicy and flavorful lamb loin chop",
      inventory: 20,
      price: 19.99,
      category: "Meat and Seafood",
      subcategory: "Lamb",
      imageURL: "https://www.lobels.com/images/thumbs/0001468_loin-lamb-chops_882.jpeg"
    },
  ]

  exports.meatSeafoodProductsToCreate = meatSeafoodProductsToCreate